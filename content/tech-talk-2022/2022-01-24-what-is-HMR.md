---
title: HMR 이해하기
date: 2022-01-24 18:10:00
updated: 2022-01-24 18:10:00
author: gseok
categories: tech-talk
tags: hmr webpack tech-basic
---

## 소개

보통 javascript 프로젝트 개발시에, 일반적으로 next.js와 같은 통합 개발 환경을 사용하거나, 직접 개발 환경을 구축 하더라도, webpack-dev-server의 hot 옵션정도를 사용하여서 개발을 하게 된다.

따라서 이렇게 개발하는 경우 기본적으로 개발 환경이 HMR을 지원하고 있어서, 별도의 HMR에 대한 요구 사항을 느끼거나 하지는 않게 된다.

하지만 HMR의 동작 원리나 internal구조를 알고 싶거나, 특이한 형태의 HMR을 구축해야 하는경우, 혹은 직접 개발환경을 구축해서 만드는 경우, HMR에 대하여 좀더 명확하게 알고 사용 하는것이 좋다. 이러한 경우를 위해서 본 문서를 작성하였다. 목표는 다음과 같다.

- Hot Module Replacement라고 불리는 HMR의 기본적인 개념을 이해한다.
- Webpack의 Incremental 빌드를 이해한다.
- 전체적인 HMR의 동작 구조를 이해한다.

## Hot-Reloading

일단. HMR을 들어가기 앞서서, 이 개념이 어디서부터 나왔는지 살펴본다. 과거 javascript의 개발 및 javascript의 환경이 지금과 같지 않았던 시절에는 당연히 HMR이라는 개념은 존재하지 않았다. 다만 이러한 시기에도 Hot Reloading 혹은 Live Reloading이라는 개념이 존재하였다. Hot-Reloading, Live Reloading의 아이디어는 다음과 같은 개발 과정속에서 발현되게 되었다.

일반적으로(현재도 마찬가지이다), javascript의 개발흐름은 다음과 같다.

1. javascript 코드를 작성한다.
2. javascript 코드가 구동되는 html 환경을 구축하고, 해당 javascript을 `<script>`태그로 불러온다.
3. javascript runtime 환경에서 해당 코드를 구동한다. (보통 browser, 혹은 node - node일때는 2번 없어도됨)

위 과정에서 javascript코드를 수정하게되면

1. 수정된 코드를 다시 구동해야한다.! 즉 browser라면 F5(reload),  node라면 node 재시작

위와 같은 개발 과정에서

- 코드 수정 → reload(browser F5 or node restart) 과정! 을 자동으로 해주자!!

가 기본적인 Hot-Reloading(Live-Reloading)의 기본 아이디어 이다.

## How to Hot-Reloading

기본 아이디어를 실제 구현한다고 가정하자. 어떻게 해야 할까? 기본적으로 아래와 같이 구성해 볼 수 있다.

- 누군가 **“코드 수정” 을 감지**한다.
- “코드 수정” 이감지되면 수정되었음을 **runtime(browser or node)에 알린다(notify!!)**.
- runtime은  **notify!! 가 오면** 자신을 **재기동(window.location.reload)** 한다.

실제 구현을 한다면 어떻게 될까?

- **“코드 수정” 감지**
    - 특정 폴더를 주고, 특정 폴더의 변경을 주기적으로 polling해서 파일 변화를 알 수 있다.
    - “코드 수정” 감지용 프로그램은, 한번 실행되고 종료되는게 아니라. 계속 떠서 감지해야 한다.
    - 보통은 bundler 에서 이러한 코드 수정 감지가 가능하다.
- **Runtime에 알리기**
    - 여러가지 방법이 있을 수 있다.
        - 기본적으로 “코드 수정 감지” 프로그램이 → “Runtime” 에 수정되었음을 알리면 된다.
        - 거꾸로 “코드 수정 감지” 프로그램이 API를 제공(서버)하고 ← “Runtime” 에서 polling 형태로 해당 API를 호출 할 수도 있다.
    - Runtime은 사실 “코드 수정 감지” 프로그램이 무었인지 모른다. 그럼 어떻게 해서 “코드 수정 감지” 프로그램과 ← → Runtime이 통신 하는걸까?
        - Runtime은 사실 javascript을 구동한다.
        - 즉 “현재 수정되는 코드” 가 최초 한번 Runtime에서 구동될때, “코드 수정” 와 통신 할 수 있는 코드(프로그램)이 이미 들어있는 상태로 구동되게 할 수 있다.
    - 위에서는 기본적인 개념을 설명하였는데 javascript에는, websocket이라는 기능이 존재한다. 이를 사용하면 좀더 편리하게, **“코드 수정 감지” 프로그램과 ↔ ”Runtime(상에서 구동된 나의 javascript프로그램)” 간의 통신이 가능**하다.
