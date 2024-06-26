/******************************************************************************
* File Name:        redisClient.js
* Author:           sebsibe solomon
* Date:             June 26, 2024
* Description:      This script initializes a connection to a Redis server
*                   using the Redis client library for Node.js. It includes
*                   event handlers for connection and error events, providing
*                   feedback on the status of the connection. The script also
*                   defines functions to update and print hash values in the
*                   Redis server. The main function demonstrates setting
*                   and retrieving hash values for different locations and
*                   their associated values.
*
* Usage:            This script is intended to be executed in a Node.js
*                   environment with Yarn as the package manager. The shebang
*                   line indicates the script should be run with 'yarn dev'.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Redis server running
*
* Functions:        - updateHash(hashName, fieldName, fieldValue): Updates
*                     a hash with a given field and value in the Redis server.
*                   - printHash(hashName): Retrieves and prints all fields
*                     and values of a hash from the Redis server.
*                   - main(): Populates a hash with predefined locations and
*                     their values, then prints the hash.
*
* License:          This code is released under the MIT License.
*                   You are free to use, modify, and distribute this code
*                   provided the original author is credited.
******************************************************************************/
#!/usr/bin/yarn dev
import { createClient, print } from 'redis';

const client = createClient();

client.on('error', (err) => {
  console.log('Redis client not connected to the server:', err.toString());
});

const updateHash = (hashName, fieldName, fieldValue) => {
  client.HSET(hashName, fieldName, fieldValue, print);
};

const printHash = (hashName) => {
  client.HGETALL(hashName, (_err, reply) => console.log(reply));
};

function main() {
  const hashObj = {
    Portland: 50,
    Seattle: 80,
    'New York': 20,
    Bogota: 20,
    Cali: 40,
    Paris: 2,
  };
  for (const [field, value] of Object.entries(hashObj)) {
    updateHash('HolbertonSchools', field, value);
  }
  printHash('HolbertonSchools');
}

client.on('connect', () => {
  console.log('Redis client connected to the server');
  main();
});
