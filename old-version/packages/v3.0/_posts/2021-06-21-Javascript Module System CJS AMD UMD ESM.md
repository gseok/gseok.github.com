---
title: Javascript Module System (CJS, AMD, UMD, ESM)
date: 2021-06-21 18:22:00
updated: 2021-06-21 18:22:00
categories:
 - tech talk
tags:
 - javascript
 - cjs
 - amd
 - umd
 - esm
 - tech basic
---

## 소개

javascript의 module system의 탄생 배경(히스토리)을 알아보고, 이어서 현재 대표적인 javascript module system인 cjs, amd, umd, esm에 대해서 간략하게 알아본다.

## 배경

초창기 javascript는 module의 기능 or 개념이 없었고, javascript의 구동환경 역시 browser로 고정되어 있었습니다. 따라서 이당시에서는 하나의 (js)파일로 모든 기능을 제공하거나, ```<script>```태그의 순차 로딩과, window(global)객체를 활용하여 모듈을 흉내(IIFE의 module pattern)내거나 기능을 분리하여 제공하였습니다.

javascript생태계가 발전함에 따라서, Javascript을 범용적으로 사용하려는 요구사항들이 발생하게 되었고, 이런 요구사항에 따라서 javascript에서의 module 기능의 필요성이 대두되게 되었습니다. 이러한 필요성에 의해서 탄생한 것이 javascipt module 시스템의, 양대산맥격인 cjs, amd이며 이어서, umd, ems등으로 발전하고 있습니다.

### 전통적인 방법

**script order을 사용한 형태**

```jsx
<!DOCTYPE html>
<html>
  <body>
    <script type="text/javascript" src="./area.js"></script>
    <script type="text/javascript" src="./main.js"></script>
  </body>
</html>

// area.js
var pi = 3.142;
function area(radius) {
  return pi * radius * radius;
}

// main.js
var answer = area(5);
console.log(answer);
```

- global scope을 점유하고 있고, 너무 generic한 이름을 사용하고 있다.
- pi나 area가 언제든 변경될 여지가 존재한다.

**IIFE module pattern형태**

```jsx
// IIFE 1
// area.js
var utils = (function() {
  // you hide `pi` within the function scope
  var pi = 3.142;
  function area(radius) {
    return pi * radius * radius;
  }
  return { area };
})();

// main.js
var answer = utils.area(5);

// IIFE 2, 혹은 약속된 namespace을 활용
// namespace.js
// main.js, area.js가 약속하는 특정 namespace필요
var myNamespace = {};

// area.js
(function(myNamespace) {
  // you hide `pi` within the function scope
  var pi = 3.142;
  function area(radius) {
    return pi * radius * radius;
  }
  myNamespace.area = area;
})(myNamespace);

// main.js
var answer = myNamespace.area(5);
```

- IIFE의 1번째 방법은 여전히 IIFE의 리턴을 받는 utils에 종속적이다. (다만 area라는 이름의 충돌은 피할 수 있다)
- IIFE의 2번째 예제와 같은 형태가 jQuery의 방식이다. global에  $ 라는 namespace, 즉 특정 이름으로 노출하는 형태이다.
- 여전히 다음과 같은 문제가 존재한다
    - global namespace(scope) 오염
    - lack of dependency resolution (파일 순서가 매우 종속적임)

---

## CommonJS (CJS)

CommonJS는 브라우저 이외의 환경에서 범용적으로 javascript을 사용하게 하자는 목표를 가진 표준화 단체 이다. CommonJS는 모질라의 엔지니어 Kevin Dangoor에 의해 2009년 1월 시작되었으며 처음 이름은 ServerJS 였습니다. Kevin은 JavaScript가 브라우저용 언어를 넘어 범용적으로 쓰이려면, Ruby나 Python과 같은 체계가 필요하다고 주장 하였습니다.

