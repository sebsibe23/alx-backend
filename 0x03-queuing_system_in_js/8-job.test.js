/******************************************************************************
* File Name:        jobTest.js
* Author:           [Author Name]
* Date:             [Date]
* Description:      This test file contains unit tests for the createPushNotificationsJobs
*                   function using Sinon and Chai libraries. It verifies the behavior
*                   of job creation, event handling (enqueue, progress, failed, complete),
*                   and error handling when jobs are added to a Kue queue in test mode.
*
* Usage:            This test file is intended to be executed in a Node.js environment
*                   with Yarn as the package manager. It tests the functionality of
*                   createPushNotificationsJobs with mocked Kue queues and verifies
*                   expected console outputs using Sinon spies and Chai assertions.
*
* Requirements:     - Node.js installed
*                   - Yarn package manager installed
*                   - Sinon library installed
*                   - Chai library installed
*                   - Kue library installed
*
* Dependencies:     - sinon: For creating spies and mocks in tests.
*                   - chai: For assertions and expectations in tests.
*                   - kue: For job queue management in Node.js applications.
*
* Functions:        - createPushNotificationsJobs: The function under test, used
*                     to create and manage push notification jobs.
*
* Exports:          This file does not export any functions or variables.
*
* License:          This code is released under the MIT License.
******************************************************************************/
#!/usr/bin/yarn test
import sinon from 'sinon';
import { expect } from 'chai';
import { createQueue } from 'kue';
import createPushNotificationsJobs from './8-job.js';

describe('createPushNotificationsJobs', () => {
  const BIG_BROTHER = sinon.spy(console);
  const QUEUE = createQueue({ name: 'push_notification_code_test' });

  before(() => {
    QUEUE.testMode.enter(true);
  });

  after(() => {
    QUEUE.testMode.clear();
    QUEUE.testMode.exit();
  });

  afterEach(() => {
    BIG_BROTHER.log.resetHistory();
  });

  it('displays an error message if jobs is not an array', () => {
    expect(
      createPushNotificationsJobs.bind(createPushNotificationsJobs, {}, QUEUE)
    ).to.throw('Jobs is not an array');
  });

  it('adds jobs to the queue with the correct type', (done) => {
    expect(QUEUE.testMode.jobs.length).to.equal(0);
    const jobInfos = [
      {
        phoneNumber: '44556677889',
        message: 'Use the code 1982 to verify your account',
      },
      {
        phoneNumber: '98877665544',
        message: 'Use the code 1738 to verify your account',
      },
    ];
    createPushNotificationsJobs(jobInfos, QUEUE);
    expect(QUEUE.testMode.jobs.length).to.equal(2);
    expect(QUEUE.testMode.jobs[0].data).to.deep.equal(jobInfos[0]);
    expect(QUEUE.testMode.jobs[0].type).to.equal('push_notification_code_3');
    QUEUE.process('push_notification_code_3', () => {
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job created:', QUEUE.testMode.jobs[0].id)
      ).to.be.true;
      done();
    });
  });

  it('registers the progress event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('progress', () => {
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, '25% complete')
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit('progress', 25);
  });

  it('registers the failed event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('failed', () => {
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'failed:', 'Failed to send')
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit('failed', new Error('Failed to send'));
  });

  it('registers the complete event handler for a job', (done) => {
    QUEUE.testMode.jobs[0].addListener('complete', () => {
      expect(
        BIG_BROTHER.log
          .calledWith('Notification job', QUEUE.testMode.jobs[0].id, 'completed')
      ).to.be.true;
      done();
    });
    QUEUE.testMode.jobs[0].emit('complete');
  });
});
