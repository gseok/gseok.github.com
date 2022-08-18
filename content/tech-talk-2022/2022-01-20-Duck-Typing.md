---
title: Duck Typing 덕 타이핑 이란?
date: 2022-01-20 18:10:00
updated: 2022-01-20 18:10:00
author: gseok
categories: tech-talk
tags: tech-basic
---

<aside>
💡 <bold>"If it looks like a duck, swims like a duck, and quacks like a duck, then it probably *is* a duck."
"무엇이든, 오리처럼 생겼고, 오리 처럼 걷고, 오리처럼 꽥꽥 거린다면 그건 오리다"</bold>
</aside>
<br/>

### 덕 타이핑(Duck Typing)  이란?

- 사실상 위의 정의가 Duck Typing의 알파이지 오메가 이다.  (핵심 내용을 담고 있다)
- Duck Typing의 개념은 [Duck Test](https://en.wikipedia.org/wiki/Duck_test)에서 유래하였다.
- **Duck Typing**은, **컴퓨터 프로그래밍 개념(패턴, 방법)**이다.
    - 컴퓨터 프로그래밍 언어에서 Type을 추론, (혹은 유추, 정의) 할때 사용된다.
    - 예제

    ```tsx
    // Typescript - Duck Typing
    interface Duck {
        talk(): void;
        swim(): void;
    }

    const duck = {
      talk: () => "꽥꽥",
      swim: () => "오리 수영",
    }

    const human = {
      talk: () => "안녕하세요",
      swim: () => "사람 수영",
    }

    function duckSwimAndTalk(duckType: Duck): void {
        return `swim >${duckType.swim()}, talk > ${duckType.talk()}`;
    }

    duckSwimAndTalk(duck);
    duckSwimAndTalk(human); // human이지만 Duck(interface) type 형태로 인식
    ```

    - 위 코드를 보면 "**어떤 타입에 걸맞은 변수와 메소드를 지니면 객체를 해당 타입에 속하는 것으로 간주"** 하고 있다.
    - 이처럼 **구조**가 같으면 같은 타입으로 간주하는 방식을 *Structural Typing*, Java/C# 등과 같이 **이름**을 기준으로 타입을 나누는 방식을 *Nominal Typing*이라 한다.

### 참고

- [https://en.wikipedia.org/wiki/Duck_test](https://en.wikipedia.org/wiki/Duck_test)
- [https://en.wikipedia.org/wiki/Duck_typing](https://en.wikipedia.org/wiki/Duck_typing)
- [https://ko.wikipedia.org/wiki/덕_타이핑](https://ko.wikipedia.org/wiki/%EB%8D%95_%ED%83%80%EC%9D%B4%ED%95%91)
- *추천* - [https://theburningmonk.com/2015/05/why-i-like-golang-interfaces/](https://theburningmonk.com/2015/05/why-i-like-golang-interfaces/)
    - Duck Type - 편리함과 안정성의 균형...
- *추천* - [https://soopdop.github.io/2020/12/09/duck-typing/](https://soopdop.github.io/2020/12/09/duck-typing/)
    - *Structural Typing*, *Nominal Typing* 관련 내용이 잘 설명
- *추천* - [https://velog.io/@thms200/Typescript-Duck-Typing-덕타이핑](https://velog.io/@thms200/Typescript-Duck-Typing-%EB%8D%95%ED%83%80%EC%9D%B4%ED%95%91)
    - 오버로딩, 오버라이딩 관점의 내용이 있음, 딱 들어 맞지는 않지만 좋은 내용

```toc

```
