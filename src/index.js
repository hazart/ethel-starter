const ethelCore = require('ethel-core').server;

const customPayload = require('./customPayloads');

ethelCore.setConfig({
  version: '1.0',
  actionsFolder: './src/actions',
  dialogFlow: {
    projectId: process.env.DIALOGFLOW_PROJECT_ID,
    lang: process.env.DIALOGFLOW_LANG,
  },
  google: {
    active: false,
  },
  facebook: {
    verifyToken: process.env.FACEBOOK_VERIFY_TOKEN,
    pageAccessToken: process.env.FACEBOOK_PAGE_ACCESS_TOKEN,
  },
  slack: {
    botToken: process.env.SLACK_TOKEN,
    botName: process.env.SLACK_BOTNAME,
  },
  alexa: {
    checkCert: false,
    debug: false,
  },
  chatbase: {
    // apiKey: process.env.CHATBASE_API_KEY,
  },
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    notifyServiceSid: process.env.TWILIO_NOTIFY_SERVICE_SID,
    phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    voiceXML: process.env.TWILIO_VOICE_XML,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    dbName: process.env.MYSQL_DATABASE,
    dbUser: process.env.MYSQL_USER,
    dbPassword: process.env.MYSQL_PASSWORD,
  },
  payload: {
    getMessagePayload: customPayload.getMessagePayload,
    getSpeechPayload: customPayload.getSpeechPayload,
    getErrorPayload: customPayload.getErrorPayload,
  },
});

ethelCore.start(process.env.VIRTUAL_PORT);
