# 소개
- 개인 homepage 프로젝트 입니다.
- 개인 블로그 및 개인 소개(about) 형태로 되어 있습니다.
- 최종적으로는 github의 staitc page 서빙을 통해서, 서비스 됩니다.
- Gatsby 을 사용하여 구성되어 있으며, [zoomkoding-gatsby-blog](https://github.com/zoomKoding/zoomkoding-gatsby-blog)을 fock하여 확장 구현하였습니다.

# 폴더 구조 설명
```
.
├── assets - about 화면 및 각 blog post의 image을 모아둔 폴더
├── content - 실제 각 blog post 을 작성하는 md파일 모음 폴더,
├── gatsby-browser.js - gatsby 설정
├── gatsby-config.js - gatsby 설정
├── gatsby-meta-config.js - gatsby의 custom value(meta)설정
├── gatsby-node.js - gatsby 설정
├── netlify.toml - netlify 배포용설정 - 미사용(netlify.app으로 배포되어 미사용중)
├── package-lock.json
├── package.json - dep 및 script 정의
├── public - 리얼 배포를 위한, 최종 빌드 결과가 모이는곳, 해당 폴더가 master로 배포되는 형태
├── scripts - image optimize을 위한 코드가 있음
├── src - gatsby을 구성하는 react형태의 코드들, about을 직접 구현하여 구성함
├── static - og, favicon 이미지(static image용), 블로그 post등의 image는 위 assets활용
└── yarn.lock
```


# 개발환경 설정
1. node.js 및 npm 혹은 yarn 설치 필요
2. npm install 혹은 yarn install 이후 별도의 설정 없이 개발 환경 완료


# 개발시
- ```yarn clean && yarn start``` 형태로 실행
- http://127.0.0.1:8000/  접속하여 테스트

# 배포시
- 배포전에 반드시 로컬에서 실제 배포와 동일한 형태로 빌드 & 구동 확인하는 것이 좋다.
```
$ yarn clean && yarn build
$ cd public
$ http-server .
$ browser에서 http://127.0.0.1:8080/  접속하여 동작 확인
```
- 동작 확인이 완료되었다면, `v4.0-work` 에 코드를 push하면 `git action`을 통해서 자동 배포된다.
> 주의! 배포전에 Image Optimize을 하는게 좋다.!


# git action (git action 등록 방법입니다. 현재 프로젝트에는 이미 되어 있음!)
- Deploy형태로 git action(workflows)가 설정되어 있다.
  - 코드상 `.github/workflows/main.yml`에서 확인 가능하다.
- git action 설정 방법
  - [개인용 Token을 하나 발급 받습니다](https://github.com/settings/tokens)
    - 이때 repo 권한 필요
    - `!!개인 Token 발급시 처음에 토큰값 복사해두기 필요!!`
  - [프로젝트에서 Action용 Secrets 설정]
    - https://github.com/{계정}/{프로젝트}/settings/secrets/actions
  - Git Action 등록
    - 이때 Gatsby이기 때문에 아래 action활용 (사용자 self action 선택 후)
    - https://github.com/enriikke/gatsby-gh-pages-action

# Image Optimize
- 블로그 포스트 등에서 사용하는 png, jpg이미지를 최적화 합니다.
- tinypng이 api을 사용(월 500건까지 무료) 합니다.
- 무료 월 500건 제약이 있기 때문에 최적화 전에, 500건 사용 여부를 미리 체크합니다.
- optimize된 파일 list을 기억하기 위한 용도로 .optimizelist 파일을 하나 사용합니다.
- tinypng에서 제공하는 api역시 api-key가 필요합니다.
- 해당 key는 ```TINY_PNG_API_TOKEN``` 형태로 ```.bashrc```나 ```.zshrc```에 미리 추가해서 사용합니다.
  - tinypng는 개인적으로 gmail로 가입해서 사용중입니다. -> 키 분실시 찾기 쉽게 하기 위해 기록해둡니다.

# 클린
- ```yarn clean```
- 관련 명령어로 clean수행 가능합니다.
- Gatsby역시 .cache폴더를 생성하여 사용함으로, 클린한 상태에서 테스트 혹은 개발시 사용합니다.


# 주의!
- 배포전 꼭 Local 에서 Real와 동일하게 `빌드` 하고 `public`폴더를 서빙하여 확인 필요!
