## Methods

### Option 1: node profile

* Node profile 

```
$ node --prof bin/boot.js
```

* Load test

```
$ loadtest  http://127.0.0.1:6001 --rps 10
or
$ loadtest  http://127.0.0.1:6001 -n 1000
```

* Process profile log

```
$ node --prof-process isolate-0x103000000-v8-64570.log > profile.txt 
```

### Option 2: alinode cpu profile

* Install alinode

```
$ wget -O- https://raw.githubusercontent.com/aliyun-node/tnvm/master/install.sh | bash

```

Maybe `~/.bashrc` , `~/.profile` or `~/.zshrc`
```
$ source ~/.zshrc
```

Take alinode-v3.8.0 for example
```
$ tnvm install alinode-v3.8.0
$ tnvm use alinode-v3.8.0

```

* Start up application

```
$ node --perf-basic-prof-only-functions bin/boot.js
or
$ NODE_ENV=production node --perf-basic-prof-only-functions bin/boot.js
```

* Cpu profile

Take port 6989 for example, it will generate /tmp/cpu-profile-6989-XXX.cpuprofile after 3 minutes.

```
$ sh performance/take_cpu_profile.sh 6989
```

* Load test

```
$ loadtest  http://127.0.0.1:6001 --rps 10
or
$ loadtest  http://127.0.0.1:6001 -n 1000
```

* Analyse

Import cpu-profile-6989-XXX.cpuprofile to google chrome develop tool for analyse.


## Strategy

* Use async function