const { readFile, writeFile } = require('fs');
const http=require('http');
const { hostname, platform, arch, cpus,uptime ,networkInterfaces } = require('os');


const port= process.env.port || 3000;
const host= '127.0.0.1';
const server=http.createServer((req,res)=>{
    if (req.url==='/'){
        readFile('./pages/index.html',{encoding: 'utf8'},(err,data)=>{
            if (err) {console.log(err);}
            
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data);
            res.end()
        })
    }
     if(req.url==='/about'){
        readFile('./pages/about.html',{encoding: 'utf8'},(err,data)=>{
            if (err) {console.log(err);}
            
            res.writeHead(200,{'Content-Type':'text/html'})
            res.write(data);
            res.end()
        })
    }
    if(req.url==='/sys'){
        const data ={
            hostname :hostname(),
            platform: platform(),
            architecture: arch(),
            numberOfCPUS: cpus(),
            networkInterfaces : networkInterfaces(),
            uptime: uptime()
        }
        writeFile('./osinfo.json',JSON.stringify(data),(err,data)=>{
            if (err) throw err;
            
            res.writeHead(201,{'Content-Type':'text/plain'})
            res.write('Your OS info has been saved successfully!');
            res.end()
        })
    }
    readFile('./pages/404.html',(err,data)=>{
        if (err) throw err;

        res.writeHead(404, {'Content-Type':'text/html'})
        res.write(data)
        res.end()
    })
})

server.listen(port,host,()=>{
    console.log(`Connected through ${host}:${port}`);
})