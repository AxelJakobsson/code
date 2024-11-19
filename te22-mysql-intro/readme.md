```bash
cd code
mkdir te22-mysql-intro
cd tee22-mysql-intro
npm init -y
touch server.js
npm i express
npm i nodemon -D
```

Redigera package.json:
```json
"main": "server.js",
"type": "module",
"scripts": {
    "dev": "nodemon server.js"
}