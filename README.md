# Bot App
Connects to a messenger and track the users dialogs.
This repository is your project folder.

# :arrow_down: Prerequisites

Install [Docker](https://www.docker.com/) on your system.

* [Install instructions](https://docs.docker.com/installation/mac/) for Mac OS X
* [Install instructions](https://docs.docker.com/installation/ubuntulinux/) for Ubuntu Linux
* [Install instructions](https://docs.docker.com/installation/) for other platforms

Install [Docker Compose](http://docs.docker.com/compose/) on your system.


# :clipboard: Setup
## Dialogflow Setup
1) [Create a bot](https://dialogflow.com/) (Please use V2 api)

* Create agent
* Click on cog next to agent name
* Export / Import
  * Import from zip


2) In your bot settings (click on the cog next to the bot name),
* get the __Project ID__ value and add it to __DIALOGFLOW_PROJECT_ID__ in `.env`
* update the __language__ value of __DIALOGFLOW_LANG__ in `.env`

3) Get Dialogflow private key
  * [Follow these instructions](https://dialogflow.com/docs/reference/v2-auth-setup#getting_the_service_account_key) to get the json file
  * Copy / Paste the content of the file in `./dialogflow.json`

## Application Setup

Make a copy of `.env-pattern` and call it `.env`. Fill in with the values of your own app.

```
cp .env-pattern .env
```

**Pay special attention to database env values**


# :rocket: Launch it
Run:
```
bash run-dev.sh -l false
```
It will
* run `docker-compose down` to stop previous containers
* run `docker-compose up` with `docker-compose.yml` and `docker-compose.dev.yml` to create and start containers
* install all dependencies from the package.json locally
* Launch nodemon

Then run:
```
bash run-tunnel.sh
```
It will give you an external url to your localhost so you can use it as base path for your endpoint


# :speech_balloon: Facebook Setup
* [Create a page](https://www.facebook.com/pages/create)
* [Create an app](https://developers.facebook.com/apps)
* [Configure it](https://developers.facebook.com/docs/messenger-platform/getting-started/app-setup/)
  * Define your webhook url (step 2 of above link)
    * If you work locally, use the run-tunnel script
    * Default facebook webhook is `https://YOUR_ENDPOINT/wh/facebook-messenger`
* Define a verify token (step 2 of above link).
  * You can update it with __FACEBOOK_VERIFY_TOKEN__ in `.env`

* Get the page token (step 3 of above link) and add it to __FACEBOOK_PAGE_ACCESS_TOKEN__ in `.env`

* Go to your facebook page and add a contact button.

* Say "Start"

YOU ARE READY TO USE.

# :speech_balloon: Slack Setup
Coming soon

# :speech_balloon: Alexa Setup
Coming soon
## Alexa actions
Alexa is pretty specific.<br/>
You can still trigger action but you don't you Dialogflow anymore.<br/>
You must use the Alexa admin panel.<br/>

To trigger an action, create a new slot with this pattern:<br/>
`action_ + action name + __ + parameter name + __ + value + __ + second parameter + second value` ...
```
ex:
action_sample.hello__params__value__params2__value2
```



# :chart_with_upwards_trend: Chatbase Setup
* [Get your API KEY](https://cloud.google.com/blog/products/gcp/how-to-integrate-dialogflow-with-chatbase-for-easier-bot-analytics) (only step 1)
* Update __CHATBASE_API_KEY__ in `.env`

# :file_folder: Tree

```
.
|-- src
   |-- actions
   |-- customPayloads
   -- index.js
```

## `index.js`
This is the entry point of your app.
You can found here all the configuration
Replace values directly here or use the `.env`.

If you want to desactivate one of the connectors, simply empty some values (in `index.js` or `.env`.)
```
// remove slack exemple index.js:
// ...
slack: {
    botToken: '',
    botName: '',
  },
// ...
```

## `/actions/`
Contains all specific actions for your app.
You can override or extends all **Ethel** actions.


## `/customPayloads/`
This folder contain default response for some actions or when the app has encountered an error.

# Development
## If you want to work with Ethel locally

Checkout Ethel project then run:
```
bash run-dev.sh -l true

# -l    link option (true / false) default is false
``` 

It will link ethel folder as a local dependency

## Production

Run: 
```
bash run.sh
```

It will
* install all dependencies from the package.json locally
* run `docker-compose down` to stop previous containers
* run `docker-compose up` with `docker-compose.yml` and `docker-compose.prod.yml` to create and start containers
* expose port 3000 to the host

# Ethel Config
Each paramters are setted in the `.env` file.

| Parameter          |                    |  Details
| -------------------| ------------------ | --------------- |
| `version`          |                    | Version number, used for analytics                |
| `actionsFolder`    |                    | Path to your action folder                        |
| `useDefaultActions`|                    | Use core action                                   |
| `static`           |                    | Configuration used for express static             |
|                    | `path`             |                                                   |
|                    | `folder`           |                                                   |
| `dialogFlow`       |                    | Dialogflow configuration                          |
|                    | `projectId`        |                                                   |
|                    | `lang`             |                                                   |
| `facebook`         |                    |                                                   |
|                    | `verifyToken`      |                                                   |
|                    | `pageAccessToken`  |                                                   |
| `slack`            |                    |                                                   |
|                    | `botToken`         |                                                   |
|                    | `botName`          |                                                   |
| `alexa`            |                    |                                                   |
|                    | `checkCert`        |                                                   |
|                    | `debug`            |                                                   |
| `chatbase`         |                    | Chatbase analytis configuration                   |
|                    | `apiKey`           |                                                   |
| `twilio`           |                    | Twilio configuration                              |
|                    | `accountSid`       |                                                   |
|                    | `authToken`        |                                                   |
|                    | `notifyServiceSid` |                                                   |
|                    | `phoneNumber`      |                                                   |
|                    | `voiceXML`         |                                                   |
| `database`         |                    |                                                   |
|                    | `host`             | Database configuration                            |
|                    | `port`             |                                                   |
|                    | `dbName`           |                                                   |
|                    | `dbUser`           |                                                   |
|                    | `dbPassword`       |                                                   |
| `payload`          |                    |                                                   |
|                    | `getMessagePayload`|                                                   |
|                    | `getSpeechPayload` |                                                   |
|                    | `getErrorPayload`  | Action to do when ethel has encountered an error |



Here's a complete setup with all options:
``` js
const ethel = require('ethel-core').server;

const customPayload = require('./customPayloads');

ethel.setConfig({
  version: '1.0',
  actionsFolder: './src/actions',
  useDefaultActions: true,
  static: false,
  dialogFlow: {
    projectId: process.env.DIALOGFLOW_PROJECT_ID,
    lang: process.env.DIALOGFLOW_LANG,
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
    apiKey: process.env.CHATBASE_API_KEY,
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

ethel.start(process.env.VIRTUAL_PORT);
```

# Ethel process

- Connector receive a message
- A new `DialogParameter` is created
- A query is make to dialogflow with the content
  - The response is added in `dialogparams`
- We check if the DF response has an action
  - Execute action if available
- We prepare the message
  - (you can prevent this step if you specify a parameter `action_only` in DF)
  - transform DF response to the right connector's response (create cards for instance)
  - we replace the {{{ vars }}} (cf `DialogParams:  Populate String`)
  - we apply template for a complete response from customPayload `getMessagePayload`<br/>
  In a response text in dialogflow, you can add for instance: 
  ```{{{payload.number | dump | safe}}}```
- We send the message
- We check if you have defined direct messages and send it (cf `DialogParams: Direct Message`)
- Save intentId, previousIntentName, currentIntentName...  for the user in `dialog table`
- Save action parameters and value in for the user `user_details table`
- Apply query (cf `DialogParams: Add query to do`)
- Apply query for other (cf `DialogParams: Add query to other user(s)
`)


# Actions
One of the main feature of Ethel is managing actions.<br/>
You can directly invoke an action inside dialogflow:

__TODO: ADD SCREENSHOT__

The actions follow a naming convention so you can easily call methods through dialogflow.

## Create Actions
Let's create an action.<br/>
The first things to do is to create a `.js` file with the `Actions.js` suffix inside the `./src/actions/` folder.
```
touch src/actions/sampleActions.js
```
Now we need to create our frist method
```js
class SampleActions {
  // action = sample
  index(dialogParams) {
    return new Promise((resolve, reject) => {
      resolve(dialogParams);
    });
  }
}
module.exports = SampleActions;
```
Here the `index` method can now be used in DialogFlow with the name `sample`.
This method does nothing.
Each methods receive an object `dialogParams` wich contains useful informations and methods.

Let's add more methods to our action.
```js
class SampleActions {
  // action = sample
  index(dialogParams) {
    return new Promise((resolve, reject) => {
      resolve(dialogParams);
    });
  }
  // action = sample.hello
  hello(dialogParams) {
    return new Promise((resolve) => {
      resolve(dialogParams);
    });
  }
  // action = sample.hello.world
  hello__world(dialogParams) {
    return new Promise((resolve) => {
      resolve(dialogParams);
    });
  }

  _iamprivate() {
    // this is a private function
  }
}

module.exports = SampleActions;
```
`hello` method create an `sample.hello` action and `hello__world` method create an `sample.hello.world` action.

If you want to create a method that will not be parsed to create an Dialogflow action, you can prefix it with an underscore.


For instance you can send direct message: `(cf DialogParams)`
```js
index(dialogParams) {
    return new Promise((resolve, reject) => {
      dialogParams.directMessage = { text: 'Hello' };
      resolve(dialogParams);
    });
  }
```
The DialogFlow raw response is retruned inside `dialogParams.apiAiResponse`<br/>
We have added an attribute `parametersFormatted` inside the DF `queryResult` to format the DF parameters.<br/>
(cf dialogParams)

For instance:
```js
index(dialogParams) {
    return new Promise((resolve, reject) => {
      const parameters = dialogParams.apiAiResponse.queryResult.parametersFormatted;
      console.log(parameters); // { foo: 'bar' }
      dialogParams.directMessage = { text: 'Hello' };
      resolve(dialogParams);
    });
  }
```

In DialogFlow you can call several actions. You just had to seperate them with a comma:
Exemple: `sample,sample.hello`


## Available Core actions

### adminActions
`admin.user.event`<br/>
Trigger a DF events to one or several users<br/>
Need an `admin_event` parameter with the name of the event.<br/>
If you want to trigger this event to
- one user, you need to provide an `admin_user_name` parameter with the user name.
- all users with a specifique tag, you need to provide an `admin_user_tag` parameter with the tag
- all users from a specific plateform (eg facebook), you need to provide an `admin_user_messenger` parameter with the plateform

`admin.user.tag`<br/>
Manually define a tag to a user.<br/>
Need an `admin_tag` parameter with the tag to add.<br/>
Need an `admin_user_name` parameter with the user name.

`admin.user.untag`<br/>
Manually remove a tag to a user.<br/>
Need an `admin_tag` parameter with the tag to remove.<br/>
Need an `admin_user_name` parameter with the user name.

`admin.user.stop`<br/>
Tell the bot to stop automaticlly respond to an user, so you can respond to him manually.<br/>
Need an `admin_user_name` parameter with the user name.

`admin.user.start`<br/>
Rollback `admin.user.stop`<br/>
Need an `admin_user_name` parameter with the user name.


### contactActions
`contact.send`<br/>
Create an entry inside the target_email table.<br/>
// @TODO: in progress<br/>
(send an email ?)

### dispatchActions
`dispatch.event`<br/>
Dispatch an event<br/>
Need an `action_event` parameter with the event name.

### phoneActions
`phone`<br/>
Call a phone number (Twilio account depedency).<br/>
Need an `phone_number` parameter with the number to call.

### resetActions
`reset`<br/>
Reset DF contexts for the current user (debug purpose)

`reset.db`<br/>
Reset the details of the current user who is talking to Ethel (debug purpose)


### smsActions
`sms`<br/>
Send sms to phone number (Twilio account depedency).<br/>
Need an `phone_content` with the content of the sms.<br/>
Need an `phone_number` parameter with the number that will receive the sms.

## tagActions
`tag.remove`<br/>
Remove a tag for the current user.
Need an `remove_tag` parameter with the value of the tag to remove


## Overide Core actions
Let's say you want to overide the `dispatch.event` action.<br/>
You can replace it in with a new action in ethel-starter project:
```js
// ethel-starter/src/actions/dispatchActions.js
class Dispatch {
  event(dialogParams) {
    return new Promise((resolve, reject) => {
      console.log('This action replace the core dispatch.event')
      resolve(dialogParams);
    });
  }
}
```
You can also extends the action:<br/>
__TODO: add an exemple__
```
```



## DialogParams

Useful methods available in actions:

### Direct Message
You can add an additional message to send:<br/>
It can be simple:
```js
index(dialogParams) {
  return new Promise((resolve, reject) => {
    dialogParams.directMessage = {text: 'Hello'};
    resolve(dialogParams);
  });
}
```
Or complex:
```js
index(dialogParams) {
  return new Promise((resolve, reject) => {
    dialogParams.directMessage = {
      text: 'Hello',
      quick_replies: [
          {
            content_type: 'text',
            title: 'First choice',
            payload: 'sirst choice',
          },
          {
            content_type: 'text',
            title: 'Second choice',
            payload: 'second choice'
          },
      ],
    };  
    resolve(dialogParams);
  });
}
```
### Populate String
You can populate string from dialogflow with dynamic data.

In dialogflow with a response text like this
```js
Hello {{{number}}}
```
```js
index(dialogParams) {
  return new Promise((resolve, reject) => {
    dialogParams.valuesToPopulateString = {number: 7 * 6};
    resolve(dialogParams);
  });
}
```
It will send `Hello 42` to the user.

## Add query to do
Make an additionnal query to execute.<br/>
This query is executed at the end of the process.<br/>
For you can trigger an DF event to redirect the user to an another intent / context:

```js
index(dialogParams) {
  return new Promise((resolve, reject) => {
    const query = {
      content: 'MY_EVENT',
      type: 'event',
    };
    dialogParams.addQueryToDo(query);
    resolve(dialogParams);
  });
}
```

## Add query to other user(s)
Like `addQueryToDo`, but you can define a different user.
```js
index(dialogParams) {
  return new Promise((resolve, reject) => {
      const query = {
      senderId: '111111111',
      userId: '1',
      messengerEvent: {
        content: 'MY_EVENT',
        type: 'event',
      },
      messengerName: 'facebook'
    };
    dialogParams.addQueryToOtherUser(query);
    resolve(dialogParams);
  });
}
```


### Complete DialogParams
Here is an exemple of what returns `dialogParams`:
```js
DialogParameter {
  senderId: '',
  userId: 1,
  sessionIds: Map { '' => '' },
  messengerEvent: {
    sender: { id: '' },
    recipient: { id: '' },
    timestamp: 0,
     message: {
        mid: '',
        seq: 0,
        text: 'Text'
      },
     content: 'Text',
     type: 'text'
  },
  messengerName: 'facebook', // plateform used by the user
  apiAiResponse: { // response from dialogflow
    responseId: '',
    queryResult: {
      fulfillmentMessages: [Array],
      outputContexts: [],
      queryText: 'Start',
      speechRecognitionConfidence: 0,
      action: 'sample',
      parameters: [Object],
      allRequiredParamsPresent: true,
      fulfillmentText: 'Hi! How are you doing?',
      webhookSource: '',
      webhookPayload: null,
      intent: [Object],
      intentDetectionConfidence: 1,
      diagnosticInfo: null,
      languageCode: 'en',
      parametersFormatted: {}
    },
    webhookStatus: null
  },
  _valuesToPopulateString: {},
  formattedMessages: [],
  _directMessage: {},
  queriesToDo: [],
  remainingQueries: [],
  queriesToOtherUsers: [],
  transformDirectMessage: null
}  
```

# Modules
## Chatbase
If you have activated your chatbase account,
each messages are sended to chatbase for analytics.
You can check thos values;
- the platform
- the version of the bot
- the message
- the user id
- the intent
- the sender (user or bot)
- if the bot has handled the message or not

# Utils
## configManager
Get options from `ethelCore.setConfig`
```js
const configManager = require('ethel-core').server.getUtils().configManager;
```
## emitter
```js
const emitter = require('../index').server.getUtils().emitter;
```
## logger
Define a custom console (`console` by default)<br/>
But you can define a custom method in
```js
ethelCore.setConfig({
  ...,
  logger: console
```
```js
const logger = require('../index').server.getUtils().logger;
```


# ROADMAP
- Documentation
- tests
- async / await
- update Facebook api to 3.2

