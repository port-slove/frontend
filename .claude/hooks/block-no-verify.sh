#!/usr/bin/env bash
# PreToolUse(Bash): git 훅(husky)을 우회하는 명령을 차단한다.
#   - --no-verify
#   - git commit 의 -n 단축 옵션 (-n, -an, -nm 등 공백 뒤 독립 토큰만)
#   - HUSKY=0 환경변수
cmd=$(jq -r '.tool_input.command // empty')

if printf '%s' "$cmd" | grep -Eq -- '--no-verify|HUSKY=0' ||
  printf '%s' "$cmd" | grep -Eq -- 'git[[:space:]]+commit([[:space:]].*)?[[:space:]]-[a-zA-Z]*n[a-zA-Z]*([[:space:]]|$)'; then
  echo "git 훅 우회(--no-verify, -n, HUSKY=0)는 금지입니다. 검사 실패 원인을 수정하세요." >&2
  exit 2
fi
exit 0
