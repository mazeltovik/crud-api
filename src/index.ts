// Basic modules
import * as http from 'http';

// Custom modules

import db from './models/userDb';
import getAllUsersCntrl from './controllers/getAllUsersCntrl';
import getUserByIDCntrl from './controllers/getUserByIDCntrl';
import postNewUserCntrl from './controllers/postNewUser';
import putUpdateUserCntrl from './controllers/putUpdateUserCntrl';
import deleteUserCntrl from './controllers/deleteUserCntrl';

const server = http.createServer().listen(3000);

server.on('request',(req,res)=>{
  const baseURL =  'http' + '://' + req.headers.host + '/';
  const reqUrl = new URL(String(req.url),baseURL);
  const params = reqUrl.searchParams;
  if(reqUrl.pathname == '/api/users/' && req.method == 'GET' && !reqUrl.search){
    getAllUsersCntrl(res,db.getAll());
  } else if(reqUrl.pathname == '/api/users/' && req.method == 'GET' && params.size == 1 && params.has('id')){
      getUserByIDCntrl(res,db.getUserById(String(params.get('id'))));
  } else if(reqUrl.pathname == '/api/users/' && req.method == 'POST' && !reqUrl.search){
      let user = '';
      req.on('data',(chunk)=>{
        user += chunk.toString();
      });
      req.on('end',()=>{
        let userData = JSON.parse(user);
        postNewUserCntrl(res,db.createUser(userData)); 
      })
  } else if(reqUrl.pathname == '/api/users/' && req.method == 'PUT' && params.size == 1 && params.has('id')){
      let user = '';
      req.on('data',(chunk)=>{
        user += chunk.toString();
      });
      req.on('end',()=>{
        let userData = JSON.parse(user);
        putUpdateUserCntrl(res,db.updateUser(String(params.get('id')),userData));
      })
  } else if(reqUrl.pathname == '/api/users/' && req.method == 'DELETE' && params.size == 1 && params.has('id')){
      deleteUserCntrl(res,db.deleteUser(String(params.get('id'))));
  } else {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({data:'This endpoint is not exist'}));
      res.end(); 
  }
})


