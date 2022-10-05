const SampleModel = require('../models/sample');

exports.getByIdHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }

  const item = await SampleModel.get(event?.queryStringParameters?.id);

  return {
    statusCode: 200,
    body: item,
  };
};
