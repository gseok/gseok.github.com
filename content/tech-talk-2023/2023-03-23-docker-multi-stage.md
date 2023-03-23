---
title: docker multi stage
date: 2023-03-23 17:00:00
author: gseok
categories: tech-talk
tags: docker tech-basic
---

### docker multi stage, multiple from 구문 활용하기

single dockerfile을 사용하여 여러가지 환경을 구축하고 있다가, [Multi-stage builds in Docker](http://blog.alexellis.io/mutli-stage-docker-builds/) 라고하는 기법을 알게 되었습니다. 이를 활용하여 다단계 형태의 dockerfile 의 활용을 통하여, 좀더 compact한 dockerfile관리 및 사용을 적용하였습니다.

[Multi-stage builds in Docker](http://blog.alexellis.io/mutli-stage-docker-builds/)  링크의 경우, 빌드 스텝과, 빌드 결과를 사용(활용) 하는 것을 docker의 multiple from 구문을 활용하여 작성한 예시를 보여줍니다. 필자의 경우 이런 형태는 아니고, docker로 만드는 최종 목적이, 기본적인 프로젝트 구동 환경(node, python, nvm)이었는데, 해당 환경을 어떻게 docker multiple from 을 통하여 수정하였는지 예시를 들어 보겠습니다.

### 들어가기 전에

가장 핵심이 되는 요소를 들어가기 전에 이야기 하겠습니다.


> A. Dockerfile 내부에, 여러개의 From 구문이 있을때, docker build을 통하여 생성하는 최종 docker image는 마지막 From 구문의 image 을  base로 생성됩니다.

> B. Dockerfile 내부에, 여러개의 From 구문이 있을때, 각 From 구문에 AS 구문을 통하여 별칭 사용이 가능합니다.

> C. Dockerfile 내부에, 여러개의 From 구문이 있을때, 각 Form 구문에 해당하는 이미지 내부의 명령어(RUN)사용이 가능합니다.

> D. Dockerfile 내부에, 여러개의 From 구문이 있을때, 각 From 구문에 해당하는 이미지의 file을 COPY을 통하여 가져올 수 있습니다.


아래는 위 내용의 예시입니다.

```docker
# as 구문을 통하여 별칭 지정 가능
FROM python:2.7.18 AS py

# 특정 이미지의 명령어 사용 가능
FROM node-nvm:18.13.0 AS nd
RUN npm run build:project

# 바탕이 되는 기본 이미지는 ubuntu (최종 목적 이미지)
FROM ubuntu:20.04

# python 설치 복사 - 최종 목적 이미지에 python이 복사됨(설치됨!)
COPY --from=py /usr/local/bin /usr/local/bin
COPY --from=py /usr/local/lib /usr/local/lib
COPY --from=py /usr/local/include /usr/local/include
ENV PYTHONHOME=/usr/local/python
ENV PYTHONPATH=/usr/local/lib/python2.7

# node 설치 복사 - 최종 목적 이미지에 node가 복사됨(설치됨!)
COPY --from=nd --chown=user1:user1 /home/user1/.nvm /home/user1/.nvm
COPY --from=nd --chown=user1:user1 /home/user1/.npm /home/user1/.npm
ENV NVM_DIR=/home/user1/.nvm

# 본 Dockerfile을 build하여 생성하는 이미지는
# ubuntu기반에, python와 node(nvm)이 설치된 이미지가 된다.
CMD ["node"]
```

### 기존 방법

기존에는 하나의 docker파일에서 모든걸 다 설치하는 형태를 취하고 있었습니다.

```docker
FROM ubuntu:20.04

ARG NODE_VERSION=18.13.0
ARG PM2_VERSION=5.2.2

# upgrade
USER root
RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential zlib1g-dev libcurl4-openssl-dev curl wget libjson-c-dev

# python 2.7.18 설치
RUN mkdir -p /tmp
WORKDIR /tmp
RUN wget https://www.python.org/ftp/python/2.7.18/Python-2.7.18.tgz
RUN tar xzf Python-2.7.18.tgz
WORKDIR /tmp/Python-2.7.18
RUN ./configure --enable-optimizations
RUN make install

# node - nvm 설치
USER user1
WORKDIR /home/user1/
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
ENV NVM_DIR=/home/user1/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="$NVM_DIR:/home/user1/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

# clean
USER root
RUN apt-get autoremove
RUN apt-get clean
RUN rm -rf /var/lib/apt/lists/*
RUN rm -rf /tmp/Python-2.7.18.tgz
RUN rm -rf /tmp/Python-2.7.18

# endpoint
CMD ["node"]
```

- 해당 형태로 사용시, 대략 아래와 같은 도커 빌드 속도와, 최종 이미지 용량이 나왔습니다. (저의 실제 프로젝트에서는 위 내용보다 더 많은 내용이 있어서 아래 용량이 정확하기 위 코드와 일치하지는 않습니다.)
    - **docker build → 750 ~ 850 sec**
    - **image 용량 → 1GB**

### 변경한 방법

```docker
FROM python:2.7.18 AS py
FROM node-nvm:18.13.0 AS nd

# base ubuntu
FROM ubuntu:20.04

# python
COPY --from=py /usr/local/bin /usr/local/bin
COPY --from=py /usr/local/lib /usr/local/lib
COPY --from=py /usr/local/include /usr/local/include
ENV PYTHONHOME=/usr/local/python
ENV PYTHONPATH=/usr/local/lib/python2.7

# node
COPY --from=nd --chown=user1:user1 /home/user1/.nvm /home/user1/.nvm
COPY --from=nd --chown=user1:user1 /home/user1/.npm /home/user1/.npm
ENV NVM_DIR=/home/user1/.nvm

# end-point
CMD ["node"]
```

- **docker build → 70 ~ 100 sec**
- **image 용량 → 600MB**
- 성능 향상
    - docker build  속도 약 10배 향상!
    - 용량 1.6배 줄임!

### 변경한 방법에서 필요한것

- 기존 방법에서는 `ubuntu:20.04` 이미지가 필요했습니다.
- 변경한 방법에서는 아래 3개의 이미지가 필요합니다.
    - `python:2.7.18`
    - `node-nvm:18.13.0`
    - `ubuntu:20.04`
- 각각의 이미지는 기존에 있는(공식 제공되는 것)을 사용할 수도 있고, 직접 구축하여서 사용할 수도 있습니다.
- 본 예제에서는 최종 목적 image가 ubuntu20.04 인데, 별도의 python2.7.18(ubuntu용), node+nvm(ubuntu용)을 구할수 없다면 해당 이미지를 직접 구축하여야 합니다.
- python:2.7.18 - ubunut 기반용

    ```docker
    FROM ubuntu:20.04

    USER root
    RUN apt-get update && apt-get upgrade -y && apt-get install -y build-essential zlib1g-dev libcurl4-openssl-dev curl wget libjson-c-dev

    # python 2.7.18
    RUN mkdir -p /tmp
    WORKDIR /tmp
    RUN wget https://www.python.org/ftp/python/2.7.18/Python-2.7.18.tgz
    RUN tar xzf Python-2.7.18.tgz
    WORKDIR /tmp/Python-2.7.18
    RUN ./configure --enable-optimizations
    RUN make install

    # end-point
    CMD ["python"]
    ```

- node-nvm:18.13.0 -ubuntu 기반용

    ```docker
    FROM python:2.7.18 AS py
    FROM ubuntu:20.04

    # python 설치 복사
    COPY --from=py /usr/local/bin /usr/local/bin
    COPY --from=py /usr/local/lib /usr/local/lib
    COPY --from=py /usr/local/include /usr/local/include

    ENV PYTHONHOME=/usr/local/python
    ENV PYTHONPATH=/usr/local/lib/python2.7

    ARG NODE_VERSION=18.13.0

    # node
    USER user1
    WORKDIR /home/user1/
    RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
    ENV NVM_DIR=/home/user1/.nvm
    RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
    RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
    RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
    ENV PATH="$NVM_DIR:/home/user1/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
    RUN node --version
    RUN npm --version

    # end-point
    CMD ["node"]
    ```


### 정리

dockerfile의 문법상 FROM구문을 여러개 사용가능한데, 해당 방법(multi-stage, multiple from)을 응용하여, 최종 목적 dockerfile 구성시, 다채로운 형태로 작성이 가능합니다. 지금 그냥 하나의 dockerfile에서 하나의 FROM 구문으로 너무 많은 일을 하고 있다면, multi-stage(multiple from)사용이 해결책이 될 수도 있습니다.

### 참고

- [https://stackoverflow.com/questions/33322103/multiple-froms-what-it-means](https://stackoverflow.com/questions/33322103/multiple-froms-what-it-means)
- [https://blog.alexellis.io/mutli-stage-docker-builds/](https://blog.alexellis.io/mutli-stage-docker-builds/)