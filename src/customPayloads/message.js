/**
 *
 * @return {{ethel: {old: string}, username: string}}
 */
function getData() {
  return {
    ethel: {
      old: '18',
    },
    username: 'Loup',
    payload: {
      number: {
        text: 'Choose an number :',
        quick_replies: [
          {
            content_type: 'text',
            title: '1',
            payload: 'choosed 1',
          },
          {
            content_type: 'text',
            title: '2',
            payload: 'choosed 2',
          },
          {
            content_type: 'text',
            title: '3',
            payload: 'choosed 3',
          },
        ],
      },
    },
  };
}

module.exports = {
  getData,
};
