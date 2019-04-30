const dataCheck = require('ethel-core').server.getUtils().dataCheck;

/**
 * getDirectMessage for occupation
 */
function getData(company, job) {

  let directMessage;

  if (dataCheck.isPrimitiveAvailable(company) && !dataCheck.isPrimitiveAvailable(job)) {

    directMessage = {
      text: 'Pour votre activité, je conserve les informations que vous m\'aviez fournies ?',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Oui',
          payload: `Je travaille chez ${company}`,
        },
        {
          content_type: 'text',
          title: 'Non',
          payload: 'changement',
        },
      ],
    };

  } else if (!dataCheck.isPrimitiveAvailable(company) && dataCheck.isPrimitiveAvailable(job)) {

    directMessage = {
      text: 'Pour votre activité, je conserve les informations que vous m\'aviez fournies ?',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Oui',
          payload: `Je suis ${job.value}`,
        },
        {
          content_type: 'text',
          title: 'Non',
          payload: 'changement',
        },
      ],
    };

  } else if (dataCheck.isPrimitiveAvailable(company) && dataCheck.isPrimitiveAvailable(job)) {

    directMessage = {
      text: 'Pour votre activité, je conserve les informations que vous m\'aviez fournies ?',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Oui',
          payload: `Je suis ${job} chez ${company}`,
        },
        {
          content_type: 'text',
          title: 'Non',
          payload: 'changement',
        },
      ],
    };
  } else {

    directMessage = {
      text: 'Dans quelle entreprise travaillez-vous et quel est votre poste ?',
    };
  }

  return directMessage;
}

module.exports = {
  getData,
};
