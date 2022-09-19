const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo-local:8000' });

const tableName = process.env.SAMPLE_TABLE;

exports.removeItemHandler = async (event) => {
  if (event.httpMethod !== 'DELETE') {
    throw new Error(`putMethod only accepts PUT method, you tried: ${event.httpMethod} method.`);
  }

  const { id, name } = JSON.parse(event.body);

  var params = {
    TableName: tableName,
    Key: { id: id, name: name },
  };

  try {
    await docClient.delete(params).promise();
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
