# Group 17 *Hot Dawg* 

<!-- ![logo](admin/branding/Hot%20Dawg%20Logo.png) -->
<img src="admin/branding/Hot%20Dawg%20Logo.png" alt="drawing" width="200"/>


[![Codacy Badge](https://app.codacy.com/project/badge/Grade/22f5d544c13d4237bc3835d8c9808b91)](https://www.codacy.com/gh/cse110-fa21-group17/cse110-fa21-group17/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cse110-fa21-group17/cse110-fa21-group17&amp;utm_campaign=Badge_Grade)
[![Codacy Analysis CLI](https://github.com/cse110-fa21-group17/cse110-fa21-group17/actions/workflows/codacy-analysis.yml/badge.svg)](https://github.com/cse110-fa21-group17/cse110-fa21-group17/actions/workflows/codacy-analysis.yml)
[![jest](https://github.com/cse110-fa21-group17/cse110-fa21-group17/actions/workflows/jest.yml/badge.svg)](https://github.com/cse110-fa21-group17/cse110-fa21-group17/actions/workflows/jest.yml)
[![Eslint](https://github.com/cse110-fa21-group16/cse110-fa21-group16/actions/workflows/eslint.yml/badge.svg)](https://github.com/cse110-fa21-group16/cse110-fa21-group16/actions/workflows/eslint.yml)
[![codecov](https://codecov.io/gh/cse110-fa21-group17/cse110-fa21-group17/branch/main/graph/badge.svg?token=45SG1DU66Z)](https://codecov.io/gh/cse110-fa21-group17/cse110-fa21-group17)

<div align="center">
    <a href="http://hotstage-env.eba-fepmh2sg.us-west-1.elasticbeanstalk.com/">Hot Dawg Official Site </a>
</div>

## Introduction
**Hot Dawg** is a healthy recipe app facing the next generation 
users who want a simple, stress-free, “do-it-all” platform. Using **Hot Dawg**,
the users can not only control their meal, but also take control of their 
healthy lifestyle.

## Vision:
To create a recipe app for 
young people like us who want to experience 
great food and at the same time, be 
healthy and stay in shape.

## Tech Stack
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/githubactions-%232671E5.svg?style=for-the-badge&logo=githubactions&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![CodeCov](https://img.shields.io/badge/codecov-%23ff0077.svg?style=for-the-badge&logo=codecov&logoColor=white)
![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)

## Team members
Click [here](admin/team.md) to learn more about our team members

## Documentations:
<img src="source/readme_link/jsdoc_logo.jpg" alt="drawing" width="50"/>

See documentation on JSDoc [here](https://cse110-fa21-group17.github.io/cse110-fa21-group17/index.html)

## Onboarding
You can find onboard.md [here](admin/onboard.md)

## CI/CD:
This codebase contains 2 CI/CD phases:
### Phase 1 (CI):
Whenever a new commit/PR is merged, this phase will be ran automatically by github actions defined in `.github/workflows`. Targets include: unit test for the repo, code coverage analysis, and style (lint) checks.

All failed CI run will be rejected to merge/commit into the main branch.

### Phase 2 (CD):
Phase 2 utlizes AWS codepipeline + Elastic Beanstalk(deployment)

The AWS codepipeline contains 3 artifacts: source, build, deploy.
- Source: automatically initaited by new commits/changes in the main branch
- Build: build the entire codebase, and run tests again to verify the new code works
- deploy: deploys the newly committed code into Elastic Beanstalk (EC2 servers with auto scaling and load balancing)

The entire CI/CD pipeline is designed to have no downtime on the production server.
