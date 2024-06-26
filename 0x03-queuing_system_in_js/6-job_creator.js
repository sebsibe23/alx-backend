/******************************************************************************
* File Name:        notificationQueue.js
* Author:           Jane Doe
* Date:             June 26, 2024
* Description:      This script initializes a job queue using the Kue library
*                   for Node.js. It creates a queue named 'push_notification_code'
*                   and adds a job to this queue with specific data, including
*                   a phone number and message. The script includes event
*                   handlers to log messages when the job is created, completed,
*                   or failed. The purpose of this script is to demonstrate
*                   basic job queue functionality with Kue.
*
* Usage:            This script is intended to be executed in a Node.js
*                   environment with Yarn as the package manager. The shebang
*                   line indicates the script should be run with 'yarn dev'.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Kue library installed
*
* Constants:        - queue: The job queue for handling push notifications.
*
* License:          This code is released under the MIT License.
*                   You are free to use, modify, and distribute this code
*                   provided the original author is credited.
******************************************************************************/
#!/usr/bin/yarn dev
import { createQueue } from 'kue';

const queue = createQueue({ name: 'push_notification_code' });

const job = queue.create('push_notification_code', {
  phoneNumber: '07045679939',
  message: 'Account registered',
});

job
  .on('enqueue', () => {
    console.log('Notification job created:', job.id);
  })
  .on('complete', () => {
    console.log('Notification job completed');
  })
  .on('failed attempt', () => {
    console.log('Notification job failed');
  });

job.save();
