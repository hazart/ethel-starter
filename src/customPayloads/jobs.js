/**
 * getDirectMessage
 *
 * This will be dynamic in the future
 * Maybe a service that gets these jobs from an API
 */
function getData() {

  return {
    text: 'Une des opportunités suivantes vous conviendrait-elle ?',
    quick_replies: [
      {
        content_type: 'text',
        title: 'Développeur Java J2EE',
        payload: 'Je souhaite postuler pour l\'annonce suivante : Développeur Java J2EE',
      },
      {
        content_type: 'text',
        title: 'Tech Lead Mobile H/F',
        payload: 'Je souhaite postuler pour l\'annonce suivante : Tech Lead Mobile H/F',
      },
      {
        content_type: 'text',
        title: 'Responsable des tests / QA Manager',
        payload: 'Je souhaite postuler pour l\'annonce suivante : Responsable des tests / QA Manager',
      },
      {
        content_type: 'text',
        title: 'Chef de projet Webanalytics H/F',
        payload: 'Je souhaite postuler pour l\'annonce suivante : Chef de projet Webanalytics H/F',
      },
      {
        content_type: 'text',
        title: 'Chef de projet SEO confirmé H/F',
        payload: 'Je souhaite postuler pour l\'annonce suivante : Chef de projet SEO confirmé H/F',
      },
      {
        content_type: 'text',
        title: 'Devops',
        payload: 'Je souhaite postuler pour l\'annonce suivante : Devops',
      },
      {
        content_type: 'text',
        title: 'Un autre poste',
        payload: 'Une candidature spontanée pour le poste de : ',
      },
    ],
  };
}

module.exports = {
  getData,
};
