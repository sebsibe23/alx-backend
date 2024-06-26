/******************************************************************************
* File Name:        redisPublisher.js
* Author:           Sebsibe solomon
* Date:             June 26, 2024
* Description:      This script initializes a connection to a Redis server
*                   using the Redis client library for Node.js. It includes
*                   event handlers for connection and error events, providing
*                   feedback on the status of the connection. The script also
*                   defines a function to publish messages to a Redis channel
*                   after a specified delay. The main function demonstrates
*                   publishing several messages to the 'holberton school
*                   channel' at different intervals.
*
* Usage:            This script is intended to be executed in a Node.js
*                   environment with Yarn as the package manager. The shebang
*                   line indicates the script should be run with 'yarn dev'.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Redis server running
*
* Functions:        - publishMessage(message, time): Publishes a message to
*                     the 'holberton school channel' after a specified delay.
*
* License:          This code is released under the MIT License.
*                   You are free to use, modify, and distribute this code
*                   provided the original author is credited.
******************************************************************************/
#!/usr/bin/yarn dev
import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

const publishMessage = (message, time) => {
  setTimeout(() => {
    console.log(`About to send ${message}`);
    client.publish('holberton school channel', message);
  }, time);
};

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

publishMessage('Holberton Student #1 starts course', 100);
publishMessage('Holberton Student #2 starts course', 200);
publishMessage('KILL_SERVER', 300);
publishMessage('Holberton Student #3 starts course', 400);
