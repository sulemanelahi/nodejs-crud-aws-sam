const SampleModel = require('../models/sample');

exports.putItemHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }

  const { id, name, surname } = JSON.parse(event.body);

  const item = { id, name, surname };
  const mySample = new SampleModel(item);

  try {
    await mySample.save();
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: mySample,
  };
};
