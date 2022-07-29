# real deploy
- 아래 명령어 수행
- JEKYLL_GITHUB_TOKEN= 이 bash에 export되어 있어야 한다.
```
JEKYLL_ENV=production bundle exec jekyll build
```

- _site에 빌드 결과물이 나옴
  - 해당 결과물 (_site)폴더를 flat하게 내려서 gseok.github.com 에 main(master)에 push하면 서빙됨


# about-react 적용
- 1. ```packages/about-react```에서 real build을 수행한다.
- 2. ```packages/about-react/_site```에 생성되는 폴더들을 ```packages/v3.0```의 폴더로 복사한다.
```
- packages/about-react/_site/assets/about-images 폴더 -> packages/v3.0/assets/about-images 로 복사
- packages/about-react/_site/assets/css 폴더 -> packages/v3.0/assets/css 로 복사(단 main.css는 제외!!!)
- packages/about-react/_site/assets/js/about-react 폴더 -> packages/v3.0/assets/js/about-react 로 복사
```
