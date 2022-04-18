// NODE/EXPRESS SERVER SETUP

const express = require('express');
const server = express();
const PORT = process.env.PORT || 5000;

server.listen(5000, () => {
  console.log(`Server rocking on http://localhost:${PORT}`);
})
