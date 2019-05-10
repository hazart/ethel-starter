const logger = require('ethel-core').server.getUtils().logger;


class SampleActions {
  // action = sample
  index(dialogParams) {
    return new Promise((resolve, reject) => {
      logger.log('execute sample');
      const parameters = dialogParams.apiAiResponse.queryResult.parametersFormatted;
      logger.log(parameters);
      dialogParams.valuesToPopulateString = { number: 7 * 6 };
      resolve(dialogParams);
    });
  }
  // action = sample.hello
  hello(dialogParams) {
    return new Promise((resolve) => {
      logger.log('execute sample.hello');
      resolve(dialogParams);
    });
  }
  // action = sample.hello.word
  hello__world(dialogParams) {
    return new Promise((resolve) => {
      logger.log('execute sample.hello.world');
      resolve(dialogParams);
    });
  }

  alexa__random(dialogParams) {
    return new Promise((resolve) => {
      const parameters = dialogParams.apiAiResponse.queryResult.parametersFormatted;
      const slots = parameters.slots;
      logger.log('Got slots', slots);

      // exemple of setting custom value in slots from action
      let customSlots = { slots: {} };
      if (slots) {
        customSlots.slots[slots] = {
          name: slots,
          value: 'my value',
        };
      }
      dialogParams = { ...dialogParams, ...customSlots };

      resolve(dialogParams);
    });
  }

  _iamprivate() {
    // this is a private function
  }
}

module.exports = SampleActions;
