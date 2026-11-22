#!/usr/bin/env bash
# PostToolUse(Edit|Write): 에이전트가 수정한 파일에 ESLint --fix 와 Prettier 를 적용한다.
# 남은 ESLint 에러는 에이전트에게 피드백(exit 2)으로 돌려준다.
set -uo pipefail

file=$(jq -r '.tool_input.file_path // .tool_response.filePath // empty')
[ -z "$file" ] || [ ! -f "$file" ] && exit 0

cd "$CLAUDE_PROJECT_DIR" || exit 0

case "$file" in
  "$CLAUDE_PROJECT_DIR"/node_modules/* | "$CLAUDE_PROJECT_DIR"/.next/*) exit 0 ;;
esac

case "$file" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs)
    if ! out=$(pnpm exec eslint --fix "$file" 2>&1); then
      pnpm exec prettier --write "$file" >/dev/null 2>&1
      echo "ESLint 에러가 남아 있습니다. 수정하세요:" >&2
      echo "$out" >&2
      exit 2
    fi
    ;;
esac

pnpm exec prettier --write --ignore-unknown "$file" >/dev/null 2>&1
exit 0
