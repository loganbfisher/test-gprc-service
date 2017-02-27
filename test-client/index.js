let express = require('express');
let grpc = require('grpc');
let app = express();

let PROTO_PATH = './protos/test.proto';

let test_proto = grpc.load(PROTO_PATH).test;
let client = new test_proto.Test('localhost:50051', grpc.credentials.createInsecure());

app.get('/', function (req, res) {
  return client.doSomething({what: 'tooter'}, function(err, response) {
    res.send({response: response});
  });
});

app.listen(3000, function () {
  console.log('Test REST Service listening on port 3000!');
});
