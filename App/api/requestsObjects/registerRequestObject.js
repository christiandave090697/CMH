import CommonRequestObject from './commonRequestObject';

class RegisterRequestObject extends CommonRequestObject{
  constructor(
    credentials
  ) {
    super();
    this.credentials = credentials;
  }

  getUrl() {
    return this.url;
  }

  getBody() {
    var data = JSON.stringify(this.credentials);
    return data;
  }
}
export default RegisterRequestObject;
