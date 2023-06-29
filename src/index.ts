import arr from './models/userDb';
import * as http from 'http';

const server = http.createServer((req,res)=>{
  console.log(arr);
  res.end('hello');
})

server.listen(3000);