- **재기동 하기**
    - 최종적으로 “변경” 이 감지되면, runtime을 재기동 한다. (window.location.reload)


정리하면 다음과 같다.

- “코드(파일) 수정 감지” → Runtime에 알림 → Runtime(나의 javascript code program) 알림 받음 → 재시작

해당 형태를 사용하면 개발자가 코드 수정을 하고, 브라우저에서 직접 손으로 페이지 reload(F5)로 코드 갱신을 하지 않아도, 자동으로 코드가 갱신(자동 F5)가 잘 구동된다. 하지만 이 방법에도 몇가지 단점이 있다.

- 단점
    - 매번 F5가 발생함으로, javascript코드상 최초 code부터 매번 다시 실행된다.
    - 이는 즉 번쩍 거리는 현상이나, full page load가 항상 다시 발생한다.

## HMR 기본적인 아이디어

javascript 언어가 점차 확장 및 발전함에 따라서, javascript에도 module이라는 개념이 들어오게 되었다. 이러한 발전에 발맞추어, Hot-Reload(Live-Reload)기능 역시 발전을 하게 되었다.

새롭게 발전된 Reload의 개념이 HRM(Hot Module Replacement)이다.

Hot-Reload(Live-Reload)와 차이점이 되는 아이디어는 다음과 같다.

- F5형태로 browser을 Full Reload 하지 않았으면 좋겠다.
- module이라는 개념이 있으니, 수정된 파일(module)만 교체(replace)되면 좋겠다.
- 수정된 파일(module)이 교체(replace)되고 나서, 즉각적으로 반영되면 좋겠다.

현재의 HMR은 위의 아이디어 내용을 실제 구현하여 제공하고 있다. 실제 본인이 직접 구현한다면? 어떻게 해야할지, 생각해보자.

실제 구현을 한다면 어떻게 될까?

- **“코드 수정” 감지**
    - 단순 파일 변경 감지 이외, 모듈 변경 형태로 감지해야한다.
    - 특정 모듈을 사용한 dep을 감지해야 한다. (단순 파일 변경이외, 해당 파일(module)을 사용하는 dep파일도 다 알아야 한다.)
    - 다시 말하면, 이제 단순 single js형태 혹은 그냥 file로 감지하는게 아니라. project의 전체적인 hierarchy 구조(module)을 알고 있어야 한고, 이를 어딘가에서 계속 (meta)가지고 있어야 한다.
- “**Runtime”에 알리기**
    - 기본적인 아이디어는 동일한다. 즉 runtime에서 구동되는 js내부에, “코드수정 감지” 프로그래쪽과 통신하는 프로그램이 필요하다. (즉 나의 js(내 프로그램 source)에 inject 되어있는 통신 프로그램이 있어야함)
- **“재기동”** 하기
    - 재기동 부분은 좀더 복잡해진다.
    - 기존에 단순 page reload였다면, 이제 페이지가 유지되어야한다.
    - 현재구동중인 js의 전체적인 module 구조를 알고 있어야 한다.
    - “코드수정”감지 가 알려준 정보(변경된 module, 변경된 module에 따라서 dep가 생긴 모듈)을 알아야 한다.
    - “코드수정”감지 가 알려준 정보 부분만 replace 해야 한다.
    - 즉 나의 js(내 프로그램 source)에 통신 프로그램 뿐만 아니라, “module”구조(hierarchy)를 알고, 특정 부분만 교체 (replace) 하는, 프로그램도 하나 더 있어야 한다.
    - 마지막으로, module을 교체 한 이후, 실행(running)하여서, 실제 변경이 즉각적으로(real-time) runtime(browser) 에 반영되게 해야 한다.

