const SampleModel = require('../models/sample');

exports.getByQueryParamsHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getByQueryParams only accept GET method, you tried: ${event.httpMethod}`);
  }

  const items = await SampleModel.get(event?.queryStringParameters?.id);

  return {
    statusCode: 200,
    body: items,
  };
};
