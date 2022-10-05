const SampleModel = require('../models/sample');

exports.updateItemHandler = async (event) => {
  if (event.httpMethod !== 'PUT') {
    throw new Error(`putMethod only accepts PUT method, you tried: ${event.httpMethod} method.`);
  }

  const { id, name, surname } = event.body;

  try {
    await SampleModel.update({ id, name, surname });

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
