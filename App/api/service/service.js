

  
  export function getBasicAuthentication(authToken) {
    return `Basic ${authToken}`;
  }
  
  export function Post(obj, callback) {
    const url = obj.getUrl()
    return fetch(url, {
        method: "POST", 
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: obj.getBody()
    })
    .then((response) => response.json())
    .then((responseData) => {
        // result = JSON.stringify(responseData)
        callback(responseData)
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
  
  