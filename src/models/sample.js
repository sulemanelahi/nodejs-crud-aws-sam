const dynamoose = require('dynamoose');

dynamoose.aws.ddb.local('http://dynamo-local:8000');

module.exports = dynamoose.model('Sample', new dynamoose.Schema({ id: String, name: String, surname: String }));
