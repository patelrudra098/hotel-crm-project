const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('API running...'));

const PORT = 6000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));