/******************************************************************************
* File Name:        pushNotificationJobs.js
* Author:           [Author Name]
* Date:             [Date]
* Description:      This module exports a function createPushNotificationsJobs
*                   that creates push notification jobs using the Kue library
*                   for Node.js. It takes an array of job objects and a Kue
*                   queue instance as parameters. Each job is created with
*                   event listeners for enqueue, complete, failed, and progress
*                   events, logging corresponding messages to the console.
*
* Usage:            This module is intended to be used in a Node.js environment
*                   with Yarn as the package manager. It exports a function
*                   createPushNotificationsJobs(jobs, queue) that processes
*                   an array of job objects to create and manage push
*                   notification jobs in a Kue queue.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Kue library installed
*
* Functions:        - createPushNotificationsJobs(jobs, queue): Function to
*                     create and manage push notification jobs using Kue.
*
* Exports:          - createPushNotificationsJobs: Function to create push
*                     notification jobs using Kue.
*
* License:          This code is released under the MIT License.
******************************************************************************/
#!/usr/bin/yarn dev
import { Queue, Job } from 'kue';

/**
 * Creates push notification jobs from the array of jobs info.
 * @param {Job[]} jobs - An array of job objects containing notification details.
 * @param {Queue} queue - The Kue queue instance to add the jobs to.
 */
export const createPushNotificationsJobs = (jobs, queue) => {
  if (!(jobs instanceof Array)) {
    throw new Error('Jobs is not an array');
  }
  for (const jobInfo of jobs) {
    const job = queue.create('push_notification_code_3', jobInfo);

    job
      .on('enqueue', () => {
        console.log('Notification job created:', job.id);
      })
      .on('complete', () => {
        console.log('Notification job', job.id, 'completed');
      })
      .on('failed', (err) => {
        console.log('Notification job', job.id, 'failed:', err.message || err.toString());
      })
      .on('progress', (progress, _data) => {
        console.log('Notification job', job.id, `${progress}% complete`);
      });
    job.save();
  }
};

export default createPushNotificationsJobs;
