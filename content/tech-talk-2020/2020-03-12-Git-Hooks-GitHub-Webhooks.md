---
title: Git Hooks, GitHub Webhooks
date: 2020-03-12 23:00:00
updated: 2021-06-22 10:15:00
author: gseok
categories: tech-talk
tags: git github git-hook webhook husky
---

### 소개

git hook 의 개념과 사용법에 대하여 소개합니다.

### Git Hook

Git도 다른 버전 관리 시스템처럼 어떤 이벤트가 생겼을 때 자동으로 특정 스크립트를 실행하도록 할 수 있습니다. Git 에서는 이를 hook 으로 제공하고 있습니다. 내부적으로 client hook과 server hook으로 구분됩니다.

**git hook 설치 및 사용**

git hook의 설치 위치는 기본적으로`.git/hooks` 입니다. 이 디렉토리에 가보면 Git이 자동으로 넣어준 매우 유용한 스크립트 sample이 몇 개 있습니다. 그리고 스크립트가 입력받는 값이 어떤 값인지 파일 안에 자세히 설명되어 있습니다.

```bash
#!/bin/sh
#
# An example hook script to verify what is about to be committed.
# Called by "git commit" with no arguments.  The hook should
# exit with non-zero status after issuing an appropriate message if
# it wants to stop the commit.
#
# To enable this hook, rename this file to "pre-commit".

if git rev-parse --verify HEAD >/dev/null 2>&1
then
        against=HEAD
else
        # Initial commit: diff against an empty tree object
        against=$(git hash-object -t tree /dev/null)
fi

# If you want to allow non-ASCII filenames set this variable to true.
allownonascii=$(git config --bool hooks.allownonascii)

# Redirect output to stderr.
exec 1>&2

# Cross platform projects tend to avoid non-ASCII filenames; prevent
# them from being added to the repository. We exploit the fact that the
# printable range starts at the space character and ends with tilde.
if [ "$allownonascii" != "true" ] &&
        # Note that the use of brackets around a tr range is ok here, (it's
        # even required, for portability to Solaris 10's /usr/bin/tr), since
        # the square bracket bytes happen to fall in the designated range.
        test $(git diff --cached --name-only --diff-filter=A -z $against |
          LC_ALL=C tr -d '[ -~]\0' | wc -c) != 0
then
        cat <<\EOF
Error: Attempt to add a non-ASCII file name.

This can cause problems if you want to work with people on other platforms.

To be portable it is advisable to rename the file.

If you know what you are doing you can disable this check using:

  git config hooks.allownonascii true
EOF
        exit 1
fi

# If there are whitespace errors, print the offending file names and fail.
exec git diff-index --check --cached $against --
```

기본적으로 모든 예제는 Shell 또는 Perl 스크립트로 작성돼 있지만 실행할 수만 있으면 되고 node, ruby, python같은 익숙한 언어로 만들어도 됩니다.

실행할 수 있는 스크립트 파일을 확장자 없이 저장소의 `.git/hooks` 디렉토리에 넣으면 훅 스크립트 활성화 됩니다.

다음에서 대표적인 hook을 몇개 살펴보겠습니다.

**pre-commit**

- 커밋할 때 가장 먼저 호출되는 훅으로 커밋 메시지를 작성하기 전에 호출 됩니다.
- 커밋할 때 꼭 확인해야 할 게 있으면 이 훅으로 확인합니다.
- 이 훅의 Exit 코드가 0이 아니면 커밋은 취소됩니다.
- git commit --no-verify 사용시 이 훅은 무시됩니다.
- lint 같은 프로그램으로 코드 스타일을 검사하거나, 라인 끝의 공백 문자를 검사하거나, 새로 추가한 코드에 주석을 달았는지 검사하는 등의 역할을 하기위한 훅 입니다.

**commit-msg**

- 커밋 메시지가 들어 있는 임시 파일의 경로를 아규먼트로 받습니다.
- 이 훅의 Exit 코드가 0이 아니면 커밋은 취소됩니다.
- 훅에서 최종적으로 커밋이 완료되기 전에 프로젝트 상태나 커밋 메시지를 검증하는데 사용합니다.
- 커밋이 완료되면 이후 post-commit 훅이 실행됩니다.

**pre-push**

- git push 명령을 실행하면 동작하는데 리모트 정보를 업데이트 하고 난 후 리모트로 데이터를 전송하기 전에 동작 합니다.
- 이 훅의 Exit 코드가 0이 아니면 push은 취소됩니다.
- 보통 Push 하기 전에 커밋이 유효한지 확인하는 용도로 사용합니다.

그외 hook에 대해서는 git 공식 문서를 참고하세요

