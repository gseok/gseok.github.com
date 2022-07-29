---
title: react + typescript에서 svg import로 사용하기
date: 2020-03-01 23:29:53
updated: 2021-06-22 09:20:00
author: gseok
categories: tech-talk react
tags: react typescript svg
---

**react + typescript에서 svg import로 사용하기**

- scss처럼 svg을 react module처럼 쓰기 위해서는 아래와 같은 처리 필요
    - a. 우리는 typescript이기 때문에 최초 typescript(tsc)가 알아먹도록 type정의 추가 필요

```jsx
// @types/index.d.ts 에 정의
// @types/index.d.ts는 tsconfig.json 에 typeRoots로 인식하게 해둠.
// tsconfig.js는 webpack의 ts-loader 에서 configFile을 통해서 설정.
// 따라서 webpack build을 통해서, 아래 정의가 인식됨.
declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
```

- b. type스크립트 이후 react가 component형태로 알아먹게 하기 위해서, `@svgr/webpack` 와, `url-loader` 필요
- c. 이제 각 webpack의 rule에 아래와 같이 svg 모듈 처리 추가 필요

```jsx
// webpack.config.js 에 아래 rule이 추가되어야함.
{
      test: /\.svg$/,
      use: [
        { loader: '@svgr/webpack' },
        { loader: 'url-loader' },
      ],
}

```

- d. 일반적인 프로젝트에서는 위 설정적용으로 완료인데, storybook은 그래도 에러 발생, 이유는 - storybook의 내장 webpack설정에 svg파일은 file-loader로 rule이 정의되어 있음. 해당 부분을 storybook webpack hook(config hook)으로 덮어 써야함

```jsx
// 스토리북을 사용하는경우, .storybook/main.js 에 아래와 같이 storybook의 기본 loader
// file-lodaer을 override하여 svg을 exclude하고, 위 a,b,c와 같이 svg용 loader을
// 추가
module.exports = {
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
        },
        // Optional
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
      ],
    });
    config.module.rules.push({
      test: /\.module\.(scss|sass)$/,
      use: [
        { loader: 'style-loader'},
        {
          loader: 'css-loader',
          options: { importLoaders: 1, modules: true },
        }, // to convert the resulting CSS to Javascript to be bundled (modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class)
        { loader: 'resolve-url-loader' },
        { loader: 'sass-loader' }, // to convert SASS to CSS
      ],
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        { loader: '@svgr/webpack' },
        { loader: 'url-loader' },
      ],
    });
    // NOTE: modify storybook's file-loader rule 에서 svg 룰 제거해야함 !!!!
    const fileLoaderRule = config.module.rules.find(rule => rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  },
  stories: ['../**/*.stories.[tj]sx', './*.stories.[tj]s'],
};
```

- e. 사용

```jsx
// storybook이나, 실제 개발환경에서 빌드에러없이 빌드 되면 아래와 같이 사용 가능.

// 1. component로 사용, react components 형태로 사용가능
import { ReactComponent as TestIcon } from 'test.svg';
const Test = () => <TestIcon />;

// 2. text(string)으로 사용, 아래처럼 import하면 svg str이 넘어옴, 사용은 img태그등의 src로 사용.
import testIconSvgStr from 'test.svg';
const Test = () => <><img src={testIconSvgSgr} /></>;
```

참고: [https://stackoverflow.com/questions/54121536/typescript-module-svg-has-no-exported-member-reactcomponent](https://stackoverflow.com/questions/54121536/typescript-module-svg-has-no-exported-member-reactcomponent)

참고: [https://github.com/boopathi/react-svg-loader/issues/197](https://github.com/boopathi/react-svg-loader/issues/197)

참고: [https://stackoverflow.com/questions/54292667/react-storybook-svg-failed-to-execute-createelement-on-document](https://stackoverflow.com/questions/54292667/react-storybook-svg-failed-to-execute-createelement-on-document)

참고: [https://www.npmjs.com/package/@svgr/webpack](https://www.npmjs.com/package/@svgr/webpack)

참고: [https://medium.com/@allalmohamedlamine/react-best-way-of-importing-svg-the-how-and-why-f7c968272dd9](https://medium.com/@allalmohamedlamine/react-best-way-of-importing-svg-the-how-and-why-f7c968272dd9)