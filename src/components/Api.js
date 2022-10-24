export default class Api {
  constructor(apiSettings) {
    this.baseUrl = apiSettings.baseUrl;
    this.authorization = apiSettings.headers.authorization;
  }
}