- CommonJS는 javascript library가 아니고, ECMA, W3C와 같은 표준(Spec)지정단체 입니다.
- CommonJS는 결국 일종의 Spec 입니다.
- CommonJS가 해결하고자 한 핵심 문제
    - 서로 호환되는 표준 라이브러리가 없다.
    - 데이터베이스에 연결할 수 있는 표준 인터페이스가 없다.
    - 다른 모듈을 삽입하는 표준적인 방법이 없다.
    - 코드를 패키징해서 배포하고 설치하는 방법이 필요하다.
    - 의존성 문제까지 해결하는 공통 패키지 모듈 저장소가 필요하다.
- CommonJS핵심 문제 해결법은 결국 '모듈화'
    - 스코프(Scope): 모든 모듈은 자신만의 독립적인 실행 영역이 있어야 한다.
    - 정의(Definition): 모듈 정의는 exports 객체를 이용한다.
    - 사용(Usage): 모듈 사용은 require 함수를 이용한다.

### **Code**

```jsx
// a.js
var a = 3, b=4;

// sum 모듈정의, 다른데서 사용 가능
exports.sum = function(c, d) {
  return a + b + c + d;
};
```

```jsx
// b.js
var a = 5, b = 6;
var moduleA = require("./a.js"); // 모듈 사용
moduleA.sum(a, b); // 3+4+5+6 = 18
```

- CommonJS의 모듈 명세는 모든 파일이 로컬 디스크에 있어 필요할 때 바로 불러올 수 있는 상황을 전제(즉 ServerSide)을 전제합니다.
- 동기화가 기본이라 브라우저에서 사용시 성능 문제가 있습니다. → 이를위해서 동적 ```<script>``` 태그 삽입등이 추가되었습니다.
- JavaScript가 브라우저에서 동작할 때는 서버 사이드 JavaScript와 달리 파일 단위의 스코프가 없습니다.
    - 동적 ```<script>```로 로딩시, 전통적인 방법과 동일하게, a.js와 b.js를 차례대로 로드하면, a.js의 변수가 b.js의 변수를 모두 덮어쓰게 되는 전역변수 문제도 발생합니다.
    - 이런 문제를 해결하기 위해서, CommonJS는 서버 모듈을 비동기적으로 클라이언트에 전송할 수 있는 모듈 전송 포맷(module transport format)을 추가로 정의했습니다.

    ```jsx
    // complex-numbers/plus-two.js
    require.define({"complex-numbers/plus-two": function(require, exports) {
        //콜백 함수 안에 모듈을 정의한다.
        var sum = require("./complex-number").sum;
        exports.plusTwo = function(a){
            return sum(a, 2);
        };
    },["complex-numbers/math"]); //먼저 로드되어야 할 모듈을 기술한다.
    ```

### 구현체

대표적으로 node.js 와  FINF가 있습니다.

