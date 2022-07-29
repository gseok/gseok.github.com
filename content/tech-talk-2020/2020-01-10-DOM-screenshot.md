---
title: DOM 스샷찍기(Svg & Canvas & DOM)
date: 2020-01-10 23:29:53
updated: 2021-06-22 09:55:00
author: gseok
categories: tech-talk
tags: javascript dom canvas svg webtech
---

### 소개

- svg, canvas, 일반 DOM이 섞여 있는 Web Page을 브라우저에서 screenshot을 생성하기 위한 web tech tip에 대해서 이야기 합니다.

### Web에서 스크린샷 생성하는 Lib

- html2canvas
    - doc: [https://html2canvas.hertzen.com/](https://html2canvas.hertzen.com/)
    - git: [https://github.com/niklasvh/html2canvas/](https://github.com/niklasvh/html2canvas/)

web에서 screenshot을 생성하는 대표적인 lib가 존재합니다. 해당 lib는 screenshot을 생성하기 위한 타겟 dom을 canvas에 draw하여서 screenshot을 생성합니다.

보통 일반적인 web page의 경우 큰 문제 없이 구동되지만, 복잡한 구조의 page인 경우, 특히 IE에서 아래와 같은 문제가 발생 할 수 있습니다.

**html2canvas의 문제**

- svg: svg → canvas로 draw할때, SecurityError가 발생하여, svg가 그려지지 않음
    - ref: [https://html.spec.whatwg.org/multipage/canvas.html#security-with-canvas-elements](https://html.spec.whatwg.org/multipage/canvas.html#security-with-canvas-elements)
    - ref: [https://github.com/eligrey/canvas-toBlob.js/issues/21](https://github.com/eligrey/canvas-toBlob.js/issues/21)
    - ref: [https://github.com/niklasvh/html2canvas/issues/201](https://github.com/niklasvh/html2canvas/issues/201)
    - [https://github.com/niklasvh/html2canvas/issues/1543](https://github.com/niklasvh/html2canvas/issues/1543)
- image: image → canvas시 canvas의 tainted error가 발생
    - ref: [https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image](https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image)

html2canvas lib을 IE에서 사용시 특히나 위 문제가 많이 발생합니다. 그 이유는 svg태그를 모두 parsing하고 분석해서 svg → canvas로 직접 draw하는 형태가 아니라. image을 사용하는 trick을 사용하고 있기 때문입니다.

- httml2canvas에서 svg의 처리는 아래와 같습니다.
    - svg → string으로 변환(serializeToString)
    - svg text(string) 을 new image 하고
    - image src에 'data:image/svg+xml'형태로 설정
    - 이후 해당 image을 canvas에 drawImage함

    ```jsx
    export class SVGElementContainer extends ElementContainer {
      svg: string;
      intrinsicWidth: number;
      intrinsicHeight: number;

      constructor(img: SVGSVGElement) {
        super(img);
        const s = new XMLSerializer();
        this.svg =
    			`data:image/svg+xml,${encodeURIComponent(s.serializeToString(img))}`;
        this.intrinsicWidth = img.width.baseVal.value;
        this.intrinsicHeight = img.height.baseVal.value;

        CacheStorage.getInstance().addImage(this.svg);
      }
    }
    ```

- 위 과정이후 문제가 발생합니다. 위 image → canvas시 tainted error가 발생

결국 html2canvas lib에서의 svg처리 문제로, svg가 잘 그려지지 않는 문제가 발생하고, 근본적으로는 web상에서 canvas가 tained 되었을때, 이를 외부에서 사용가능한 형태로의 변환 시도시 에러가 발생합니다.

Image을 canvas에 그렸을때 tained 문제

- crossOrigin = "Anonymous"; 설정이 Img 가 onLoad되기 이전에 설정 되어 있어야 해당 문제가 발생하지 않습니다.
- 이미 dom 상에 img가 있는데 해당 img에 위 attribute가 없는 경우, img을 xhr로 load하고, load한 data을 읽어서 crossOrigin = "Anonymous" 가 미리 설정된 img을 만들어 해당 img에 다시 이미지를 그리는 형태로 회피를 합니다.

```jsx
// proxy 코드 스닙
private proxy(src: string): Promise<string> {
  const proxy = this._options.proxy;

  if (!proxy) {
      throw new Error('No proxy defined');
  }

  const key = src.substring(0, 256);

  return new Promise((resolve, reject) => {
      const responseType = FEATURES.SUPPORT_RESPONSE_TYPE ? 'blob' : 'text';
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
          if (xhr.status === 200) {
              if (responseType === 'text') {
                  resolve(xhr.response);
              } else {
                  const reader = new FileReader();
                  reader.addEventListener('load', () => resolve(reader.result as string), false);
                  reader.addEventListener('error', e => reject(e), false);
                  reader.readAsDataURL(xhr.response);
              }
          } else {
              reject(`Failed to proxy resource ${key} with status code ${xhr.status}`);
          }
      };

			xhr.open('GET', `${proxy}?url=${encodeURIComponent(src)}&responseType=${responseType}`);
	...
}

// proxy 가 필요한 경우 ==> CORS을 재설정 하는 경우
if (useProxy) {
	src = await this.proxy(src);
}

Logger.getInstance(this.id).debug(`Added image ${key.substring(0, 256)}`);

return await new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    //ios safari 10.3 taints canvas with data urls unless crossOrigin is set to anonymous
    if (isInlineBase64Image(src) || useCORS) {
        img.crossOrigin = 'anonymous';
    }
    img.src = src;
    if (img.complete === true) {
        // Inline XML images may fail to parse, throwing an Error later on
        setTimeout(() => resolve(img), 500);
    }
    if (this._options.imageTimeout > 0) {
        setTimeout(
            () => reject(`Timed out (${this._options.imageTimeout}ms) loading image`),
            this._options.imageTimeout
        );
    }
});
```

**canvas tained?**

- canvas에 img나 svg을 draw할때, 해당 svg or img(원본)에 CORS 설정(attribute)을 보고 해당 설정이 없는 원본을 draw한 canvas는 tained된(더럽혀졌어...) canvas로 browser에서 판단됩니다.
- tained된 canvas아래 동작 시도시 Security Error가 발생합니다.
    - Calling `[getImageData()](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)` on the canvas's context
    - Calling `[toBlob()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob)` on the `[<canvas>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas)` element itself
    - Calling `[toDataURL()](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL)` on the canvas
- 그 이외의 동작은 가능합니다.
    - 따라서, 원본 소스에서 허락하지 않은 경우, low data변환이나 외부 반출에 제약이 발생합니다.

### security & tained error 회피하기

**canvg**

canvg는 svg을 canvas로 변경해주는 대표적인 lib 입니다. html2canvas와 다르게 canvg는 svg의 내용을 직접 parsing하고 해석하여, 해당 그림을 canvas에 그려줍니다.

- git: [https://github.com/canvg/canvg](https://github.com/canvg/canvg)

canvg가 생성하는 canvas에 그려진 svg는 실질적으로는 canvas에 메뉴얼하게 그린 pure한 canvas이기 때문에 security나 tained error가 발생하지 않습니다.

**html2canvas + canvg 조합하여 회피하기**

html2canvas에서는, 목적하는 dom을 clone하여 이용하고, 해당 cloned dom은 canvas로 그려지기 전에 수동으로 이미지, 스타일 등을 조정 할 수 있는 callback api을 제공합니다.

따라서, html2canvas에 svg부분만 canvg로 그려서 대체하면, 실질적으로 html2canvas을 이용해서 이미지를 생성 할 수 있습니다.

```glsl
// pseudo code
html2canvas(targetElement, {
	onclone: clonedDoc => {
	  // svg to canvas
		const svg = clonedDoc.querySelector('svg');
	  if (svg) {
      const canvas = Canvg.fromString(svg.innerHTML).render();
			const parent = svg.parentElement;
			svg.remove();
      parent.appendChild(canvas);
		}
	}
}
```

### DOM to Canvas

dom object을 canvas에 그리는 가장 일반 적인 방법을 소개합니다.

참고: [http://man.hubwiz.com/docset/JavaScript.docset/Contents/Resources/Documents/developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas.html](http://man.hubwiz.com/docset/JavaScript.docset/Contents/Resources/Documents/developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Drawing_DOM_objects_into_a_canvas.html)

```jsx
const DOMURL = window.URL || window.webkitURL || window;
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 200;
canvas.height = 200;

const data =
		 `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <foreignObject width="100%" height="100%">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">
            <em>I</em> like
            <span style="color:white; text-shadow:0 0 2px blue;">
            cheese</span>
          </div>
        </foreignObject>
      </svg>`;
const svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
const url = DOMURL.createObjectURL(svg);

const img = new Image();
img.onload = function () {
  ctx.drawImage(img, 0, 0);
  DOMURL.revokeObjectURL(url);
}
img.src = url;

document.body.appendChild(canvas);
```

- svg의 foreignObject을 이용하여 내부에 dom을 그리고, svg → image → canvas에 그리는 형태입니다.
- 단 IE에서는 지원하지 않고 있습니다. ref: [https://caniuse.com/#search=foreignobject](https://caniuse.com/#search=foreignobject)
- html2canvas의 경우, foreignObject을 지원하는 경우 위와 같은 방법으로 canvas에 그리고, 만약 foreignObject을 지원하지 않는 경우, dom tree을 모두 parsing하면서 각각의 element type에 따라서, size(bound), style, text등을 계산하여 직접 canvas에 그림을 그립니다. ref: [https://github.com/niklasvh/html2canvas/blob/master/src/render/canvas/canvas-renderer.ts](https://github.com/niklasvh/html2canvas/blob/master/src/render/canvas/canvas-renderer.ts)

### 정리

- DOM → Image(Canvas)는 foreignObject을 사용하는 경우 생각보다 어렵지 않게 변환 가능합니다.
- DOM에 SVG나 Image가 존재하는 경우 Security 문제가 있을 수 있습니다.
    - Image: attribute에 crossOrigin = "Anonymous"; 설정으로 회피 가능 합니다.
    - svg: canvg등으로 svg → canvas로 직접 그리는 형태로 회피 가능 합니다.
- 대다수의 간략한 DOM Tree의 경우 문제없이 기본적인 lib사용으로 이미지 생성이 가능합니다.
- 만약 SVG나 Image에 의해 문제가 발생할 경우 위와 같은 회피 방법을 활용하여 이미지 생성을 할 수 있습니다.

### 추가사항

- html2canvas의 경우, 내부적으로 target이 되는 dom tree만 clone하는게 아니라. full window(document)을 모두 clone하여 동작합니다. 따라서 document의 크기에 따라서, document의 dom tree가 매우 복잡하고 많은 경우, 500ms 이상 느리게 동작 할 수 있습니다.
- 이미지 생성을 해야하는 부분에 DOM보다는 SVG나 Image로만 되어 있다면, 직접 SVG, Image를 Canvas에 그려서 이미지로 생성하는게 성능상 이점이 큽니다.