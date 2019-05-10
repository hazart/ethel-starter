const dataCheck = require('ethel-core').server.getUtils().dataCheck;
const logger = require('ethel-core').server.getUtils().logger;
const models = require('ethel-core').server.getModels();

const User = models.user.Model;
const UserDetail = models.userDetail.Model;

const customPayloads = require('../customPayloads');

class CheckActions {
  constructor() {
    this.occupation = this.occupation.bind(this);
    this.contact = this.contact.bind(this);
  }

  occupation(dialogParams) {
    return new Promise((resolve) => {
      logger.log('DF - Getting occupation message');

      User.findOne({ where: { senderId: dialogParams.senderId } })
        .then(dataCheck.isDbResultAvailableP)
        .then(user => this._getDirectMessage(user))
        .then((message) => {
          dialogParams.directMessage = message;
          resolve(dialogParams);
        })
        .catch((err) => {
          console.error('DF - Error getting information about the user for occupation message: ', err);
          resolve(dialogParams);
        });
    });
  }

  _getDirectMessage(user) {
    return new Promise((resolve, reject) => {

      UserDetail.findAll({
        where: {
          $or: [
            { name: 'contact_profile-company' },
            { name: 'profiling_profile-company' },
            { name: 'contact_profile-job' },
            { name: 'profiling_profile-job' },
          ],
          value: {
            $not: null,
            $ne: ' ',

          },
        },
        include: [
          { model: User, where: { id: user.id } },
        ],
        order: 'created_at DESC',
      })
        .then((data) => {
          const result = [];
          // handle old cases where we have multiple occupations
          for (const item of data) {
            if (!result.includes(item.value)) {
              result[item.name] = item.value;
            }
          }

          const company = result['profiling_profile-company'] ? result['profiling_profile-company'] : result['contact_profile-company'];
          const job = result['profiling_profile-job'] ? result['profiling_profile-job'] : result['contact_profile-job'];
          const directMessage = customPayloads.getOccupationPayload(company, job);

          resolve(directMessage);

        })
        .catch((err) => {
          reject(err);
        });

    });
  }

  off(dialogParams) {
    return new Promise((resolve) => {

      let queryParams;

      if (dialogParams.apiAiResponse.queryResult.intent.displayName.includes('off-agency')) {
        queryParams = {
          content: 'HANGUP_AGENCY',
          type: 'event',
        };
      } else {
        queryParams = {
          content: 'HANGUP',
          type: 'event',
        };
      }

      dialogParams.addQueryToDo(queryParams);

      resolve(dialogParams);
    });
  }

  // action = test.test
  contact(dialogParams) {
    return new Promise((resolve) => {

      if (dialogParams.userId) {


        UserDetail.findOne({
          where: { name: 'contact_target' },
          include: [
            { model: User, where: { id: dialogParams.userId } },
          ],
        })
          .then(dataCheck.isDbResultAvailableP)
          .then(() => {
            resolve(this.occupation(dialogParams));
          })
          .catch(() => {
            const qParams = {
              content: 'CONTACT_CHECK',
              type: 'event',
            };

            dialogParams.addQueryToDo(qParams);
            resolve(dialogParams);
          });
      } else {
        resolve(dialogParams);
      }
    });
  }

  count(dialogParams) {
    return new Promise((resolve) => {
      resolve(dialogParams);
    });
  }
}

module.exports = CheckActions;
