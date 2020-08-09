export function getBasicAuthentication(authToken) {
  return `Bearer ${authToken}`;
}

export function POST(payload) {
  let data = payload.data
  let url = payload.url
  let receiver = payload.receiver
  console.log('[POST]')
  console.log('URL: ', url)
  console.log('body:')
  console.log(data)
  return fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((responseData) => {
      receiver(responseData);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function GET(payload) {
  let url = payload.url
  let authToken = getBasicAuthentication(payload.authToken)
  let receiver = payload.test

  return fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authToken
    },
    // body: obj.getBody()
  })
    .then((response) => response.json())
    .then((responseData) => {
      console.log("--------------")
      console.log(responseData)
      // receiver(responseData);
    })
    .catch((error) => {
      console.error(error);
    });
}

export function _parseJSON(response) {
  return response
    .text()
    .then((text) => (text ? JSON.parse(text) : {}))
    .catch((error) => console.log('_parseJSON ERR ', error));
}
