---
title: tesseract.js 자바스크립트 OCR 라이브러리
date: 2022-12-14 14:05:00
author: gseok
categories: tech-talk
tags: tesseract ocr tech-basic
---

### 소개

마블 영화에 나오는 인피니티 스톤이 떠오르는 이름을 가진 테서렉트([tesseract.js](https://github.com/naptha/tesseract.js))라는 라이브러리를 소개합니다. 해당 라이브러리는 자바스크립트 라이브러리 인데, **OCR(Optical Character Recognition)** 역할을 하는 라이브러리 입니다. 즉 사람이 쓴 문자(글씨)를 인식하여 text 데이터로 추출하는 라이브러리 입니다.

이러한 OCR기능을 사용하는 부분은 이미 실제 서비스에서 많이 활용되고 있습니다.

- “[클로버 램프](https://clova.ai/ko/products/clova_lamp.html)”: 책을 램프 아래 두면 자동으로 해당 책의 글씨를 인식하여 읽어줍니다.
- “영수증 리뷰”: 영수증을 사진으로 찍어서 올리면, 자동으로 글씨를 인식하여, 방문한 업체의 이름, 주소, 전화번호 등을 자동으로 기록해주고 해당 업체를 리뷰하게 해줍니다.

이와 같은 OCR기능을 Javascript 라이브러리 형태로 제공하는게 tesseract.js 입니다. tesseract.js는 아래와 같은 기능을 제공합니다.

이미지 인식

![출처: [https://github.com/naptha/tesseract.js/raw/master/docs/images/demo.gif](https://github.com/naptha/tesseract.js/raw/master/docs/images/demo.gif)](../../assets/post-images/2022-12-14-tesseract/tesseract-demo.gif)

출처: [https://github.com/naptha/tesseract.js/raw/master/docs/images/demo.gif](https://github.com/naptha/tesseract.js/raw/master/docs/images/demo.gif)

실시간 글자 인식

![출처: [https://github.com/naptha/tesseract.js/raw/master/docs/images/video-demo.gif](https://github.com/naptha/tesseract.js/raw/master/docs/images/video-demo.gif)](../../assets/post-images/2022-12-14-tesseract/tesseract-video-demo.gif)

출처: [https://github.com/naptha/tesseract.js/raw/master/docs/images/video-demo.gif](https://github.com/naptha/tesseract.js/raw/master/docs/images/video-demo.gif)

### 어떻게 만들어져 있나?

[공식 github 사이트](https://github.com/naptha/tesseract.js)의 설명을 보면 아래와 같이 되어 있습니다.


💡 Tesseract.js wraps an [emscripten](https://github.com/kripken/emscripten) [port](https://github.com/naptha/tesseract.js-core) of the [Tesseract](https://github.com/tesseract-ocr/tesseract) [OCR](https://en.wikipedia.org/wiki/Optical_character_recognition) Engine. It works in the browser using [webpack](https://webpack.js.org/) or plain script tags with a [CDN](https://github.com/naptha/tesseract.js#CDN) and on the server with [Node.js](https://nodejs.org/en/).


해당 설명을 보면, 원래 Tesseract OCR은, **C++로 되어있는데, 이를 emscripten 을 활용하여 포팅**하였습니다. 즉 webassembly 을 사용하여 javascript lib 으로 포팅 하였습니다. 포팅된 라이브러리는, webpack등의 번들러를 이용하여 web 프로젝트 내부에 포함하여 사용할 수 도 있고, CDN등을 통하여 script 태그를 활용하여 사용 할 수 도 있습니다. 또한 browser 환경 및 node.js 환경에서 모두 사용 가능합니다.

node.js 프로젝트에서 사용하거나, webpack등을 활용하여 번들링 되기 이전 사용시 아래와 같이 사용됩니다.

```jsx
import Tesseract from 'tesseract.js';

Tesseract.recognize(
  'https://tesseract.projectnaptha.com/img/eng_bw.png',
  'eng',
  { logger: m => console.log(m) }
).then(({ data: { text } }) => {
  console.log(text);
})
```

### 실제 사용

실제 사용 예제는 프로젝트 내부에 example에 잘 소개 되어 있습니다.

- example: [https://github.com/naptha/tesseract.js/tree/master/examples](https://github.com/naptha/tesseract.js/tree/master/examples)

아래와 같은  html을 로컬에서 수행하여 실제 구동을 확인 할 수 있습니다.

- demo.html
    ```html
    <script src='https://unpkg.com/tesseract.js@4.0.1/dist/tesseract.min.js'></script>
    <script>

    function progressUpdate(packet){
    	var log = document.getElementById('log');

    	if(log.firstChild && log.firstChild.status === packet.status){
    		if('progress' in packet){
    			var progress = log.firstChild.querySelector('progress')
    			progress.value = packet.progress
    		}
    	}else{
    		var line = document.createElement('div');
    		line.status = packet.status;
    		var status = document.createElement('div')
    		status.className = 'status'
    		status.appendChild(document.createTextNode(packet.status))
    		line.appendChild(status)

    		if('progress' in packet){
    			var progress = document.createElement('progress')
    			progress.value = packet.progress
    			progress.max = 1
    			line.appendChild(progress)
    		}

    		if(packet.status == 'done'){
    			var pre = document.createElement('pre')
    			pre.appendChild(document.createTextNode(packet.data.data.text))
    			line.innerHTML = ''
    			line.appendChild(pre)

    		}

    		log.insertBefore(line, log.firstChild)
    	}
    }

    async function recognizeFile(file) {
    	document.querySelector("#log").innerHTML = ''

      const lang = document.querySelector('#langsel').value
      const data = await Tesseract.recognize(file, lang, {
        logger: progressUpdate,
        workerPath: 'https://unpkg.com/tesseract.js@v4.0.1/dist/worker.min.js',
        langPath: 'https://tessdata.projectnaptha.com/4.0.0',
        corePath: 'https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js',
      });
      progressUpdate({ status: 'done', data });
    }
    </script>

    <select id="langsel" onchange="window.lastFile && recognizeFile(window.lastFile)">
    <option value='afr'     > Afrikaans             </option>
    <option value='ara'     > Arabic                </option>
    <option value='aze'     > Azerbaijani           </option>
    <option value='bel'     > Belarusian            </option>
    <option value='ben'     > Bengali               </option>
    <option value='bul'     > Bulgarian             </option>
    <option value='cat'     > Catalan               </option>
    <option value='ces'     > Czech                 </option>
    <option value='chi_sim' > Chinese               </option>
    <option value='chi_tra' > Traditional Chinese   </option>
    <option value='chr'     > Cherokee              </option>
    <option value='dan'     > Danish                </option>
    <option value='deu'     > German                </option>
    <option value='ell'     > Greek                 </option>
    <option value='eng'     selected> English                </option>
    <option value='enm'     > English (Old)         </option>
    <option value='meme'     > Internet Meme                </option>
    <option value='epo'     > Esperanto             </option>
    <option value='epo_alt' > Esperanto alternative </option>
    <option value='est'     > Estonian              </option>
    <option value='eus'     > Basque                </option>
    <option value='fin'     > Finnish               </option>
    <option value='fra'     > French                </option>
    <option value='frk'     > Frankish              </option>
    <option value='frm'     > French (Old)          </option>
    <option value='glg'     > Galician              </option>
    <option value='grc'     > Ancient Greek         </option>
    <option value='heb'     > Hebrew                </option>
    <option value='hin'     > Hindi                 </option>
    <option value='hrv'     > Croatian              </option>
    <option value='hun'     > Hungarian             </option>
    <option value='ind'     > Indonesian            </option>
    <option value='isl'     > Icelandic             </option>
    <option value='ita'     > Italian               </option>
    <option value='ita_old' > Italian (Old)         </option>
    <option value='jpn'     > Japanese              </option>
    <option value='kan'     > Kannada               </option>
    <option value='kor'     > Korean                </option>
    <option value='lav'     > Latvian               </option>
    <option value='lit'     > Lithuanian            </option>
    <option value='mal'     > Malayalam             </option>
    <option value='mkd'     > Macedonian            </option>
    <option value='mlt'     > Maltese               </option>
    <option value='msa'     > Malay                 </option>
    <option value='nld'     > Dutch                 </option>
    <option value='nor'     > Norwegian             </option>
    <option value='pol'     > Polish                </option>
    <option value='por'     > Portuguese            </option>
    <option value='ron'     > Romanian              </option>
    <option value='rus'     > Russian               </option>
    <option value='slk'     > Slovakian             </option>
    <option value='slv'     > Slovenian             </option>
    <option value='spa'     > Spanish               </option>
    <option value='spa_old' > Old Spanish           </option>
    <option value='sqi'     > Albanian              </option>
    <option value='srp'     > Serbian (Latin)       </option>
    <option value='swa'     > Swahili               </option>
    <option value='swe'     > Swedish               </option>
    <option value='tam'     > Tamil                 </option>
    <option value='tel'     > Telugu                </option>
    <option value='tgl'     > Tagalog               </option>
    <option value='tha'     > Thai                  </option>
    <option value='tur'     > Turkish               </option>
    <option value='ukr'     > Ukrainian             </option>
    <option value='vie'     > Vietnamese            </option>
    </select>

    <input type="file" onchange="recognizeFile(window.lastFile=this.files[0])">

    <div id="log"></div>

    <style>
    #log > div {
        color: #313131;
        border-top: 1px solid #dadada;
        padding: 9px;
        display: flex;
    }
    #log > div:first-child {
        border: 0;
    }

    .status {
    	min-width: 250px;
    }
    #log {
        border: 1px solid #dadada;
        padding: 10px;
        margin-top: 20px;
        min-height: 100px;
    }
    body {
        font-family: sans-serif;
        margin: 30px;
    }

    progress {
        display: block;
        width: 100%;
        transition: opacity 0.5s linear;
    }
    progress[value="1"] {
        opacity: 0.5;
    }
    </style>
    ```


### 한글 인식 시도시 에러 발생 날때

- [https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md](https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md)

데모페이지를 로컬에서, 한글 인식 시도시 에러가 나서 살펴보니, `tesseract.js` 사용시 내부에서 사용하는, worker, lang, core 모듈들의 path가 맞지 않으면 에러가 발생합니다. 따라서 로컬에서 시도하였을때, woker, lang, core관련 에러가 떨어지는경우, 위 문서 설명과 같이 명시적으로, 해당 모듈 path을 적용해주어야 합니다.

```jsx
Tesseract.recognize(image, langs, {
  workerPath: '[https://unpkg.com/tesseract.js@v4.0.1/dist/worker.min.js](https://unpkg.com/tesseract.js@v4.0.1/dist/worker.min.js)',
  langPath: '[https://tessdata.projectnaptha.com/4.0.0](https://tessdata.projectnaptha.com/4.0.0)',
  corePath: '[https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js](https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js)',
})
```

Or

```jsx
const worker = await createWorker({
  workerPath: '[https://unpkg.com/tesseract.js@v4.0.1/dist/worker.min.js](https://unpkg.com/tesseract.js@v4.0.1/dist/worker.min.js)',
  langPath: '[https://tessdata.projectnaptha.com/4.0.0](https://tessdata.projectnaptha.com/4.0.0)',
  corePath: '[https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js](https://unpkg.com/tesseract.js-core@v4.0.1/tesseract-core.wasm.js)',
});
```

### 정리

Javascript OCR 라이르러리인 tessertact.js을 가볍게 소개하였습니다. 개인적인 견해를 밝혀 보자면

- 재미있는점으로, api호출형태가 아닌,  javascript library로 사용가능하다.
- 영어 이미지 인식을 해보면 인식율이 매우 높고, 한글의 경우 인식율이 좀 떨어지는것 같다.
- webassembly 가 점점 여러 군데서 활용되어 사용되고 있다.
- 어디에 쓸까? - 여러 분야에 응용하여 사용 할 수 있을꺼 같습니다.!
    - 예를 들어, 회사에서 비용처리 할때 활용 - 회사 택시비 영수증 처리시 - 이미지 올리면 자동 입력!
- 재미있게 봤고, 아직 영어 이외 언어의 인식율이 좀 떨어지는데, 앞으로 어떻게 발전할지가 관전 포인트로 생각됨.

### 참고

- tessertact.js 공식 github: [https://github.com/naptha/tesseract.js](https://github.com/naptha/tesseract.js)
- tessertact.js 예제: [https://github.com/naptha/tesseract.js/tree/master/examples](https://github.com/naptha/tesseract.js/tree/master/examples)
- tessertact.js api: [https://github.com/naptha/tesseract.js/blob/master/docs/api.md](https://github.com/naptha/tesseract.js/blob/master/docs/api.md)
- tessertact.js 로컬사용: [https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md](https://github.com/naptha/tesseract.js/blob/master/docs/local-installation.md)
- ocr 나무위키: [https://namu.wiki/w/OCR](https://namu.wiki/w/OCR)
- 클로버 램프: [https://clova.ai/ko/products/clova_lamp.html](https://clova.ai/ko/products/clova_lamp.html)