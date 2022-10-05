const SampleModel = require('../models/sample');

exports.removeItemHandler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(`putMethod only accepts PUT method, you tried: ${event.httpMethod} method.`);
  }

  const { id } = JSON.parse(event.body);

  try {
    await SampleModel.delete(id);

    return {
      statusCode: 200,
      body: { message: 'SUCCESS' },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { message: 'FAILED' },
    };
  }
};
