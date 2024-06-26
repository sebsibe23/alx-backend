/******************************************************************************
* File Name:        redisClient.js
* Author:           Jane Doe
* Date:             June 26, 2024
* Description:      This script initializes a connection to a Redis server
*                   using the Redis client library for Node.js. It includes
*                   event handlers for connection and error events, providing
*                   feedback on the status of the connection. The script also
*                   defines functions to set and get values from the Redis
*                   server, using both callbacks and promises for asynchronous
*                   operations. The main function demonstrates setting and
*                   retrieving values from the Redis server.
*
* Usage:            This script is intended to be executed in a Node.js
*                   environment with Yarn as the package manager. The shebang
*                   line indicates the script should be run with 'yarn dev'.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Redis server running
*
* Functions:        - setNewSchool(schoolName, value): Sets a new key-value
*                     pair in the Redis server.
*                   - displaySchoolValue(schoolName): Retrieves and displays
*                     the value associated with a given key.
*                   - main(): Orchestrates setting and displaying values in
*                     the Redis server upon successful connection.
*
* License:          This code is released under the MIT License.
*                   You are free to use, modify, and distribute this code
*                   provided the original author is credited.
******************************************************************************/
#!/usr/bin/yarn dev
import { promisify } from 'util';
import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

const setNewSchool = (schoolName, value) => {
  client.SET(schoolName, value, print);
};

const displaySchoolValue = async (schoolName) => {
  console.log(await promisify(client.GET).bind(client)(schoolName));
};

async function main() {
  await displaySchoolValue('Holberton');
  setNewSchool('HolbertonSanFrancisco', '100');
  await displaySchoolValue('HolbertonSanFrancisco');
}

client.on('connect', async () => {
  console.log('Redis client connected to the server');
  await main();
});
