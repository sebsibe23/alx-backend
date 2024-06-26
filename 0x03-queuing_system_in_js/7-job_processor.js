/******************************************************************************
* File Name:        notificationProcessor2.js
* Author:           Jane Doe
* Date:             June 26, 2024
* Description:      This script initializes a job queue using the Kue library
*                   for Node.js. It defines a function to send push notifications
*                   to users, handling job progress and completion. The script
*                   processes jobs from the 'push_notification_code_2' queue,
*                   checking for blacklisted phone numbers and updating job
*                   progress accordingly. It demonstrates advanced job processing
*                   with Kue, including handling errors and job completion.
*
* Usage:            This script is intended to be executed in a Node.js
*                   environment with Yarn as the package manager. The shebang
*                   line indicates the script should be run with 'yarn dev'.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Kue library installed
*
* Constants:        - BLACKLISTED_NUMBERS: Array of phone numbers that are
*                     blacklisted for notifications.
*
* Functions:        - sendNotification(phoneNumber, message, job, done): Sends
*                     a push notification to a user, updating job progress
*                     and handling completion.
*
* Queue Processing: - queue.process('push_notification_code_2', 2, (job, done)):
*                     Processes jobs from the 'push_notification_code_2' queue
*                     with concurrency of 2, using sendNotification to handle
*                     each job.
*
* License:          This code is released under the MIT License.
*                   You are free to use, modify, and distribute this code
*                   provided the original author is credited.
******************************************************************************/
#!/usr/bin/yarn dev
import { createQueue, Job } from 'kue';

const BLACKLISTED_NUMBERS = ['4153518780', '4153518781'];
const queue = createQueue();

/**
 * Sends a push notification to a user.
 * @param {String} phoneNumber - The phone number to send the notification to.
 * @param {String} message - The message content of the notification.
 * @param {Job} job - The Kue job object representing the current job.
 * @param {*} done - The callback function to indicate job completion.
 */
const sendNotification = (phoneNumber, message, job, done) => {
  let total = 2, pending = 2;
  let sendInterval = setInterval(() => {
    if (total - pending <= total / 2) {
      job.progress(total - pending, total);
    }
    if (BLACKLISTED_NUMBERS.includes(phoneNumber)) {
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      clearInterval(sendInterval);
      return;
    }
    if (total === pending) {
      console.log(
        `Sending notification to ${phoneNumber},`,
        `with message: ${message}`,
      );
    }
    --pending || done();
    pending || clearInterval(sendInterval);
  }, 1000);
};

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
