/******************************************************************************
* File Name:        app.js
* Author:           [Author Name]
* Date:             [Date]
* Description:      This Express.js application manages seat reservations
*                   using Redis and Kue for queue processing. It includes
*                   endpoints to retrieve available seats, initiate seat
*                   reservations, and monitor queue processing status.
*
* Usage:            This application is intended for Node.js environments
*                   with Yarn as the package manager. It provides REST API
*                   endpoints ('/available_seats', '/reserve_seat', '/process')
*                   to interact with seat availability and reservations.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Express.js framework installed
*                   - Kue library installed
*                   - Redis server installed and configured
*
* Functions:        - reserveSeat(number): Modifies the number of available
*                     seats in Redis.
*                   - getCurrentAvailableSeats(): Retrieves the current
*                     number of available seats from Redis.
*                   - resetAvailableSeats(initialSeatsCount): Resets the
*                     available seats count in Redis to the initial value.
*
* Exports:          - Default export: Express.js application instance configured
*                     with routes for seat availability and reservation handling.
*
* License:          This code is released under the MIT License.
******************************************************************************/
#!/usr/bin/yarn dev
import express from 'express';
import { promisify } from 'util';
import { createQueue } from 'kue';
import { createClient } from 'redis';

const app = express();
const client = createClient({ name: 'reserve_seat' });
const queue = createQueue();
const INITIAL_SEATS_COUNT = 50;
let reservationEnabled = false;
const PORT = 1245;

/**
 * Modifies the number of available seats.
 * @param {number} number - The new number of seats.
 */
const reserveSeat = async (number) => {
  return promisify(client.SET).bind(client)('available_seats', number);
};

/**
 * Retrieves the number of available seats.
 * @returns {Promise<String>}
 */
const getCurrentAvailableSeats = async () => {
  return promisify(client.GET).bind(client)('available_seats');
};

app.get('/available_seats', (_, res) => {
  getCurrentAvailableSeats()
    .then((numberOfAvailableSeats) => {
      res.json({ numberOfAvailableSeats });
    });
});

app.get('/reserve_seat', (_req, res) => {
  if (!reservationEnabled) {
    res.json({ status: 'Reservations are blocked' });
    return;
  }
  try {
    const job = queue.create('reserve_seat');

    job.on('failed', (err) => {
      console.log(
        'Seat reservation job',
        job.id,
        'failed:',
        err.message || err.toString(),
      );
    });
    job.on('complete', () => {
      console.log(
        'Seat reservation job',
        job.id,
        'completed'
      );
    });
    job.save();
    res.json({ status: 'Reservation in process' });
  } catch {
    res.json({ status: 'Reservation failed' });
  }
});

app.get('/process', (_req, res) => {
  res.json({ status: 'Queue processing' });
  queue.process('reserve_seat', (_job, done) => {
    getCurrentAvailableSeats()
      .then((result) => Number.parseInt(result || 0))
      .then((availableSeats) => {
        reservationEnabled = availableSeats <= 1 ? false : reservationEnabled;
        if (availableSeats >= 1) {
          reserveSeat(availableSeats - 1)
            .then(() => done());
        } else {
          done(new Error('Not enough seats available'));
        }
      });
  });
});

/**
 * Resets the available seats count to the initial value.
 * @param {number} initialSeatsCount - The initial count of available seats.
 * @returns {Promise} A promise resolving when seats are reset.
 */
const resetAvailableSeats = async (initialSeatsCount) => {
  return promisify(client.SET)
    .bind(client)('available_seats', Number.parseInt(initialSeatsCount));
};

app.listen(PORT, () => {
  resetAvailableSeats(process.env.INITIAL_SEATS_COUNT || INITIAL_SEATS_COUNT)
    .then(() => {
      reservationEnabled = true;
      console.log(`API available on localhost port ${PORT}`);
    });
});

export default app;