정리하면 다음과 같다.

- “코드(파일) 수정 감지” → Runtime에 자세한 정보(module, dep 등등)알림 → Runtime(나의 javascript code program) 알림 받음 → Runtime(module 교체 프로그램에 정보 전달) → Runtime(module 교체 프로그램이 module 교체) → Runtime(module 교체후 최종 실행 프로그램이 변경된 module로 실행)

정말 다행이도, 현재의 HMR 이 위와 같은 내용을 실제 구현하여서 제공하고있다. 현재 실제 구현되어서 제공되고 있는 HMR의 프로그램 와 기능을 보면서 좀더 HMR을 이해하여 보자

## HMR 실제 구현체로 좀더 이해하기

### Webpack Incremental Build and watch

webpack은 모두 알다 싶이 bundler 프로그램이다. 기본적으로 webpack을 수행하면, 즉시 실행되고 종료되는 프로그램이다. 이 프로그램은 config 설정을 기반으로, entry point로 부터 module hierarchy 구조를 분석(parsing)하고 각 파일(module)에 맞는 compile을 수행한다. 이후 모든 compile이 종료되는 최종 out(bundle.js)을 생성한다.

webpack은 **incremental build도 지원**한다. 매번 full build을 하는경우, build → parsing → compile → bundle 생성까지 오랜 시간이 걸리기 때문에, **“변경된 파일(module)”** 만 감지해서, 해당 부분만 build하고 반영하는 기능이다.

해당 기능을 사용하는것은 매우 간단한다. 아래와 같이 webpack.config 파일에 watch 옵션을 켜거나

```tsx
module.exports = {
  //...
  watch: true,
};
```

아래와 같이 webpack 구동시에 watch 옵션을 추가하면 된다.

```tsx
$ webpack watch --config webpack.config.js
```

HMR 관점에서 다음 기능이 됨을 알 수 있다.

- 특정 코드 수정(module)감지가 됨 (incremental build)
- module 형태의 hierarchy 을 관리 하고 있음.
- 특정 코드 수정(module)감지시 특정 코드만 빌드(bundle)해서, 특정 영역(module)만 새로운 코드로 빌드 결과물을 만들어 낼 수 있음.
- webpack 자체가 daemon처럼 계속 떠서 watch(파일 변경)을 polling 할 수 있음.

생각해보면 **“코드 수정” 감지** 의 기능을 충분히 하고 있음을 알 수 있다.

- 아직 안되고 있는거 → “변경 사항 알리기”
- runtime 쪽에 “코드수정” 감지 프로그램과 통신할 수 있는 코드 넣기
- runtime 쪽에 “코드수정” 감지 알림을 받아서 “재기동” 하는 코드 넣기

## webpack-dev-server

webpack-dev-server는, 간략하게 webpack 기능 + dev(express.js(node.js)) server 가 있는 기능으로 생각하면 된다. 원래 webpack의 side 형태의 project였는데 현재는 webpack의 공식 기능으로 편입되었다.

정리하면 내부적으로 2가지 기능을 한다.

- webpack
- server

서버 기능이 있기 때문에 server관련 설정이 가능하다.

```tsx
// webpack.config.js
const path = require('path');

module.exports = {
  //...
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
};
```

구동시에는 다음과 같이 webpack 대신에 webpack-dev-server 명령어를 사용한다.

```tsx
$ webpack-dev-server --config webpack.config.js
```

- webpack-dev-server 명령어를 사용하면 **webpack-dev-server가 내부에서 webpack을 구동**한다.
- 추가로, dev-server (express.js)을 구동한다.

