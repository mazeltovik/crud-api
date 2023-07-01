// Basic modules
import * as http from 'http';
import url from 'node:url';
import querystring from 'node:querystring'

// Custom modules

import db from './models/userDb';
import getAllUsersCntrl from './controllers/getAllUsersCntrl';
import getUserByIDCntrl from './controllers/getUserByIDCntrl';

const server = http.createServer().listen(3000);

server.on('request',(req,res)=>{
  const baseURL =  'http' + '://' + req.headers.host + '/';
  const reqUrl = new URL(String(req.url),baseURL);
  console.log(reqUrl);
  const params = reqUrl.searchParams;
  if(reqUrl.pathname == '/api/users/' && req.method == 'GET' && !reqUrl.search){
    getAllUsersCntrl(res,db.getAll());
  } else if(reqUrl.pathname == '/api/users/' && req.method == 'GET' && params.size == 1 && params.has('id')){
    getUserByIDCntrl(res,db.getUserById(String(params.get('id'))));
  } else {
    res.end();
  }
})


