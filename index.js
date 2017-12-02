const express = require('express');
const app = express();
const port = process.env.port || 3030;

app.get('/', (req, res) => {
  res.send('Hello World');
});

console.log(`Server running on port ${port}`);
app.listen(port);
