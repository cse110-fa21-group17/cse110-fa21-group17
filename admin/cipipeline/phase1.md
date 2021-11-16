# Phase1 CI/CD pipeline

Hosted on Github Action
## Linter: super linter

Configuration file: `.github/workflows/linter.yml`
Super Linter official documentation:
https://help.github.com/en/articles/workflow-syntax-for-github-actions

### Trigger: on pull request
Version v4.8.1 \
Configuration: default
Super linter is a set of linters, for our project, it uses the default linter for all languages, relevant language -> linter pairs are listed here:
- SQL	sql-lint / sqlfluff
- XML	LibXML
- Markdown	markdownlint
- JSON	eslint-plugin-json
- JavaScript	ESLint / standard js
- HTML	HTMLHint
- GitHub Actions	actionlint
- ENV	dotenv-linter
- Dockerfile	dockerfilelint / hadolint
- AWS CloudFormation templates	cfn-lint

> note:
For debug purpose only. Note that the latest release (by 11/16/2021) of super-linter version 4.8.3 fail to operate in ubuntu-latest within github Action. Version number is manually specified to be 4.8.1 and that solves the bug. 

---

## Codacy Analysis CLI

Configuration file: `.github/workflows/codacy-analysis.yml`\
Super Linter official documentation:
https://github.com/marketplace/actions/codacy-analysis-cli

### Trigger: on push, pull request
Version 4.0.0\
Codacy is an automated code review tool that makes it easy to ensure your team is writing high-quality code

Configuration: default
Code scanning: not used

> note:
For future improvements. Currently there are redundant elements in the CI/CD pipeline. Linter and Codacy both check for style / lint on the same code and they either produce redundant style suggestions or they have contradicting styling rules which makes passing both super-linter and Codacy impossible.

---
## Jest

Configuration file: `.github/workflows/jest.yml`\
Super Linter official documentation:
https://jestjs.io/docs/getting-started

### Trigger: on push, pull request
Version: v2
Supported note versions: 12.x, 14.x, 16.x\
Configuration:\
- working dir: `./app`
- 
Workflow:
``` bash
npm ci
npm run build --if-present
npm test
```

#TODO:
Implement jest test.