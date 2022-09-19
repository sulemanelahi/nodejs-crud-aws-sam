const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo-local:8000' });

const tableName = process.env.SAMPLE_TABLE;

exports.putItemHandler = async (event) => {
  if (event.httpMethod !== 'POST') {
    throw new Error(`postMethod only accepts POST method, you tried: ${event.httpMethod} method.`);
  }

  const { id, name, surname } = JSON.parse(event.body);

  var params = {
    TableName: tableName,
    Item: { id: id, name: name, surname: surname },
  };

  try {
    await docClient.put(params).promise();
  } catch (error) {
    console.log(error);
  }

  return {
    statusCode: 200,
    body: event.body,
  };
};
