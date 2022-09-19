const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo-local:8000' });

const tableName = process.env.SAMPLE_TABLE;

exports.getByQueryParamsHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getByQueryParams only accept GET method, you tried: ${event.httpMethod}`);
  }

  var params = {
    TableName: tableName,
    KeyConditionExpression: '#id = :id',
    ExpressionAttributeNames: {
      '#id': 'id',
    },
    ExpressionAttributeValues: {
      ':id': event.queryStringParameters.id,
    },
  };

  const { Items } = await docClient.query(params).promise();

  return {
    statusCode: 200,
    body: Items,
  };
};
