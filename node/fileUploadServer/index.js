const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    handleFileUpload(req, res);
  } else {
    res.statusCode = 405;
    res.end('Method not allowed');
  }
});

function handleFileUpload(req, res) {
  const fileData = [];
  let fileSize = 0;

  req.on('data', (chunk) => {
    // Accumulate file data
    fileData.push(chunk);
    fileSize += chunk.length;
  });

  req.on('end', () => {
    // Concatenate file data
    const data = Buffer.concat(fileData);

    // Specify the path to save the file
    const filePath = path.join(__dirname, 'uploads', req.headers['filename']);

    // Save the file to disk
    fs.writeFile(filePath, data, (err) => {
      if (err) {
        console.error('Error saving file:', err);
        res.statusCode = 500;
        res.end('Error saving file');
      } else {
        console.log('File saved:', filePath);
        res.statusCode = 200;
        res.end('File uploaded successfully');
      }
    });
  });
}

const port = 3000;
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
