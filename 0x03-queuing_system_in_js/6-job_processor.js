/******************************************************************************
* File Name:        notificationProcessor.js
* Author:           Jane Doe
* Date:             June 26, 2024
* Description:      This script initializes a job queue using the Kue library
*                   for Node.js. It defines a function to send notifications,
*                   which logs the phone number and message to the console.
*                   The script then processes jobs from the 'push_notification_code'
*                   queue, using the sendNotification function to handle each job.
*                   The purpose of this script is to demonstrate processing
*                   jobs from a queue with Kue.
*
* Usage:            This script is intended to be executed in a Node.js
*                   environment with Yarn as the package manager. The shebang
*                   line indicates the script should be run with 'yarn dev'.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Kue library installed
*
* Functions:        - sendNotification(phoneNumber, message): Logs the phone
*                     number and message to the console.
*
* Queue Processing: - queue.process('push_notification_code', (job, done)):
*                     Processes jobs from the 'push_notification_code' queue
*                     by calling sendNotification with job data.
*
* License:          This code is released under the MIT License.
*                   You are free to use, modify, and distribute this code
*                   provided the original author is credited.
******************************************************************************/
#!/usr/bin/yarn dev
import { createQueue } from 'kue';

const queue = createQueue();

const sendNotification = (phoneNumber, message) => {
  console.log(
    `Sending notification to ${phoneNumber},`,
    'with message:',
    message,
  );
};

queue.process('push_notification_code', (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message);
  done();
});
