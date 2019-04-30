function getData(dialogParams) {

  const directMessage = { text: 'Oups!' };
  dialogParams.directMessage = directMessage;

  return dialogParams;
}

module.exports = {
  getData,
};
