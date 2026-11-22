@AGENTS.md

## Claude Code 전용

- `.claude/settings.json`에 프로젝트 권한과 훅이 설정되어 있습니다.
  - **PostToolUse (Write|Edit)**: 수정한 파일에 `eslint --fix` → `prettier --write`를 자동 적용합니다. 남은 ESLint 에러는 피드백으로 돌아오니 바로 고치세요. 포맷을 직접 맞추느라 시간 쓰지 않아도 됩니다.
  - **PreToolUse (Bash)**: `--no-verify`, `git commit -n`, `HUSKY=0`이 들어간 명령은 차단됩니다.
- 개인 설정(추가 권한 등)은 `.claude/settings.local.json`에 둡니다. 이 파일은 커밋하지 않습니다.
