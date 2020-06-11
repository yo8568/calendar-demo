Calender Demo
----
A calendar demo

### Project Structure

```
. .env.example             # environment configuration
├── src                    # source code
├── public                 # static resource files
└── package.json           # project description package
```

### Installation

***Set up environment***

```bash
  $ mv .env.example .env
```


#### Frontend Side

***Install dependencies***

```bash
  $ yarn install
```

***Run client on development***

```bash
  $ yarn dev:client
```

***Run server on development***

```bash
  $ yarn dev:server
```

***Build static files***

```bash
  $ npm run build
```

***Run on production***

```bash
  $ npm run prod:client
  $ npm run prod:server
```

#### Using Docker

```bash
  $ docker-compose up -d
```