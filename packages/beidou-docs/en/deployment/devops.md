DevOps
---

Since 2016，`DevOps` develop mode more and more popular in Alibaba Inc. ，and in the end of 2016，Alibaba Inc. erase the `PE` post to make sure `DevOps` work。

## What's DevOps ?

DevOps（Development-Operations combined）is a campaign, which make "Developer" and "Operator" join together. With CD(Continue Deliver) , Framework and workflow, to make the build-test-publish more faster, frequently and reliability.(reference  [wikipedia](https://zh.wikipedia.org/wiki/DevOps))

## Why do we need DevOps ?

- `DevOps` is the only way to operate your application in Alibaba Inc right now. And it's a excellent idea for developer，to know the server side background.
- `DevOps` is equal `Docker` in Alibaba Inc. Developer can config your application run-time environment with `Dockerfile` ，but without the help of `PE` to modify the workflow(the 'old' way)

## DevOps Challenge

`DevOps` actually is moving the mostly `PE`'s work to the developer-self. It is reduce the chain of develop step, but raise the ability of the developer's skill. And It also means we only care about the code logic was past, left the deploy job to `PE`, those days are gone!

In this situation, as developer, we need change our mind: run-time environment is part of the code too. Maintain the `dockerfile` is our duty now.
