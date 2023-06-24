# Project The Estates
##### Description
The server runs on NodeJS and client on React.
The application is divided into three parts:
- client
- server
- database


Loading data from reality takes place when the server starts. The 500 most recent items in the English language are loaded.
Each item is retrieved only once according to its hash_id.
Thus, the number of data in the database will gradually increase.


## Technology
Node.JS │ React │ Typescript │ Docker


## API 
| url | port | description | response |
| ------ | ------ | ------ | ------ |
| /api/estate  | 3000 | Array of items | array[{id: string, name: string, image_link:string}]
| /api/internal/update           | 3000 | manual update database items | empty 204
| /           | 8080 | Main UI of application | DHTML

## Installation

```sh
docker-compose up
```
