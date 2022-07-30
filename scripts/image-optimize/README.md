# Image Optimize
- 블로그 포스트 등에서 사용하는 png, jpg이미지를 최적화 합니다.
- tinypng이 api을 사용(월 500건까지 무료) 합니다.
- 무료 월 500건 제약이 있기 때문에 최적화 전에, 500건 사용 여부를 미리 체크합니다.
- optimize된 파일 list을 기억하기 위한 용도로 ```optimizelist``` 파일을 하나 사용합니다.
- tinypng에서 제공하는 api역시 api-key가 필요합니다.
- 해당 key는 ```TINYPNG_API_TOKEN``` 형태로 ```.bashrc```나 ```.zshrc```에 미리 추가해서 사용합니다.
  - tinypng는 개인적으로 gmail로 가입해서 사용중입니다. -> 키 분실시 찾기 쉽게 하기 위해 기록해둡니다.
