const message = require('./message');
const speech = require('./speech');
const jobs = require('./jobs');
const occupation = require('./occupation');
const errorPayload = require('./errorPayload');

module.exports = {
  getMessagePayload: message.getData,
  getSpeechPayload: speech.getData,
  getJobsPayload: jobs.getData,
  getOccupationPayload: occupation.getData,
  getErrorPayload: errorPayload.getData,
};
