const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo-local:8000' });

const tableName = process.env.SAMPLE_TABLE;

exports.getByIdHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getMethod only accept GET method, you tried: ${event.httpMethod}`);
  }

  var params = {
    TableName: tableName,
    Key: { id: event?.pathParameters?.id, name: event?.pathParameters?.name },
  };

  const { Item } = await docClient.get(params).promise();

  return {
    statusCode: 200,
    body: Item,
  };
};
