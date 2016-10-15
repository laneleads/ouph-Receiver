# ouph analytics platform receiver

## What's ouph analytics platform?
ouph analytics platform is open source web/mobile analytics platform.
* open source
* multiply database support
* 100% data ownership
* customisable and extensible

There are 4 parts of ouph analytics platform : 
1. SDK:sends web/app data to server
2. receiver: collects data form SDK
3. etl：extract,transform form raw data and make data more readable
4. dashboard：data visualization

## How to use ouph analytics platform receiver?

### 1.download source form github
``git clone https://github.com/laneleads/ouph-Receiver.git``
### 2.upload all code in server

### 3.modify setting file.
modify ``config/development.js`` for development

create ``config/production.js`` for production environment

the file name depend ``NODE_ENV``

### 4.ouph analytics platform receiver is working on nodejs and gulp.please install them frist.

``export NODE_ENV=production`` or ``SET NODE_ENV=production`` setting production environment 

``npm install`` install dependencies

``npm run install`` or ``node install.js`` initialize queue

``npm start``


