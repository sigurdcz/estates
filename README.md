# Project The tEstates
##### Description
The server runs on NodeJS and client on React.
The application is divided into three parts:
- client
- server
- database

The main working directory in docker is /usr/src/app.
No main middleware or generic exception catching is used.

Filling the database takes place every time the server is started because I didn't know how to do it properly.
## Technology
Node.JS │ React │ Typescript │ Docker


## API 
| url | port | description | response |
| ------ | ------ | ------ | ------ |
| /api/estate  | 3000 | Array of items | array[{id: string, name: string, image_link:string}]
| /api/internal/update           | 3000 | manual update database items | empty 204
| /           | 8080 | Main UI of application | DHTML

## Project structure 

app
├── client
│   └── src
│       ├── public
│       └── ...
├── server
│   ├── controllers
│   ├── dist
│   ├── services
│   ├── interfaces
│   └── usecases
└── database
    └── init-scripts


 

## Installation

```sh
docker-compose up
```
