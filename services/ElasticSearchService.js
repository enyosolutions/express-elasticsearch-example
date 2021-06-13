const { Client } = require('@elastic/elasticsearch');
const esConfig = require('../config');

class ElasticsearchService {

  constructor() {
    this.es = new Client(esConfig.config || { node: 'http://127.0.0.1:9200' });
  }

  injectMapping(index, mapping) {
    this.es.indices.putMapping({
      index,
      body: mapping
    })
  }

  insertOrUpdate(index, rows) {
    const body = [];
    rows.forEach((row) => {
      const { id } = row;
      const indexConfig = {
        index: {
          _index: `${esConfig.indexPrefix || ''}${index}`,
          _type: '_doc',
          _id: `${id}`
        }
      };
      body.push(indexConfig);
      body.push(row);
    });
    return this.es.bulk({ body });
  }

  init() {
    return axel.models.originalEmail.em.findAll({ raw: true, nest: false, limit: 10 }).then(rows => {
      console.log('[ES] inserting %s rows for table %s', rows.length, 'original_emails')
      return this.insertOrUpdate('original_emails', rows);
    })
      .then(() => {

      })
      .catch(console.warn);
  }

  search(text, options = { index: '*' }) {
    return this.es.search(
      {
        ...options,
        body: {
          "query": {
            "query_string": {
              "query": text
            }
          },
          "size": 10,
          "from": 0,
          "sort": []
        }
      }
    )
      .then(rep => rep.body.hits)
  }

}


module.exports = new ElasticsearchService();