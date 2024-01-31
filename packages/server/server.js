const express = require('express');
const app = express();


app.get('/api/health', (req, res) => {
  res.send('OK');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
