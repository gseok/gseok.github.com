# 개발시
* _config.yml 에 url을 local 주소로 변경
* npm start (package.json에 script>start)로 구동

# 배포시
* _config.yml 에 url을 github 주소로 변경
* npm build (package.json에 script>build)로 구동

# 클린
* _site 와 node_modules 폴더를 제거
* bundle exec jekyll build 로 static 빌드
* about은 react로 구성 따라서. 아래 두 명령어 필요.
** npm install (디펜던시 인스톨)
** npm start(개발시), npm build(배포시)

# 확인
* _site폴더의 생성 확인
* _site폴더의 assets > js > reactComponents 폴더의 생성 확인

# So Simple Theme

Looking for a simple, responsive, theme for your Jekyll powered blog? Well look no further. Here be **So Simple Theme**, the followup to [**Minimal Mistakes**](http://mmistakes.github.io/minimal-mistakes/) -- by designer slash illustrator [Michael Rose](http://mademistakes.com).

## Notable features:

* Compatible with Jekyll 3 and GitHub Pages.
* Responsive templates. Looks good on mobile, tablet, and desktop devices.
* Gracefully degrading in older browsers. Compatible with Internet Explorer 9+ and all modern browsers.
* Minimal embellishments and subtle animations.
* Optional large feature images for posts and pages.
* [Custom 404 page](http://mmistakes.github.io/so-simple-theme/404.html) to get you started.
* Basic [search capabilities](https://github.com/mathaywarduk/jekyll-search)
* Support for Disqus Comments

![screenshot of So Simple Theme](http://mmistakes.github.io/so-simple-theme/images/so-simple-theme-preview.jpg)

See a [live version of So Simple](http://mmistakes.github.io/so-simple-theme/) hosted on GitHub.

---

## Getting Started

So Simple takes advantage of Sass and data files to make customizing easier and requires Jekyll 3.x.

To learn how to install and use this theme check out the [Setup Guide](http://mmistakes.github.io/so-simple-theme/theme-setup/) for more information.

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/mmistakes/so-simple-theme/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
