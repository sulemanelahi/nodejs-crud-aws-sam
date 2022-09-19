const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo-local:8000' });

const tableName = process.env.SAMPLE_TABLE;

exports.updateItemHandler = async (event) => {
  if (event.httpMethod !== 'PUT') {
    throw new Error(`putMethod only accepts PUT method, you tried: ${event.httpMethod} method.`);
  }

  const { id, name, surname } = JSON.parse(event.body);

  var params = {
    TableName: tableName,
    Key: { id: id, name: name },
    UpdateExpression: 'set #surname = :surname',
    ExpressionAttributeNames: { '#surname': 'surname' },
    ExpressionAttributeValues: {
      ':surname': surname,
    },
  };

  try {
    await docClient.update(params).promise();
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
