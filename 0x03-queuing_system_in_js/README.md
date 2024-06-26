# 0x03. Queuing System in JS

## Overview

This project focuses on building a queuing system using JavaScript, with an emphasis on backend development utilizing Redis, NodeJS, ExpressJS, and Kue. The project will start on June 24, 2024, at 6:00 AM and must be completed by June 27, 2024, at 6:00 AM. A manual QA review is required upon completion.

## Resources

To successfully complete this project, it is recommended to read or watch the following resources:

- [Redis quick start](https://redis.io/topics/quickstart)
- [Redis client interface](https://redis.io/topics/client)
- [Redis client for Node JS](https://github.com/NodeRedis/node-redis)
- [Kue deprecated but still use in the industry](https://github.com/Automattic/kue)

## Learning Objectives

By the end of this project, you should be able to:

- Run a Redis server on your machine
- Execute simple operations with the Redis client
- Use a Redis client with NodeJS for basic operations
- Store hash values in Redis
- Handle asynchronous operations with Redis
- Utilize Kue as a queue system
- Build a basic Express application that interacts with a Redis server
- Build a basic Express application that interacts with both a Redis server and a queue

## Requirements

- The project must be compatible with Ubuntu 18.04, Node 12.x, and Redis 5.0.7.
- All files should end with a new line.
- A `README.md` file at the root of the project folder is mandatory.
- Code files should use the `.js` extension.

## Required Files for the Project

Ensure the following files are included in your project:

### `package.json`
<details>
<summary>Click to show/hide file contents</summary>
```
{
  "name": "queuing-system-js",
  "version": "1.0.0",
  "description": "A queuing system in JavaScript using Redis, NodeJS, ExpressJS, and Kue.",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.17.1",
    "kue": "^0.11.6",
    "redis": "^3.1.2"
  }
}
```
</details>

### `.babelrc`
<details>
<summary>Click to show/hide file contents</summary>
```
{
  "presets": ["@babel/preset-env"]
}
```
</details>

## Installation

After cloning the repository, run the following command to install the necessary dependencies:

```sh
npm install
```

## Running the Application

To start the application, use the following command:

```sh
npm start
```
