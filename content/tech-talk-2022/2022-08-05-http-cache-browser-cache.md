---
title: http(web) cache 이해하기 - browser cache
date: 2022-08-05 11:00:00
author: gseok
categories: tech-talk
tags: tech-basic
---

### 소개

web에서 cache는 좀더 포괄적인 의미인데, 혼용하여 쓰거나, 정확하게 이해하고 사용하지 않는 부분이 존재한다. 따라서 http(web) cache 개념을 대략적으로 이해하지 말고, 정확하게 이해해보기 위한 글이다.


### Web Cache란?

web site을 사용할때 발생하는 cache의 종류 이다. web 을 사용할때, 웹 서버에서 웹페이지, 이미지, 멀티미디어 리소스등의 웹 정보들을 전달해준다. 이러한 정보를 저장하여, 웹 서버를 매번 사용하지 않고, cache을 사용하여, 응답시간 및 네트웍 비용을 줄이고, 성능을 향상시킨다.

### Web Cache의 종류

web을 사용할때, server, client로 사용자(consumer), 제공자(provider)로 사용의 주체가 나뉘고, network 및 tool(browser)관점에서는, browser, proxy, gw, dns, cdn 등으로, 제공 주체(tool)이 나뉜다.  또한 최종 컨텐츠(page, site 등등)도 나뉠수 있다. 따라서 이 각각이 cache을 가질 수 있다.

- Server 캐시
    - 서버에서 저장하여 제공하는 캐시
    - CDN, DNS, Proxy등 해당 서버에서 저장한다면 sever 캐시로 볼 수 있음
    - CDN cache, DNS cache등은 결국 Server캐시의 specific한 이름(더 상세한 이름)
