const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient({ endpoint: 'http://dynamo-local:8000' });

const tableName = process.env.SAMPLE_TABLE;

exports.getAllItemsHandler = async (event) => {
  if (event.httpMethod !== 'GET') {
    throw new Error(`getAllItems only accept GET method, you tried: ${event.httpMethod}`);
  }

  var params = {
    TableName: tableName,
  };

  const data = await docClient.scan(params).promise();

  return {
    statusCode: 200,
    body: data.Items,
  };
};
