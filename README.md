# 소개
- 개인 homepage 프로젝트 입니다.
- 개인 블로그 및 개인 소개(about) 형태로 되어 있습니다.
- 최종적으로는 github의 staitc page 서빙을 통해서, 서비스 됩니다.
- Lerna 구조로 mono-repo구조로 만들었습니다.
  - 개인 블로그: jekyll을 통해서 md(markup) 형태로 포스팅을 합니다.
  - 개인 소개: react프로젝트로 개인소개인 about 영역의 컨텐츠를 독립적으로 제공합니다.


# 폴더 구조 설명
- packages/v2.0 - 블로그(jekyll), so simple theme을 이용한 블로그 입니다. 개인 소개 위주로만 되어 있고 현재 deprecated되었습니다.
- packages/v3.0 - 블로그(jekyll), next theme(https://simpleyyt.com/jekyll-theme-next) 으로 되어 있습니다.
- packages/about-react - 개인소개 페이지, react로 구성되어 있으면, 전체 page의 about영역에서 개인 소개를 위한 형태로 되어 있습니다.


# 공통적인 jekyll 개발환경 설정 - v2.0, v3.0 모두 jekyll 기반으로 동일하게 필요한 설정 입니다.
1. ruby 환경설정 (https://jekyllrb.com/docs/windows/)
2. jekyll 와 bundler 설치 (gem install jekyll bundler)
3. jekyll dependency 설치 (bundle install)


# 개발시 - v3.0기준 (v2.0은 - v2.0내의 readme.md 참고)
- ```bundle exec jekyll serve --livereload``` 형태로 실행
- http://127.0.0.1:4000/  접속하여 테스트

# 배포시 - v3.0기준 (v2.0은 - v2.0내의 readme.md 참고)
- jekyll로 기본적인 static serve용 홈페이지 생성
  - jekyll_env을 명시적으로 prod모드로 주고 build수행 필요
  - 이때 github_token을 주어야 빌드 결과의 url path가 잘 맞게 됩니다.
  - JEKYLL_GITHUB_TOKEN= 이 bash(.zshrc)에 export되어 있어야 한다. 코드에 아래와 같은 토큰이 노출된채로 git push되면 자동으로 토큰이 사라집니다.
  - ```JEKYLL_GITHUB_TOKEN=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 JEKYLL_ENV=production bundle exec jekyll build```
  - ```packages/v3.0/_site```에 빌드 결과물이 나옵니다.
    - 해당 결과물 (_site)폴더를 flat하게 내려서 gseok.github.com 에 main(master)에 push하면 서빙됨
  - !!```The GitHub API credentials you provided aren't valid``` 에러 발생시 위 github token이 잘못되어 있을 가능성이 높음 해당 부분 먼저 체크한다.
    - https://github.com/settings/tokens
- react 프로젝트는 별개로 빌드 후 위 _site폴더의 ```assets > js > react-component``` 형태로 추가해야 합니다.

# Travis-CI 배포 - v3.0
- travis-ci 을 통한 자동 배포 설정이 되어 있습니다.
- develop 브랜치에 push가 발생하면 자동 배포가 이루어 집니다.
- JEKYLL_GITHUB_TOKEN 환경변수 및 GITHUB_TOKEN 환경변수에 github에 대한 token이 설정되어 있습니다. (이는 travis-ci의 setting에 설정되어 있습니다.)

# Image Optimize
- 블로그 포스트 등에서 사용하는 png, jpg이미지를 최적화 합니다.
- tinypng이 api을 사용(월 500건까지 무료) 합니다.
- 무료 월 500건 제약이 있기 때문에 최적화 전에, 500건 사용 여부를 미리 체크합니다.
- optimize된 파일 list을 기억하기 위한 용도로 .optimizelist 파일을 하나 사용합니다.
- tinypng에서 제공하는 api역시 api-key가 필요합니다.
- 해당 key는 ```TINY_PNG_API_TOKEN``` 형태로 ```.bashrc```나 ```.zshrc```에 미리 추가해서 사용합니다.
  - tinypng는 개인적으로 gmail로 가입해서 사용중입니다. -> 키 분실시 찾기 쉽게 하기 위해 기록해둡니다.

# husky
- 사실 git을 협업으로 사용시 develop 브랜치 역시 곧바로 push을 하지 못하게 하고, code pr을 활용하는게 좋습니다.
- 다만 본 프로젝트는 개인 프로젝트로 develop으로 직접 push을 하고 있습니다.
- 현재 develop 브랜치로 push하면 travis-ci가 자동 배포 되고 있습니다.
- develop으로 push시 build에러등을 미리 감지하기 위해 husky을 도입하였습니다.
  - 따라서 local에서 개발시 develop branch로 push을 하면 local에서 먼저, real build test을 선 수행하게 됩니다.

# 클린
- ```bundle exec jekyll clean```
- 관련 명령어로 clean수행 가능합니다.


# 주의!
- 기본(blog): _site폴더의 생성 확인
- 개인(about): _site폴더의 assets > js > reactComponents 폴더의 생성 확인
