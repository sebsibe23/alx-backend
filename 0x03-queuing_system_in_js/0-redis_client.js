/******************************************************************************
* File Name:        redisClient.js
* Author:           Jane Doe
* Date:             June 26, 2024
* Description:      This script initializes a connection to a Redis server
*                   using the Redis client library for Node.js. It includes
*                   event handlers for connection and error events, providing
*                   feedback on the status of the connection. The script
*                   prints messages to the console when the client connects
*                   to the Redis server or encounters an error.
*
* Usage:            This script is intended to be executed in a Node.js
*                   environment with Yarn as the package manager. The shebang
*                   line indicates the script should be run with 'yarn dev'.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Redis server running
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

client.on('connect', () => {
  console.log('Redis client connected to the server');
});