참고: [git hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

### husky

git hook 을 직접 구축 할 필요없이, 이미 존재하는 script나 command을 연동하여 git hook의 역할을 하도록 해주는 git hook 유틸 모듈입니다.

여러 개발자가 공통의 git hook을 사용하려면, 동일하게 각 개발자 local 환경에서 .git/hooks 에 동일한 hook script을 구성하거나, global hooks디렉토리에 hook script을 구성하여야 하는 어려움이 있는데, husky을 사용시 husky가 각 개발자의 .git/hooks 에 script연동을 proxy해주기 때문에, 손쉽에 개발팀 공통의 git hook을 설정 할 수 있습니다.

참고: [husky](https://github.com/typicode/husky#readme)

**husky 설정**

```jsx
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test",
      "pre-push": "npm test",
      "...": "..."
    }
  }
}
```

git hook이 지원하는 hook 명령어를 key로 하여, 해당 hook이 동작할때 구동되어야 하는 명령어를 지정하는 형태로 설정하면 됩니다.

.huskyrc 파일을 사용하여서 husky 설정하는것도 가능합니다.



**husky가 설정된 상태에서 hook 확인**

- .git/hooks 폴더를 확인해보면, husky.sh와 [husky.local.sh](http://husky.local.sh) 파일이 있음을 알 수 있습니다.

pre-commit

```bash
#!/bin/sh
# husky
# Created by Husky v4.2.1 (https://github.com/typicode/husky#readme)

. "$(dirname "$0")/husky.sh"
```

husky.sh

```bash
debug () {
  if [ "$HUSKY_DEBUG" = "true" ] || [ "$HUSKY_DEBUG" = "1" ]; then
    echo "husky:debug $1"
  fi
}

command_exists () {
  command -v "$1" >/dev/null 2>&1
}

run_command () {
  if command_exists "$1"; then
    "$@" husky-run $hookName "$gitParams"

    exitCode="$?"
    debug "$* husky-run exited with $exitCode exit code"

    if [ $exitCode -eq 127 ]; then
      echo "Can't find Husky, skipping $hookName hook"
      echo "You can reinstall it using 'npm install husky --save-dev' or delete this hook"
    else
      exit $exitCode
    fi

  else
    echo "Can't find $1 in PATH: $PATH"
    echo "Skipping $hookName hook"
    exit 0
  fi
}

hookIsDefined () {
  grep -qs $hookName \
    package.json \
    .huskyrc \
    .huskyrc.json \
    .huskyrc.yaml \
    .huskyrc.yml \
    .huskyrc.js \
    husky.config.js
}

huskyVersion="4.2.1"
gitParams="$*"
hookName="$(basename "$0")"

debug "husky v$huskyVersion - $hookName"

# Skip if HUSKY_SKIP_HOOKS is set
if [ "$HUSKY_SKIP_HOOKS" = "true" ] || [ "$HUSKY_SKIP_HOOKS" = "1" ]; then
  debug "HUSKY_SKIP_HOOKS is set to $HUSKY_SKIP_HOOKS, skipping hook"
  exit 0
fi

# Source user var and change directory
. "$(dirname "$0")/husky.local.sh"
debug "Current working directory is $(pwd)"

# Skip fast if hookName is not defined
if ! hookIsDefined; then
  debug "$hookName config not found, skipping hook"
  exit 0
fi

# Source user ~/.huskyrc
if [ -f ~/.huskyrc ]; then
  debug "source ~/.huskyrc"
  . ~/.huskyrc
fi

# Set HUSKY_GIT_STDIN from stdin
case $hookName in
  "pre-push"|"pre-receive"|"post-receive"|"post-rewrite")
    export HUSKY_GIT_STDIN="$(cat)";;
esac

# Windows 10, Git Bash and Yarn 1 installer
if command_exists winpty && test -t 1; then
  exec < /dev/tty
fi

# Run husky-run with the package manager used to install Husky
case $packageManager in
  "npm") run_command npx --no-install;;
  "pnpm") run_command pnpx --no-install;;
  "yarn") run_command yarn run --silent;;
  "*") echo "Unknown package manager: $packageManager"; exit 0;;
esac
```

### GitHub Webhook

git hook와 개념적으로 비슷하지만 Event발생 주체와 실제 사용 및 event발생 시점이 차이가 있습니다.

git hook이 보통 local에서의 git command동작에 의해서 발생하는 형태이거나, git이 구축된 서버에서 발생해주는 형태라면, github webhook은 github을 사용할때, github의 동작(e.g. fork, pull request, milestone 등등)에 의해서 발생합니다.

참고: [github webhook](https://developer.github.com/webhooks/)

해당 기능을 응용하여, pull request 발생시, telegram등의 대화방에 알리기 등의 동작 구현이 가능합니다.

보통 github 자체의 setting page에 webhook발생시 호출할 url연동하게 되어 있습니다.


```toc

```
