const express = require('express');
const config = require('./config');
const ElasticsearchService = require('./services/ElasticsearchService')
const Database = require('./services/Database')
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Dat App'));
app.get('/data', (req, res) => res.send('Dat App'));

app.listen(port, () => console.log(`Dat app listening on port ${port}!`));

Database.query("SELECT * FROM request", { type: Database.QueryTypes.SELECT }).then(rows => ElasticsearchService.insertOrUpdate('requests', rows));



app.get('/requests', (req, res) => {
  Database.query("SELECT * FROM request", { type: Database.QueryTypes.SELECT })
    .then(result => res.json({ result }))
    .catch(err => res.send(err.message));
});


app.get('/search', (req, res) => {
  if (!req.query.query) {
    return res.status(404).send('missing query');
  }
  ElasticsearchService.search(req.query.query)
    .then(result => {
      res.json({ result });
    })
    .catch(err => res.send(err.message));
});


