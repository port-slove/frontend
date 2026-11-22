/** @type {import("@commitlint/types").UserConfig} */
const config = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "refactor",
        "style",
        "docs",
        "test",
        "chore",
        "perf",
        "build",
        "ci",
        "revert",
      ],
    ],
    // 한글 제목을 고려해 길이 제한을 조금 넉넉하게 둡니다.
    "header-max-length": [2, "always", 100],
  },
};

export default config;
