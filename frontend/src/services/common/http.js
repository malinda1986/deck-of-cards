import fetch from 'node-fetch';

export default request = (params) => {
    const {method = 'GET', url = '', body = {} } = params;
    const response = await fetch(url, {
        method,
        body,
        headers: {
          "Content-Type": "application/json",
        }
      });
      //@todo handle http errors properly
      if (response.status === 404) {
        throw new pRetry.AbortError(response.message);
      }
      return response.json();
};