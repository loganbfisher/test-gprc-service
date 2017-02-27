let PROTO_PATH = './protos/test.proto';

let grpc = require('grpc');
let test_proto = grpc.load(PROTO_PATH).test;

function doSomething(call, callback) {
  callback(null, {test: 'This is a test string yo!'});
}

function main() {
  let server = new grpc.Server();
  server.addProtoService(test_proto.Test.service, {doSomething: doSomething});
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
  console.log('gRPC Server has started successfully!');
}

main();
