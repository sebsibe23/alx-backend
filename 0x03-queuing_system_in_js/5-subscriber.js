/******************************************************************************
* File Name:        redisSubscriber.js
* Author:           Jane Doe
* Date:             June 26, 2024
* Description:      This script initializes a connection to a Redis server
*                   using the Redis client library for Node.js. It subscribes
*                   to the 'holberton school channel' and listens for incoming
*                   messages. When a message is received, it is printed to
*                   the console. If the received message matches the exit
*                   message ('KILL_SERVER'), the client unsubscribes and
*                   terminates the connection.
*
* Usage:            This script is intended to be executed in a Node.js
*                   environment with Yarn as the package manager. The shebang
*                   line indicates the script should be run with 'yarn dev'.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Redis server running
*
* Constants:        - EXIT_MSG: The message that triggers the client to
*                     unsubscribe and quit.
*
* License:          This code is released under the MIT License.
*                   You are free to use, modify, and distribute this code
*                   provided the original author is credited.
******************************************************************************/
#!/usr/bin/yarn dev
import { createClient } from 'redis';

const client = createClient();
const EXIT_MSG = 'KILL_SERVER';

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

client.subscribe('holberton school channel');

client.on('message', (_err, msg) => {
  console.log(msg);
  if (msg === EXIT_MSG) {
    client.unsubscribe();
    client.quit();
  }
});