**[webpack-dev-server](https://github.com/webpack/webpack-dev-server)가 내부에서 webpack을 어떻게 구동할까?**

[webpack](https://github.com/webpack/webpack)도 javascript로 되어 있기 때문에, 아래와 같이 javascript 코드 형태로 구동 가능하다.

```tsx
import webpack from 'webpack';
import config from './webpack.config.js';

const compiler = webpack(config);

// webpackCompilerCb 부분은 callback fn 부분이다, 개발자가 개발하여 넘겨주면 된다.
// build 실행
compiler.run(webpackCompilerCb(resolve, reject, progress));

// build 실행 watch mode로!!
compiler.watch({ aggregateTimeout: 300, poll: undefined }, webpackCompilerCb(resolve, reject, progress));
```

즉 사실은 webpack-dev-server와 무관하게, 개발자는 언제든 자신의 javascript코드에서 webpack을 구동 할 수 있다.

참고: [https://webpack.js.org/api/node/](https://webpack.js.org/api/node/)

webpack-dev-server는 webpack 기능 + server기능을 한다고 하였다. server는 express.js(node)로 되어 있는데, express.js(node)는 middleware기능을 제공하고 있다.

webpack-dev-server는 webpack build의 기능을, 이러한 middleware를 사용하고 있다. 정확하게는,  [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 라는 middleware을 사용하여서, webpack build기능을 제공하고 있다.

다시 말하면, 개발자는 node.js 계열의 server을 구축시, [webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware) 를 사용하여서, webpack build 기능을, 아주 손쉽게 직접 제공 할 수 있다.

참고: [https://github.com/webpack/webpack-dev-server/blob/master/lib/Server.js#L1937](https://github.com/webpack/webpack-dev-server/blob/master/lib/Server.js#L1937)

HMR을 보다가 잠깐 webpack-dev-server을 알아보았다. 갑자기 webpack-dev-server가 나왔는데, webpack 의 기능 + “Server” 의 기능도 됨을 알아 두고 이어서 설명하겠다.

## webpack-dev-server HOT

webpack 공식 문서의 [https://webpack.js.org/configuration/dev-server/#devserverhot](https://webpack.js.org/configuration/dev-server/#devserverhot) 을 살펴보면 webpack-dev-server에 hot 기능을 켜면 아주 간략하게, HMR 설정이 완료 됨을 알 수 있다.

```tsx
// webpack.config.js
module.exports = {
  //...
  devServer: {
    hot: true,
  },
};
```

위쪽에서 webapck watch형태일때 HMR 관점에서 부족

HMR 관점에서 다음을 생각해 볼 수 있다.

- **A. webpack-dev-server가 hot 형태로 구동시, 내부 구동하는 webpack은 “watch” 모드이다.**
    - code

        ```tsx
        // webpack-dev-server/lib/Server.js
        setupDevMiddleware() {
            const webpackDevMiddleware = require("webpack-dev-middleware");

            // middleware for serving webpack bundle
            this.middleware = webpackDevMiddleware(
              this.compiler,
              this.options.devMiddleware
            );
          }
        ```

    - [https://github.com/webpack/webpack-dev-middleware/blob/master/src/index.js#L230](https://github.com/webpack/webpack-dev-middleware/blob/master/src/index.js#L230)
        - 정확하게는,  **webpack-dev-middleware**의 내부에서 compiler.watch사용을 한다.
        - 또한 webpack-dev-middleware사용시 option형태로 watch을 줄 수 있다.
- B. webpack-dev-server가 hot 형태로 구동시, 내부 구동하는 webpack 빌드 과정에서, runtime에서 구동될 최종 `bundle.js` 코드에 “통신 & 재기동” 용 코드를 넣는다.
    - code

        ```tsx
        async initialize() {
            if (this.options.webSocketServer) {
              const compilers =
                /** @type {MultiCompiler} */
                (this.compiler).compilers || [this.compiler];

              compilers.forEach((compiler) => {
                this.addAdditionalEntries(compiler);

                const webpack = compiler.webpack || require("webpack");

        				// !!!! Client.js 가 최종 빌드 결과에 같이 들어가게 된다.
                // 통신 및 재기동을 담당
                new webpack.ProvidePlugin({
                  __webpack_dev_server_client__: this.getClientTransport(),
                }).apply(compiler);

                // TODO remove after drop webpack v4 support
                compiler.options.plugins = compiler.options.plugins || [];

                if (this.options.hot) {

                  // 재기동
                  const HMRPluginExists = compiler.options.plugins.find(
                    (p) => p.constructor === webpack.HotModuleReplacementPlugin
                  );

                  if (HMRPluginExists) {
                    this.logger.warn(
                      `"hot: true" automatically applies HMR plugin, you don't have to add it manually to your webpack configuration.`
                    );
                  } else {
                    // Apply the HMR plugin
                    const plugin = new webpack.HotModuleReplacementPlugin();

                    plugin.apply(compiler);
                  }
                }
              });

              if (
                this.options.client &&
                /** @type {ClientConfiguration} */ (this.options.client).progress
              ) {
                this.setupProgressPlugin();
              }
            }
        ```

    - **webpack.ProvidePlugin - __webpack_dev_server_client__: this.getClientTransport()**
        - webpack.ProvidePlugin으로 Client쪽의 websocket쪽 코드를 추가한다.
        - 실제 client.js가 최종 bundle.js 내부에 같이 포함되어 들어간다.
        - 참고: [https://github.com/webpack/webpack-dev-server/tree/master/client-src](https://github.com/webpack/webpack-dev-server/tree/master/client-src)
            - 위 소스가 빌드되서 같이 포함되어 들어간다.
    - **HotModuleReplacementPlugin()** 을 넣어준다. (사용자의 webpack.config.js에 없어도 넣어줌)
        - 해당 Plugin은 webpack의 plugin이고, webpack 빌드 과정중 HMR용 코드를 최종 빌드 결과물에 넣어주는 역할을 한다.
- C. webpack-dev-server가 hot 형태로 구동시, 내부 구동하는 webpack 빌드의 watch모드에서 빌드 결과을 감지하고 → 빌드가 완료되면, “통신” (수정 알림) 을 한다.
    - code

        ```tsx
        // webpack-dev-server/lib/Server.js
        setupHooks() {
            this.compiler.hooks.invalid.tap("webpack-dev-server", () => {
              if (this.webSocketServer) {
                this.sendMessage(this.webSocketServer.clients, "invalid");
              }
            });
            this.compiler.hooks.done.tap(
              "webpack-dev-server",
              /**
               * @param {Stats | MultiStats} stats
               */
              (stats) => {
                if (this.webSocketServer) {
                  // !!!!!!!!!!! websocket으로 통신!!!!
                  this.sendStats(this.webSocketServer.clients, this.getStats(stats));
                }

                /**
                 * @private
                 * @type {Stats | MultiStats}
                 */
                this.stats = stats;
              }
            );
          }
        ```

    - 위 B 과정에서 들어간 client코드가 결국 runtime(bundle.js)에서 구동되고 있을것이다.
    - 따라서 본 C. 과정에서 socket을 사용하여 sendMessage을 하면 B과정에서 들어간 코드로 통신하게 된다.
- D. client(runtime) 쪽에서는, “통신” (수정 알림) 을 받으면, 브라우저를 재기동 하거나, moule replacement을 수행한다.
    - 참고: [https://github.com/webpack/webpack-dev-server/blob/master/client-src/utils/reloadApp.js#L41](https://github.com/webpack/webpack-dev-server/blob/master/client-src/utils/reloadApp.js#L41)

실제 구현 소스를 확인하면서, 예상한 기능요소(HMR)을 확인해본 결과 거의 예측한 형태로 구현되어 있음을 알 수 있다. 재미있는점은 webpack-dev-server는 hot-replacement 형태와 hot-reload(live-reload)형태를 모두 지원하고 있다. ([https://github.com/webpack/webpack-dev-server/blob/master/client-src/utils/reloadApp.js#L41](https://github.com/webpack/webpack-dev-server/blob/master/client-src/utils/reloadApp.js#L41))

live-reload 형태로 구동시에는 예전과 같이 browser을 재기동한다. 그외 replacement형태로 구동시에는 `hotEmitter.emit("webpackHotUpdate", status.currentHash);`와 같이 hotEmitter로 emit을 하는데 이때 hotEmitter는 `import hotEmitter from "webpack/hot/emitter.js";` 형태로 되어있다. 즉 webpack의 코드가 다시 구동되는 형태이다.

webpack코드에서는

- webpack/hot/dev-server.js
- webpack/hot/log-apply-result.js

위와 같은 코드를 구동하여 __**webpack_hash__**  을 업데이트 한다. 만약 실패시에는 다시 live-reload을 적용한다.

## Webpack Dev Server 사용하지 않고 HMR 해보기

webpack-dev-server는 항상 server(express)을 띄움으로, 내가 node 서버 개발을 할때 서버를 2개씩 띄우기 싫거나, live-reload보다는 replacement위주로 더 동작하게 하거나, 혹은 내가 개발하는 node서버를 재기동 하지 않고도 hot-replacement가 되게 하거나 하는 요구사항이 있을 수 있다.

이와 같은 경우, 기본적인 webpack-dev-server형태로는 한계가 있기 때문에, 위에서 설명한 webpack-dev-server의 개념(hmr사용)을 응용하여 나만의 hmr 서버를 구축 해야 한다.

내 서버가 기본적으로 아래 역할을 하면 된다.

- 내 서버에서 webpack 구동(watch)
- 내 서버에서 webpack 변경 감지(compiler.hooks.done)
- 클라이언트 코드에 “통신 / 재기동” 코드 넣어주기
- 클라이언트 코드에서 “통신 / 재기동” 코드가 구동되어서 동작되게 하기

사실 이미 위의 각각의 부분이 이미 express(node) 서버용 middleware 구현 및 webpack config시점에 code inject 형태로 구현되어 있다. 간략하게 해당 방법을 설명한다.

### 내 서버에서 webpack 구동, 내 서버에서 webpack 변경 감지(compiler.hooks.done)

서버 코드내에 아래와 같은 코드가 있으면 된다.

```tsx
import conf from './webpack.client.conf.js';

const webpack = require('webpack');
const webpackConfig = getClientConfig(conf);
const compiler = webpack(webpackConfig);

// 필자는 koa2 서버여서 express-to-koa로 미들웨어를 koa용으로 변경하였다.
// express 서버라면 그대로 사용 하면된다.
const e2k = require('express-to-koa');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

app.use(
  e2k(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      writeToDisk: true,
    }),
  ),
);
app.use(e2k(webpackHotMiddleware(compiler)));
```

- 'webpack-dev-middleware'
    - 서버에서 webpack 구동(빌드) 및 watch 하는 미들웨어
- 'webpack-hot-middleware'
    - 서버에서 webpack 컴파일 완료가 되면, “compiler.hooks.done” 을 직접 잡아서 해야 하는데 해당 역할을 해주는 미들웨어
    - 동시에 서버쪽의 websocket 역할도 하고 있다.
    - 참고: [https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/middleware.js](https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/middleware.js)
    - 당연히 build시 클라이언트 쪽에 ‘[https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/client.js](https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/client.js)’ 코드가 들어가야 한다. (runtime)
        - 넣을때, webpack-dev-server처럼 webpack-dev-middleware사용시 동적으로 넣어도 되고
        - 클라이언트 빌드용 webpack.config 파일에서 명시해서 넣어주어도 된다.


### 클라이언트 코드에 “통신 / 재기동” 코드 넣어주기

- [https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/client.js](https://github.com/webpack-contrib/webpack-hot-middleware/blob/master/client.js)
- 위 코드가 들어가야한다.
- webpack.client.config.js

```tsx
module.exports = () => {
  const entryName = 'yourEntryName';
  const hotMiddlewareScript = `webpack-hot-middleware/client?name=${entryName}&path=/__webpack_hmr&timeout=20000&reload=true`;

  return {
    target: 'web',
    name: entryName,
    context: path.resolve(root, `projects/${name}`),
    entry: {
      [entryName]: ['./src/index.js', hotMiddlewareScript], // webpack-hot-middleware/client 가 포함되게 한다.
    },
    ...
    plugins: [
      // HotModuleReplaceMentPlugin이 들어와야 한다.
      new webpack.HotModuleReplacementPlugin(),
      ...
    ],
  }
}
```

- `webpack-hot-middleware/client` 가 entry에 같이 들어와야 한다. (최종 빌드결과에 포하되게!!)
- `new webpack.HotModuleReplacementPlugin()` 플러그인이 추가되어야 한다.
    - webpack-hot-middleware/client는 process-update.js을 사용한다.
    - webpack-hot-middleware/process-update.js 에서는 module.hot을 검사한다.
    - module.hot은 `new webpack.HotModuleReplacementPlugin()` 이 있어야만 한다.

위의 설정(서버쪽 middleware, 클라이언트 webpack.client.conf) 을 완료하고, 서버를 수행하여 클라인트 동적 빌드 이후, 클라이언트 코드를 수정하면 정상적으로 코드가 HMR 되는것을 확인 할 수 있다.


```toc

```
