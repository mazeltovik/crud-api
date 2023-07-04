import server from "./server";

const port = process.env.port || 4000;

server.listen(port,()=>{
    console.log(`Single Server is running on port ${port}`)
});

