const http=require("http")
const fs=require("fs")
const path=require("path")


http.createServer((req,res)=>{
      const url=req.url === "/"?"/index.html":req.url
      const filePath=path.join(__dirname,'public',url)

      const extname=path.extname(filePath)

      let contentType="text/html"
      if(extname==".css"){
        contentType="text/css"
      }

      fs.readFile(filePath,(err,data)=>{
        if(err){
            res.statusCode=500
            res.end("file not found")
            return;
        }
        res.writeHead(200,{"Content-Type":contentType})
        res.end(data,"utf-8")
      })

    
    }).listen(4000)