- Site 캐시
    - page캐시라고도 불림
    - client-side 캐시의 일종임
        - 여담이지만 GraphQL와 같은 기술은 client cache을 잘 활용한다.
        - 즉 client(fe)입장에서 in-memory성 캐시를 잘 활용함.
    - 웹 페이지가 로드 될때, 웹사이트 데이터를 저장,(사실상 element 구조 저장)
    - e.g) [https://wordpress.org/plugins/wp-super-cache/](https://wordpress.org/plugins/wp-super-cache/)
- **Browser 캐시***
    - http(web) cache 라고 불린다. (사실 위 설명처럼 web cache는 포괄적 개념인데 혼용하여 쓴다.)
        - 우리는 좀더 정확하게 browser cache(http cache)라는 용어를 활용하자…
    - client ↔ server에서 client가 보통 browser가 된다.
    - 따라서 이 Browser가 http 요청을 disk 나 memory에 캐시하여 사용한다.
    - 당연한 말이지만, client ↔ server간의 req ↔ res 에 이러한 캐시관련 어떤 규칙이 있어야 한다.!

### Browser Cache 어떻게 하나?

***기본적으로 http 프로토콜의 Header 을 통해서 한다.!***

보통 http의 get 메소드의 header을 통해서 합니다. http는 req - res 간의 응답코드(response status code)을 가지는데이때 아래와 같은 응답 코드 가 오는경우, 캐시(http header)을 확인하게 됩니다.

- 200 ok (get요청 관련)
- 301 move permanently (영구 리다이렉트)
- 404 not found (오류 응답)
- 206 parital content (일부 캐시, 완전하지 않은 응답, 부분응답)

더 자세한 내용은 MDN 문서 보기 → [https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)

### Browser Cache - Fresh, Stale 상태

저장된(cached된) HTTP Res는 2가지 상태를 가집니다.

- Fresh: 재사용 가능한 상태. valid함
- Stale: expired된(실효…) 상태, 오래된 상태.
    - 기본적으로, fresh가 age을 을 먹으면 stale상태가 된다.

### Browser Cache - Cache 제어

**`Cache-Control` 헤더**

- req, res 양쪽에 해당 헤더를 정의 할 수 있다.
- HTTP/1.1 스펙이고, 이전 헤더(Expires)을 대체하는 헤더이다.
- 해당 지시문의 값을 통해서, 조건, 기간 등을 정의 할 수 있다.
- **Cache-Control 헤더의 여러 값들 살펴보기**
    - **`Cache-Control: no-store`**
        - 캐시 하지 않음, 아무것도 저장하지 않음
    - **`Cache-Control: no-cache`**
        - 캐시 하지 말라는거 아님!, 캐시 쓰기 전에 서버에 해당 캐시 써도 되냐고 질의
        - 즉 캐시된 복사본을 사용자 응답으로 쓰기전에, 유효성 확인을 위해 원 서버에 요청 보냄.
        - 즉 캐시를 하고 있지만, 유효성 검사(validation)을 하도록 강제함. 캐시를 가지고 있으면서, freshness을 유지
    - `Cache-Control: private`
        - 단일 사용자를 위한 캐시, 브라우저 같은 개인 환경에만 저장하라는 뜻이된다.
        - 즉 어떤  req가 여러 중계 서버(gw, proxy, 등)들을 통할때 해당 부분에서는 캐시 하지 말라.

            ![[https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching/type-of-cache.png](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching/type-of-cache.png)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching/type-of-cache.png)

            [https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching/type-of-cache.png](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching/type-of-cache.png)

    - `Cache-Control: public`
        - 공유캐시(중개서버) 등에 저장해도 무방하다.
        - 대부분 max-age등 사용시 어떤 경우든 사용가는하다는 의미가 내포 되어 있어, public을 따로 주지 않아도 된다.
    - `Cache-Control: max-age=31536000`
        - `max-age=<seconds>`
        - 유효성 검사, *expires* 가 별도로 존재해도, 해당 값(*max-age*) 가 우선된다.
        - 변경되지 않을 정적파일(이미지, js파일)등은 긴 시간(1년) 캐시 하는 전략을 사용 할 수 있다.
        - cache 되어 있는 값의 상태
            - fresh: 유효한 상태
            - stale: 오래된(부실한) 상태 - 만료를 의미한다.
        - cache 값 판별 기준은 `age` 값을 활용한다.

            ```json
            // res
            HTTP/1.1 200 OK
            Content-Type: text/html
            Content-Length: 1024
            Date: Tue, 22 Feb 2022 22:22:22 GMT // 응답시간
            Cache-Control: max-age=604800
            Age: 86400 // age는 응답이 생성된 이후 경과된 시간, 공유캐시에서 전송
            ```

    - `Cache-Control: must-revalidate`
        - 검증용 디렉티브, 리소스를 사용하기 전에 검증, 오래된 리소스는 미사용!
        - http가 특정상황(네트워크 연결 끊어짐) 등에서 fresh한 상태가 아닐때, cache가 사용되면 문제가 발생하는 경우가 존재 할 수 있다.(금융거래 등의 상황), 이러한 경우, 해당 디렉티브를 사용하여, freshness 을 검증한다.
        - no-cache와 혼동이 있는데 의미가 다르다.!
        - max-age=10 일때, no-cache는 0초 이후 발생(의미)을 가지고, must-revalidate는 10초 후 의미를 가진다.
        - no-cache는 오래되어도 쓰겠다는(없는거 보다 낳다)는 의미를 가지고, must-revalidate는 안쓰겠다는 의미를 가진다.
        - 해당 부분 stack-overflow: [https://stackoverflow.com/questions/18148884/difference-between-no-cache-and-must-revalidate](https://stackoverflow.com/questions/18148884/difference-between-no-cache-and-must-revalidate)

`Last-Modified` (res), `If-Modified-Since` (req) 헤더

- fresh 상태 확인을 위한 헤더들 res, req가 연관이 있다.
- Last-Modified 헤더(res)가 들어와야 req에 사용이 가능하다.
    - [https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Last-Modified](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Last-Modified)
    - HTTP 헤더에 서버가 알고있는 가장 마지막 수정된 날짜와 시각을 담고 있습니다. 이는 저장된 리소스가 이전과 같은지 유효성 검사자로 사용 된다.
- 다음 예제로 보자

    ```json
    // RES!

    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: 1024
    Date: Tue, 22 Feb 2022 22:22:22 GMT
    Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT // 해당 헤더가 있어야 req시 If-Modified-Since 사용 가능
    Cache-Control: max-age=3600
    ```

    - 해당 RES는 22:22 에 생성되었고, 1시간의 max-age가 설정되어있다.
    - 따라서 23:22까지는 fresh 함을 보장한다.
        - **23:22 가 되면 해당 cache는 stale 되어진다**.
    - 해당 캐시 데이터는 22:00 분에 마지막으로 수정된 값으로 생성되었다.

    ```json
    // REQ!!

    GET /index.html HTTP/1.1
    Host: example.com
    Accept: text/html
    If-Modified-Since: Tue, 22 Feb 2022 22:00:00 GMT // RES의 Last-Modifined사용!
    ```

    - res 에서 23:22 이 되면 해당 cache가 stale해지기 때문에, 신규 req시 특정 시간 이후 변경사항이 존재하는지 검증 요청을 다시 보낼 수 있다.!!!
    - 즉 현재 안전한 시간이라도, 한번 더 검증을 위해서 검증 요청을 보낸다.
        - 클라(브라우저)가 서버한테 → 음.. 나 캐시값 있는데.. 이거 그냥 써도 되니? 라고 하는것.

    ```json
    // RES!

    HTTP/1.1 304 Not Modified
    Content-Type: text/html
    Date: Tue, 22 Feb 2022 22:23:22 GMT
    Last-Modified: Tue, 22 Feb 2022 22:00:00 GMT
    Cache-Control: max-age=3600
    ```

    - 서버가 304 Not Modified 응답을 주면, 지정된 캐시 컨트롤 시간 이후, 내용이 그대로라는걸 알려 줄 수 있다.
        - 서버가 클라(브라우저)한테 → 응.. 아직 바뀐거 없어 캐시된거 그냥 쓰렴~ 이라고 하는것
    - 물론 304 가 아니면, 신규 요청 - 응답 형태가 되어야 한다.

`ETag` (res), `If-None-Match` (req) 헤더

- last-modified 의 서버시각 문제등을 해결.
- 결국 fresh 상태 확인을 위한 헤더들,  ETag (res), If-None-Match (req), If-Match (req) 형태의 사용을 한다.
- last-modified와 같이 res에 ETag가 있어야 req에서 사용 가능하다.
- 결국 cache validation 을 하는거다.
- 다음 예제로 보자

    ```json
    // RES

    HTTP/1.1 200 OK
    Content-Type: text/html
    Content-Length: 1024
    Date: Tue, 22 Feb 2022 22:22:22 GMT
    ETag: "deadbeef"
    Cache-Control: max-age=3600

    <!doctype html>
    …
    ```

    - 1시간, 22:22 에 만듬, 23:22 에 만료
    - ETag 특정값 존재, last-modified와 별개로, 서버가 content의 캐시(값)을 관리 (동일 데이터 인가..!)

    ```json
    // REQ

    GET /index.html HTTP/1.1
    Host: example.com
    Accept: text/html
    If-None-Match: "deadbeef"  // ETag 가 있어야 사용 가능
    ```

    - 서버에 req 보낼때 ETag검증 요청!
        - If-None-Match는 변경이 되었다면 알려줘!
        - If-Match는 변경이 안되었다면(똑같으면) 알려줘!
    - 위 Req가 같을 때 다시 응답은 아래와 같음, Get, Put 와 같이 요청에 따라 다르다.
        - Get: 검증했는데 맞으면 304 Not Modified, 만약 새로운 리소스(새버전) 존재시 200ok와 새로운 Etag을 다시 서버가 Res 함
        - Put: 변경이 되었을때 혹은 같은때, 200 ok 와 새로운 Etag, ETag가 다르면412 precondition failed


💡 ETag 와 Last-Modified 가 같이 있는 경우?
- ETag가 우선된다.!
- 둘다 있을때 Cache Validation으 ETag가 우선되지만, CMS, 클롤러 등에서 Last-Modified을 사용 할 수 있다.(활용여지가 표준 헤더이다.) 따라서 같이 쓰는경우가 존재한다.



💡 ETag 와 Cache-Control 이 같이 있는 경우?
- 기본적으로 cache-control의 max-age까지 cache-control의 값을 활용한다.
- 시간이 만료되면, 유효성 검사를 한다.!
- 유효성 검사에서 304 Not Modified 나 200ok가 오면 해당 시점부터 다시 cache-control이 갱신되어 사용된다.



### Browser Cache의 Cache Control Flow Chart

![[https://web-dev.imgix.net/image/admin/htXr84PI8YR0lhgLPiqZ.png?auto=format&w=650](https://web-dev.imgix.net/image/admin/htXr84PI8YR0lhgLPiqZ.png?auto=format&w=650)](https://web-dev.imgix.net/image/admin/htXr84PI8YR0lhgLPiqZ.png?auto=format&w=650)

[https://web-dev.imgix.net/image/admin/htXr84PI8YR0lhgLPiqZ.png?auto=format&w=650](https://web-dev.imgix.net/image/admin/htXr84PI8YR0lhgLPiqZ.png?auto=format&w=650)


### 참고

- wiki: [https://en.wikipedia.org/wiki/Web_cache](https://en.wikipedia.org/wiki/Web_cache)
- aws web cache(dns cache): [https://aws.amazon.com/ko/caching/web-caching/](https://aws.amazon.com/ko/caching/web-caching/)
- cloud flare: [https://www.cloudflare.com/learning/cdn/what-is-caching/](https://www.cloudflare.com/learning/cdn/what-is-caching/)
- cache - blog: [https://mangkyu.tistory.com/69](https://mangkyu.tistory.com/69)
- web cache kind: [https://managewp.com/blog/types-of-web-cache](https://managewp.com/blog/types-of-web-cache)
- cache - kind - blog: [https://happist.com/558227/웹서버에서-많이-사용되는-캐시-종류에-대해-알아-보](https://happist.com/558227/%EC%9B%B9%EC%84%9C%EB%B2%84%EC%97%90%EC%84%9C-%EB%A7%8E%EC%9D%B4-%EC%82%AC%EC%9A%A9%EB%90%98%EB%8A%94-%EC%BA%90%EC%8B%9C-%EC%A2%85%EB%A5%98%EC%97%90-%EB%8C%80%ED%95%B4-%EC%95%8C%EC%95%84-%EB%B3%B4)
- cache - img - blog: [https://server-talk.tistory.com/469](https://server-talk.tistory.com/469)
- web-cache - blog
    - [https://wp-rocket.me/blog/different-types-of-caching/](https://wp-rocket.me/blog/different-types-of-caching/)
    - [https://hahahoho5915.tistory.com/33](https://hahahoho5915.tistory.com/33)
    - [https://velog.io/@jangwonyoon/캐시와-웹-캐시](https://velog.io/@jangwonyoon/%EC%BA%90%EC%8B%9C%EC%99%80-%EC%9B%B9-%EC%BA%90%EC%8B%9C)

    - [https://ko.wikipedia.org/wiki/웹_캐시](https://ko.wikipedia.org/wiki/%EC%9B%B9_%EC%BA%90%EC%8B%9C)
    - [https://goddaehee.tistory.com/171](https://goddaehee.tistory.com/171)
- http caching
    - 공식 스펙: [https://httpwg.org/specs/rfc9111.html](https://httpwg.org/specs/rfc9111.html)
    - [https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
    - [https://www.mnot.net/cache_docs/](https://www.mnot.net/cache_docs/)
    - [https://web.dev/http-cache/](https://web.dev/http-cache/)
- http cache validate
    - [https://withbundo.blogspot.com/2017/07/http-13-http-iii-if-match-if-modified.html](https://withbundo.blogspot.com/2017/07/http-13-http-iii-if-match-if-modified.html)
    - [https://goddaehee.tistory.com/171](https://goddaehee.tistory.com/171)
- toss- [https://toss.tech/article/smart-web-service-cache](https://toss.tech/article/smart-web-service-cache)

```toc

```
