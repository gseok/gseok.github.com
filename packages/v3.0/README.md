# real deploy
- 아래 명령어 수행
- JEKYLL_GITHUB_TOKEN= 이 bash에 export되어 있어야 한다.
```
JEKYLL_ENV=production bundle exec jekyll build
```

- _site에 빌드 결과물이 나옴
  - 해당 결과물 (_site)폴더를 flat하게 내려서 gseok.github.com 에 main(master)에 push하면 서빙됨


