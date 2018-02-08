# Contribution Guide

If you have any comment or advice, please report your [issue](https://github.com/alibaba/beidou/issues),
or make any change as you wish and submit an [PR](https://github.com/alibaba/beidou/pulls).

## Reporting New Issues

- Please specify what kind of issue it is.
- Before you report an issue, please search for related issues. Make sure you are not going to open a duplicate issue.
- Explain your purpose clearly in tags(see **Useful Tags**), title, or content.

beidou group members will confirm the purpose of the issue, replace more accurate tags for it, identify related milestone, and assign developers working on it.
Tags can be divided into two groups, `type` and `scope`.

- type: What kind of issue, e.g. `feature`, `bug`, `documentation`, `performance`, `support`
- scope: What did you modified. Which files are modified, e.g. `core`, `plugin: xx`, `deps: xx`, `example: xx`

### Useful Tags

- `support`: the issue asks helps from developers of our group. If you need helps to locate and handle problems or have any idea to improve beidou, mark it as `support`.
- `bug`: if you find a problem which possibly could be a bug, please tag it as `bug`. Then our group members will review that issue. If it is confirmed as a bug by our group member, this issue will be tagged as `confirmed`.
  - A confirmed bug will be resolved prior.
  - If the bug has negative impact on running online application, it will be tagged as `critical`, which refers to top priority, and will be fixed ASAP!
  - A bug will be fixed from lowest necessary version, e.g. A bug needs to be fixed from 0.9.x, then this issue will be tagged as `0.9`, `0.10`, `1.0`, `1.1`, referring that the bug is required to be fixed in those versions.
- `core`: the issue is related to core egg refers that the issue is related with `egg` config.
- `plugin: xx`: the issue is related to plugins. e.g. `plugin: react` refers that the issue is related to `react` plugin.
- `deps: xx`: the issue is related to `dependencies`, e.g. `deps:react` refers that the issue is related to `react`
- `chore: documentation`: the issue is about documentation. Need to modify documentation.

## Documentation

All features must be submitted along with documentations. The documentations should satisfy several requirements.

- Documentations must clarify one or more aspects of the feature, depending on the nature of feature: what it is, why it happens and how it works.
- It's better to include a series of procedures to explain how to fix the problem. You are also encouraged to provide **simple, but self-explanatory** demo.All demos should be placed at [beidou/examples](https://github.com/alibaba/beidou/tree/master/examples) repository.
- Please provide essential urls, such as application process, terminology explanations and references.

## Submitting Code

### Pull Request Guide

If you are willing to contribute, feel free to create a new branch, finish your modification and submit a PR. beidou group will review your work and merge it to master branch.

```bash
# Create a new branch for development. The name of branch should be semantic, avoiding words like 'update' or 'tmp'. We suggest to use feature/xxx, if the modification is about to implement a new feature.
$ git checkout -b branch-name

# Run the test after you finish your modification. Add new test cases or change old ones if you feel necessary
$ npm test

# If your modification pass the tests, congratulations it's time to push your work back to us. Notice that the commit message should be written in the following format.
$ git add . # git add -u to delete files
$ git commit -m "fix(webpack): webpack env config"
$ git push origin branch-name
```

Then you can create a Pull Request at [beidou](https://github.com/alibaba/beidou/pulls)

No one can guarantee how much will be remembered about certain PR after some time. To make sure we can easily recap what happened previously, please provide the following information in your PR.

1. Need: What function you want to achieve (Generally, please point out which issue is related).
2. Updating Reason: Different with issue. Briefly describe your reason and logic about why you need to make such modification.
3. Related Testing: Briefly describe what part of testing is relevant to your modification.
4. User Tips: Notice for beidou users. You can skip this part, if the PR is not about update in API or potential compatibility problem.

### Style Guide

Prettier and eslint can help to identify styling issues that may exist in your code. Your code is required to pass the test from eslint. Run the test locally by `$ yarn run lint`.

### Commit Message Format

You are encouraged to use [angular commit-message-format](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format) to write commit message. In this way, we could have a more trackable history and an automatically generated changelog.

```xml
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

（1）type

Must be one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation-only changes
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- refactor: A code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding missing tests
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation
- deps: Updates about dependencies

（2）scope

The scope could be anything specifying place of the commit change. For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc...

（3）subject

Use succinct words to describe what did you do in the commit change.

（4）body

Feel free to add more content in the body, if you think subject is not self-explanatory enough, such as what it is the purpose or reason of you commit.

（5）footer

- **If the commit is a Breaking Change, please note it clearly in this part.**
- related issues, like `Closes #1, Closes #2, #3`
- If there is a change about an old feature or a new feature, please associate `doc` and `beidou-init`

e.g.

```
fix($compile): [BREAKING_CHANGE] couple of unit tests for IE9

Older IEs serialize html uppercased, but IE9 does not...
Would be better to expect case insensitive, unfortunately jasmine does
not allow to user regexps for throw expectations.

Closes #11

BREAKING CHANGE:

  Breaks foo.bar api, foo.baz should be used instead
```

Look at [these files](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit) for more details.

## Release

beidou uses semantic versioning in release process based on [semver].

### Branch Strategy

`master` branch is the latest stable version. `next` branch is the next stable version working in progress.

- All new features will be added into `master` or `next` branch as well as all bug-fix except security issues. In such way, we can motivate developers to update to the latest stable version.
- If any API is discarded, it should be noted with `deprecate` in current stable version. The old version of API should be compatible until the release of next stable version.
- `master` branch doesn't have publish tag. High-level framework can work with stable versions defined by semantic versioning.
- `develop` branch is labelled with `next` tag, high-level framework can use `beidou@next` to test the in-progress version.
- The LTS versions of beidou determined by Milestone. If a version is listed in Milestone, then it is a LTS version. We will patch it if there is any problem with it.

### Release Strategy

In the release of every stable version, there will be a PM who has the following responsibilities in different stages of the release.

#### Preparation

- Set up milestone. Confirm that request is related to milestone. Assign and update issues, like [1.x milestone].
- Create a `next` branch from `master` branch and tag it as `next`.

#### Before Release

- Confirm that performance test is passed and all issues in current Milestone are either closed or can be delayed to later versions.
- Open a new [Release Proposal MR], and write `History` as [node CHANGELOG]. Don't forget to correct content in documentation which is related to the releasing version. Commits can be generated automatically.

```bash
yarn run commits
```

- Nominate PM for next stable version.

#### During Release

All tags mentioned above refere to adding tags from npm in `package.json`.

```json
"publishConfig": {
  "tag": "next"
}
```

[semver]: http://semver.org/lang/zh-CN/
[Release proposal MR]: https://github.com/nodejs/node/pull/4181
[node CHANGELOG]: https://github.com/nodejs/node/blob/master/CHANGELOG.md
[1.x milestone]: https://github.com/alibaba/beidou/projects/1
[『我是如何发布一个 npm 包的』]: https://fengmk2.com/blog/2016/how-i-publish-a-npm-package
