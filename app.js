const http = require('http');

const users = []; 
const addUser = (user) => {
  users.push(`<li>${user}</li>`);
}

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (req.url === '/') {
    res.write('<html>');
    res.write('<head><title>Hello User</title></head>');
    res.write(`<body><h1>Hello User</h1><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Create User</button></form></body>`);
    res.write('</html>');
    return res.end();
  }
  if (req.url === '/users') {
    res.write('<html>');
    res.write('<head><title>Users</title></head>');
    res.write(`<body><ul>${users.join("")}</ul></body>`)
    return res.end();
  }
  if (url === '/create-user' && method === 'POST') {
    console.log("Testi");
    console.log(req.method);
    console.log(req.body);

    const body = [];
    req.on('data', chunk => {
      body.push(chunk);
    });
    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      addUser(parsedBody.split("=")[1]);
      console.log(parsedBody.split("")[1]);
    })
    res.statusCode = 302;
    res.setHeader('Location', '/users');
    return res.end();
  }
});

server.listen(3000);
