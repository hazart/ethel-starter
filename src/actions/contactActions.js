const customPayloads = require('../customPayloads');

class ContactActions {

  jobOffers(dialogParams) {
    return new Promise((resolve) => {

      dialogParams.directMessage = customPayloads.getJobsPayload();

      resolve(dialogParams);
    });
  }

}

module.exports = ContactActions;
