const SampleModel = require('../models/sample');

exports.getAllItemsHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
  }

  const items = await SampleModel.scan().exec();

  return {
    statusCode: 200,
    body: items,
  };
};
