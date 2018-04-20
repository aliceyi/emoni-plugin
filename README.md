### 遵循 git flow 

### git flow feature start emoni

### git flow feature finish emoni

### git flow release start 1.0.0

#### before finish your release/hotfix branch add the tag manually

### git tag -a v0.1.2 -m "release_added"

#### if you add the tag and you have issue in message , change the message using

### git tag <tag name> <tag name> -f -m "<new message>"

### git flow release finish 1.1.5

### git flow hotfix start fix-bug

### git flow hotfix finish fix-bug



#### 搭建一个前端简易监控系统

##### 概要

前端上线并没有日志，所以有时候需页面出现不能执行的时候，要打开开发者工具调试，然而现实是，面向C端用户，出现这种情况一脸懵逼…… 前端系统也需要监控，所以忍不住造了个简易轮子（虽然市场上有很多产品）

##### 功能









