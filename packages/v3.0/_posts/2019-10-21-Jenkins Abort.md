---
title: Jenkins Abort
date: 2010-10-21 23:29:53
updated: 2021-06-22 09:20:00
categories:
 - ci
tags:
 - jenkins
 - kubernates
 - unix
 - linux
 - devops
---

## 소개

약간 시대에 뒤떨어지는 UI/UX & 사용법으로, 사용자들이 많이 이탈하였지만, 아직도 Top20 등으로 CI/CD Tool검색시 항상 포함되는 정통의 강자가 Jenkins 이다. 여기서는, Jenkins의 Abort(Cancel) action에 대한 후처리(post control or after control)를 별도의 plugin설치 없이 simple하게 하는 방법에 대하여 설명한다.

## why needed?

- 현재 프로젝트에서, 서버로 API를 쏘는 CLI을 사용중인데, Jenkins에서 Cancel하여도, 실제 Build or Deploy동작은 Cancel되지 않는 문제가 있음.
- 해결방법으로, Jenkins에서 Cancel하면, 해당 동작을 감지하여 서버에 Cancel API을 호출하여 실제 Build or Deploy동작을 Cancel처리 하고자 함.

## pre required knowledge

**Jenkins 관련**

- Jenkins Basic
    - open source: [https://github.com/jenkinsci/jenkins](https://github.com/jenkinsci/jenkins)
    - Java Program (war), `java -jar jenkins.war --httpProt=8080`
    - Java 8 이상 환경에서 어디서나 실행 가능(Multiple OS Support)
    - [분산 빌드 지원](https://blog.knoldus.com/setting-up-master-slave-machines-using-jenkins/)
    - [다양한 플러그인 지원](https://plugins.jenkins.io/)
    - [커스텀 플러그인 지원](https://jenkins.io/doc/developer/tutorial/extend/)
- Jenkins Build Step (Execute Shell)
    - 사실 Java에서 `Runtime.exec` or `ProcessBuilder`와 다를바 없음
    - 즉 하나의 Execute Shell은 하나의 `Child Process`가 되어 독립적으로 수행됨

**Kubernetes 관련**

- Kubectl CLI
    - 쿠버네티스를 컨트롤 할수 있는 CLI Tool
    - `kubectl` 명령어로 Kubernetes Cluster와 상호 작용 할 수 있다.
    - `kubectl`은 실질적으로는 [Kubernetes의 API](https://kubernetes.io/ko/docs/tutorials/kubernetes-basics/deploy-app/deploy-intro/)를 사용한다.
        - [API 설명](https://kubernetes.io/ko/docs/concepts/overview/kubernetes-api/)

## problem

- jenkins의 build step에서 kubernetes의 helm등을 수행했을때, 사용자가 jenkins job을 `cancel(abort)` 한경우, jenins job은 stop되지만, `helm run은 cancel되지 않는` 문제가 있음
- 원인은 위 기본 개념에서 말했듯, 실질적으로 kubectl command가 api call이기때문에, 명령어가 kubernetes cluster에 들어가고 나서 취소 명령어가 들어오기 전까지는 계속 수행이 되고 있기 때문임

## solution

- jenkins의 cancel동작시 해당 동작을 감지하고, any action을 할 수 있게 하면 됨

**Jenkins Abort Action**

- jenkins에서 cancel을 누르면, `TERM` 시그널을 현재 Job의 process group에 발생시킨다.
- 이후 해당 job에서 수행(spawns)한 subprocess는 모두 `TERM`이 되고, "Finished: ABORTED" 메시지를 출력하면서, jenkins의 job 수행이 stop된다.

**TERM Signal Handle**

- singal은 unix계열의 운영체제에서, IPC용도 혹은, process control을 위해 만들어진 async한 event(signal)이다.
- unix계열의 운영체제에서는 이러한 signal을 핸들링 할수 있는 `C`함수(System Call API) 및 CLI command(user command)명령어을 제공한다.
- signal 핸들링 명령어중 `[trap](http://man7.org/linux/man-pages/man1/trap.1p.html)`은 시그널 발생을 감지하여, command을 실행하는게 가능한 명령어 이다.

**Jenkins에서 Abort감지해서 사용자정의 동작하게 하기**

- 위 내용들을 조합하여 아래와 같은 간략한 script을 통해서, jenkins의 abort을 감지하고, 감지이후 사용자정의 동작을 구현 할 수 있다.
- 아래코드는 jenkins의 excutable script의 한 예이다.

```bash
#!/bin/bash

# abort control #######################################################
getAbort () {
 echo "--- Caution!! Abort detected ---"
 echo "> Launch The Post Script for Jenkins Aborted after 3sec"

 for i in {1..3}
 do
   echo "."
   sleep 1
 done

 PENDING_NAME=`kubectl get build | grep some-dev- | grep Pending | awk '{print $1}'`
 if [[ -z "$PENDING_NAME" ]]; then
    echo "PENDING_NAME is Empty"
 else
    echo 'Build: '"$PENDING_NAME"' is Canceled'
    kubectl pipeline cancel $PENDING_NAME
 fi
}
trap 'getAbort; exit' SIGHUP SIGINT SIGTERM
######################################################################


# check current cluster
kubectl get pods

# This Step is real Build & Deploy
# run pipeline
# 핵심은 jenkins로 아래와 같이 kubernates의 pipeline빌드를 돌리다가.
# kubernates가 아닌 jenkins에서 stop(cancel)을 시켯을때
# kubernates도 stop시키기임, jenkins의 stop버튼은 위의 getAbort가 감지하고
# kubectl pipeliine cancel로 stop시킨다.
# 따라서 jenkins도 stop되고, 실제 kubernates pipe도 stop된다.
kubectl pipeline run --skip-approval --wait some-dev-project

# These Steps are checking the Build & Deploy
# check pipeline result
kubectl get instance
kubectl get service
kubectl get pods

# ping test
curl --insecure -v https://some-project/ping
# 특이하게도, jenkins의 Execute shell step에서 trap 명령어 하위에, 또다른 명령어 하나가 있어야 정상 동작하는 경우가 있음. 간단히 print하는걸 넣어주면됨.

```

- 위와같은 상황에서, Jenkins UI상에서 Cancel수행시 정상적으로, abort을 감지하여 `getAbort`함수가 수행되는것을 확인 할 수 있다.

## refrence

- Jenkins: [https://jenkins.io/doc/](https://jenkins.io/doc/)
- Kubernetes: [https://kubernetes.io/ko/docs](https://kubernetes.io/ko/docs)
- Jenkins Abort
    - stackoverflow: [https://stackoverflow.com/questions/32065516/detect-jenkins-build-abort-event](https://stackoverflow.com/questions/32065516/detect-jenkins-build-abort-event)
    - when you cancel a jenkins job: [https://gist.github.com/datagrok/dfe9604cb907523f4a2f](https://gist.github.com/datagrok/dfe9604cb907523f4a2f)
- signal: [https://en.wikipedia.org/wiki/Signal_(IPC)](https://en.wikipedia.org/wiki/Signal_(IPC))
- signal api: [http://man7.org/linux/man-pages/man2/signal.2.html](http://man7.org/linux/man-pages/man2/signal.2.html)
- signal man 2 and 7: [https://stackoverflow.com/questions/25828288/what-is-the-difference-between-signal7-and-signal2](https://stackoverflow.com/questions/25828288/what-is-the-difference-between-signal7-and-signal2)
- linux trap: [https://www.joinc.co.kr/w/Site/Tip/Signal_trap](https://www.joinc.co.kr/w/Site/Tip/Signal_trap)
- linux trap man: [http://man7.org/linux/man-pages/man1/trap.1p.html](http://man7.org/linux/man-pages/man1/trap.1p.html)