- 브라우저용
    - curl.js([http://github.com/unscriptable/curl](http://github.com/unscriptable/curl))
    - SproutCore([http://sproutcore.com](http://sproutcore.com/))
    - PINF([http://github.com/pinf/loader-js](http://github.com/pinf/loader-js))
    - 기타 등등
- 서버사이드용
    - Node.js([http://nodejs.org](http://nodejs.org/))
    - Narwhal([https://github.com/tlrobinson/narwhal](https://github.com/tlrobinson/narwhal))
    - Persevere([http://www.persvr.org](http://www.persvr.org/))
    - Wakanda([http://www.wakandasoft.com](http://www.wakandasoft.com/))

참고: node.js의 경우, v12부터는 esm와 cjs을 모두 지원합니다, 2021년 6월 기준 16.0.3 에서 둘다 지원 가능([https://nodejs.org/api/modules.html](https://nodejs.org/api/modules.html), [https://nodejs.org/api/esm.html](https://nodejs.org/api/esm.html))

---

## Asynchronous module definition (AMD)

AMD그룹은 CommonJS에서 독립한(갈라져나온) 그룹입니다. AMD는 네트웍을 통해 비동기형태로 파일을 내려받는 환경(브라우저환경)에서의 모듈화에 중접을 두고 있습니다. 이는 CommonJS 추구하는 브라우저 이외의 환경을 목표로 하는 부분과 중점요소가 달랐기 때문에 CommonJS에서 합의점을 도출하지 못하고 갈라져 나오게 되었습니다.

CJS, AMD을 가지고 무었이 더 좋다고 이야기 하기 힘듭니다. 둘다 서버환경, 브라우저 환경에서 구동 가능합니다. 다만 중점 요소가 명확하기 때문에 Server(node)에서는 CJS가 좀더 적합하고, FE(Browser)환경에서는 AMD가 좀더 적합합니다.

### Code

**모듈 정의**

```jsx
// spec
define(id?, dependencies?, factory);
```

```jsx
/* js/a.js */
// 모듈 정의의 기본 형태
define([ // 의존 모듈들을 나열한다. 모듈이 한 개라도 배열로 넘겨야 한다.
    'js/util',
    'js/Ajax',
    'js/Event'
], function (util, Ajax, Event) { // 의존 모듈들은 순서대로 매개변수에 담긴다.
    // 의존 모듈들이 모두 로딩 완료되면 이 함수를 실행한다.
    // 초기화 영역
    var callCount = 0;

    function sum(a, b) {
        callCount += 1;
        return a + b;
    }

    function getCallCount() {
      return i;
    }

    // 외부에 노출할 함수들만 반환한다.
    return {
        sum: sum,
        getCallCount: getCallCount
    };
});

// AMD 명세에서 정의하는 전역변수는 define과
// CommonJS에서 사용하는 require 객체, exports 객체가 있다.
// 그리고 전역 모듈을 명시적으로 가리킬 때 사용하는 define.amd 프로퍼티도 사용할 수 있다
```

**모듈사용**

```jsx
/* js/main.js */
require([
    'js/a'
], function (a) {
    console.log(a.sum(1,2)); // 3
    console.log(a.getCallCount()); // 1
});
```

**부가설명**

- dependency(의존모듈)의 로딩 순서는 보장되지 않는다. (비동기로 받음)
    - dependency의 로딩 순서가 중요하다면 아래와 같이 중첩 require을 사용해야 한다.

    ```jsx
    require(['js/a'], function (a) {
        require(['js/b'], function (b) {
            // a -> b 로딩 순서 보장
        });
    });
    ```

- define구문에 dependency는 한번만 로딩된다. (다른 어디선가 동일한 모듈 로딩시 바로 로딩됨)

### 구현체

대표적으로 Dojo1.7 나 EmberJS등의 framework에서 AMD형태의 loader을 제공합니다. requirejs는 가장 대표적인 amd module loader입니다.

- 브라우저용
    - RequireJS([http://requirejs.org](http://requirejs.org/))
    - curl.js([http://github.com/unscriptable/curl](http://github.com/unscriptable/curl))
    - bdLoad([http://bdframework.org/bdLoad/](http://bdframework.org/bdLoad/))
    - Yabble([http://github.com/jbrantly/yabble](http://github.com/jbrantly/yabble))
    - PINF([http://github.com/pinf/loader-js](http://github.com/pinf/loader-js))
    - 기타 등등
- 서버사이드용
    - RequireJS([http://requirejs.org](http://requirejs.org/))
    - PINF([http://github.com/pinf/loader-js](http://github.com/pinf/loader-js))

---

## Universal Module Definition (UMD)

UMD는 CommonJS, AMD와 같이 javascript의 module에 대한 spec이 나누어져 있어서 나온 불편함을 한방에 해결하기 위해 나온 개념 입니다. CommonJS와 AMD와는 달리 spec은 아니고, CommonJS, AMD, 그리고 전통적인 방법(window 객체에 bind)을 모두 지원하는 형태(일종의 구현 패턴, 디자인패턴)으로 되어 있습니다.

### Code

```jsx
(function (global, factory) {
    if (typeof define === 'function' && define.amd) { // ADM
        define(['jquery'], factory);
    } else if (typeof module === 'object' && module.exports) { // CommonJS
        // Node/CommonJS
        module.exports = function( root, jQuery ) {
            if ( jQuery === undefined ) {
                if ( typeof window !== 'undefined' ) {
                    jQuery = require('jquery');
                }
                else {
                    jQuery = require('jquery')(root);
                }
            }
            factory(jQuery);
            return jQuery;
        };
    } else { // window(Browser globals)
        global.$ = factory(jQuery);
    }
}(window, function ($) {
    $.fn.jqueryPlugin = function () { return true; };
}));
```

- UMD형태를 제공하는 전형적인 패턴입니다.
    - 참고: [https://github.com/umdjs/umd/blob/master/templates](https://github.com/umdjs/umd/blob/master/templates)
- UMD에서는, AMD는 define을 사용하고, CommonJS는 module.exports를 사용하는 차이점을 응용하여 모듈을 정의해줍니다. 둘다 아닌경우 전통적인 방식으로 global에 bind해줍니다.

**부가설명**

- umd는 현재 사용하는 javascript module 형태와 무관하게 어디서든 사용 가능한 구조로 되어 있습니다.
- 보통 webpack와 같은 bundler사용시에는 직접 구현할 필요없이 해당 형태로 만들어 줍니다.
    - 참고: [https://webpack.js.org/configuration/output/#outputglobalobject](https://webpack.js.org/configuration/output/#outputglobalobject)

---

## ECMAScript Module (ESM)

ESM은 ECMAScript에서 지원하는 자바스크립트 공식 모듈 시스템입니다. es6 부터 추가되었으며, 현재 IE을 제외한, 대다수의 브라우저에서 지원 가능합니다. es6문법 이전의 브라우저에서는 당연 미지원하기 때문에 구 브라우저 지원이 필요한 경우 bundler을 통해서 umd나 cjs, amd등으로 변환하여 지원하여야 합니다.

- browser support: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_support](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#browser_support)

### **동작**

- 참고: [https://ui.toast.com/weekly-pick/ko_20180402](https://ui.toast.com/weekly-pick/ko_20180402)
- Browser기준 → 구성, 인스턴스화, 평가 → 모듈 인스턴스가 나옴
    1. 구성 - 모든 파일을 찾아 다운로드하고 모듈 레코드로 구문분석한다.
    2. 인스턴스 화 - export 된 값을 모두 배치하기 위해 메모리에 있는 공간들을 찾는다(아직 실제 값은 채우지 않음). 그다음 export와 import들이 이런 메모리 공간들을 가리키도록 한다. 이를 연결(linking) 이라고 한다.
    3. 평가 - 코드를 실행하여 상자의 값을 변수의 실제 값으로 채운다.

**구성**

1. 모듈이 들어있는 파일을 어디서 다운로드 할 것인지 확인한다(module resolution이라고도 함).
    - 파일의 진입점
        - 브라우저의 경우 script태그의 type="module" 로 구분
        - Node의 경우 script태그가 없기 때문에, .mjs 확장자 사용 (아직 논의중!!!)
2. 파일을 가져온다(URL을 통해 다운로드 하거나 파일 시스템에서 불러옴).
    - 실제 파일을 불러오는 것은 로더(loader)가 하며, 브라우저에서는 ES 모듈 명세가 아닌 HTML 명세를 따른다.
        - [ES 모듈 명세](https://tc39.github.io/ecma262/#sec-modules)는 모듈 레코드에 파일을 구문분석하는 방법과 인스턴스 화 하는 방법, 그리고 그 모듈을 평가하는 방법을 알려준다. 하지만 파일을 처음에 어떻게 얻는지는 말하고 있지 않다.

            파일을 불러오는 것은 로더(loader)이다. 로더는 다른 명세로 구성되어있다. 브라우저의 경우 [HTML 명세](https://html.spec.whatwg.org/#fetch-a-module-script-tree)를 따른다. 그러나 사용 중인 플랫폼에 따라 다른 로더를 가질 수 있다.

3. 파일을 모듈 레코드로 구문분석한다.
    - 파일 진입점에서 파일을 받고, 모듈 레코드(Module Record)라고 하는 데이터 구조로 변환해야한다. 이 과정에서 해당 파일들의 모든 구문을 분석할 필요가 있다.

**인스턴스화**

- 인스턴스는 코드와 상태를 결합한다. 상태는 메모리에 있으므로 인스턴스 화 단계는 모든 것을 메모리에 연결(linking)하는 것이다.
- 모듈 그래프를 인스턴스 화하기 위해 엔진은 깊이 우선 순회를 수행
- export의 값을 배치하기 위한 메모리 공간을 찾고 이를 가리키게 한다.
    - 한 모듈에 대한 export와 import는 같은 메모리의 주소를 가리키게 한다.
- 실제 값은 채우지 않는다. 실제 값은 평가 단계에서 채워진다.

**평가**

- JS 엔진은 함수 외부 코드인 최상위 레벨 코드를 실행하여 값을 채운다.
- 모듈은 한 번만 평가하도록 한다.
- 인스턴스 화와 마찬가지로 깊이 우선 탐색 순회을 한다.
- 모듈 맵은 표준 URL로 모듈을 캐시 하므로 각 모듈에 대해 하나의 모듈 레코드만 있다.

### code

**export(named)**

```jsx
export const a = 1
export function fn(){}
export class Class{}

const b = 1
function fn2(){}
class Class2{}

export { b, fn2, Class2 }
```

- export구문을 여러개 사용가능합니다.
- 변수, 함수, 클래스, 객체 모두 export가능합니다.

**export default**

```jsx
// 변수값은 default로 선언, 내보내기가 동시에 되지 않는다
export default const a = 1 // 안되요~!!

// fn.js
export default function fn(){}

// Class.js
export default class Class{}

//a.js
const a = 1
export default a

// fn.js
function fn(){}
export default fn

// Class.js
class Class{}
export default Class
```

- 변수를 제외하고, 선언과 동시에 export가 가능합니다.
- 선언과, export을 구분해서는 모두 가능합니다.
- export default는 모듈당 한번만 가능합니다. (보통 파일에서 한번만 가능)
- export default와 그냥 일반 export을 섞어서 사용 가능합니다.

**import(named export을 import)**

```jsx
import { a } from 'a.js'
import { fn } from 'fn.js'
import { Class } from 'class.js'
```

**import(export default을 import)**

```jsx
import a from 'a.js'
import fn from 'fn.js'
import Class from 'class.js'
import Change from 'class.js' //default의 경우 import된 모듈 이름 변경 가능합니다.
import { a }, Class from 'some.js' // default export와 export을 둘다 import 가능합니다.
```

- 그외 여러 esm형태의 import, export는 아래 링크  참고
    - [https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
    - [https://github.com/mdn/js-examples/tree/master/modules](https://github.com/mdn/js-examples/tree/master/modules)

**Entry**

```html
<script type="module" src="main.js"></script>
```

- type="module" 을 명시하면, main.js가 esm형태의 모듈을 따름을 브라우저에 알릴 수 있다.

**부가설명**

- node에서도 공식적으로 esm을 지원합니다.(현재 ems와 cjs을 모두 지원합니다)
- es module(esm)의 동작 방식 아래 참고에 설명 꼭 읽으면 좋습니다.
    - 참고: [https://ui.toast.com/weekly-pick/ko_20180402](https://ui.toast.com/weekly-pick/ko_20180402)
- script tag동작

    ![](../../assets/post-images/2021-06-21-Javascript-Module-System/async-defer.svg)

---

## 참고

CJS

- [http://www.commonjs.org/](http://www.commonjs.org/)
- [https://ko.wikipedia.org/wiki/CommonJS](https://ko.wikipedia.org/wiki/CommonJS)
- [https://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/](https://www.blueskyonmars.com/2009/01/29/what-server-side-javascript-needs/)
- [https://groups.google.com/g/commonjs?pli=1](https://groups.google.com/g/commonjs?pli=1)
- [https://d2.naver.com/helloworld/12864](https://d2.naver.com/helloworld/12864)
- [http://wiki.commonjs.org/wiki/Modules/Transport](http://wiki.commonjs.org/wiki/Modules/Transport)

AMD

- [https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch11s02.html](https://www.oreilly.com/library/view/learning-javascript-design/9781449334840/ch11s02.html)
- [https://d2.naver.com/helloworld/591319](https://d2.naver.com/helloworld/591319)
- [https://requirejs.org/docs/whyamd.html](https://requirejs.org/docs/whyamd.html)
- [https://github.com/amdjs/amdjs-api/wiki/AMD](https://github.com/amdjs/amdjs-api/wiki/AMD)
- [https://github.com/amdjs/amdjs-api/blob/master/AMD.md](https://github.com/amdjs/amdjs-api/blob/master/AMD.md)
- [https://en.wikipedia.org/wiki/Asynchronous_module_definition](https://en.wikipedia.org/wiki/Asynchronous_module_definition)
- [https://www.slideshare.net/xMartin12/asynchronous-module-definition-amd](https://www.slideshare.net/xMartin12/asynchronous-module-definition-amd)

UMD

- [https://github.com/umdjs/umd](https://github.com/umdjs/umd)
- [https://sub0709.tistory.com/49](https://sub0709.tistory.com/49)
- [https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73](https://www.zerocho.com/category/JavaScript/post/5b67e7847bbbd3001b43fd73)

ESM

- [https://yoeubi28.medium.com/commonjs-esm-모듈-순환-참조-차이-e5cd1047deaf](https://yoeubi28.medium.com/commonjs-esm-%EB%AA%A8%EB%93%88-%EC%88%9C%ED%99%98-%EC%B0%B8%EC%A1%B0-%EC%B0%A8%EC%9D%B4-e5cd1047deaf)
- [https://v8.dev/features/modules#mjs](https://v8.dev/features/modules#mjs)
- [https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/](https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/)
- [https://ui.toast.com/weekly-pick/ko_20180402](https://ui.toast.com/weekly-pick/ko_20180402)
- [https://velog.io/@jjunyjjuny/ES-Modules-정리하기](https://velog.io/@jjunyjjuny/ES-Modules-%EC%A0%95%EB%A6%AC%ED%95%98%EA%B8%B0)
- [https://yceffort.kr/2020/08/commonjs-esmodules](https://yceffort.kr/2020/08/commonjs-esmodules)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Modules)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
- [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
- [https://tc39.es/ecma262/#sec-modules](https://tc39.es/ecma262/#sec-modules)

ETC

- [https://medium.com/sungthecoder/javascript-module-module-loader-module-bundler-es6-module-confused-yet-6343510e7bde](https://medium.com/sungthecoder/javascript-module-module-loader-module-bundler-es6-module-confused-yet-6343510e7bde)
- [https://lihautan.com/javascript-modules/](https://lihautan.com/javascript-modules/)
- [https://beomy.github.io/tech/javascript/cjs-amd-umd-esm/#:~:text=ESM은 ECMAScript에서 지원,들러를 함께 사용해야 합니다](https://beomy.github.io/tech/javascript/cjs-amd-umd-esm/#:~:text=ESM%EC%9D%80%20ECMAScript%EC%97%90%EC%84%9C%20%EC%A7%80%EC%9B%90,%EB%93%A4%EB%9F%AC%EB%A5%BC%20%ED%95%A8%EA%BB%98%20%EC%82%AC%EC%9A%A9%ED%95%B4%EC%95%BC%20%ED%95%A9%EB%8B%88%EB%8B%A4)
- [https://thebook.io/080203/ch22/04/](https://thebook.io/080203/ch22/04/)
- [https://defineall.tistory.com/916](https://defineall.tistory.com/916)