'use strict';

const express = require('express');
const PORT = 4444;
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

function initializer() {
  return new Promise((resolve, reject) => {
    connection.connect(function (err) {
      if (err) {
        reject(err);
      } else {
        resolve('Connection with database is established');
      }
    });
  });
}


initializer()
  .then(console.log)
  .then(()=> {
    app.listen(PORT, () => console.log(`It's running on ${PORT}`))
  })
  .catch(console.log)

const app = express();
app.use(express.json());
app.use(express.static('views'));

app.get('/', (req, res) => {
  res.sendFile('/views/index.html', { root: __dirname });
});

app.get('/api/items', (req, res) => {
  connection.query(`SELECT * from items;`, (err, resp) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.send(resp);
    }
  })
})

app.post('/api/items/new', (req, res) => {
  connection.query(`INSERT INTO items 
  (title,expiryDate,highestBid,highestBidderName)
   VALUES (?,?,?,"Senki sem");`,
    [req.body.title, req.body.expiryDate, req.body.highestBid],
    (err, resp) => {
      if (err) {
        res.sendStatus(500)
      } else {
        res.send({ message: 'a-ok' })
      }
    })
})

app.post('/api/items/:id/bids', (req, res) => {
  connection.query(`SELECT * from items
  WHERE id=?;`, [req.params.id], (err, resp) => {
    if (err) {
      console.log(err.message)
      res.sendStatus(500)
    } else {
      if (new Date() > resp[0].expiryDate) {
        res.send({ message: 'expired' });
      } else if (req.body.amount < resp[0].highestBid) {
        res.send({ message: 'Your bid is below the highest bid!' })
      } else if (req.body.amount > resp[0].highestBid) {
        connection.query(`UPDATE items
        SET highestBid=?,
        highestBidderName=?
        WHERE id=?;`, [req.body.amount, req.body.name, req.params.id], (err, rows) => {
          if (err) {
            console.log(err.message)
            res.sendStatus(500);
          } else {
            res.send({ message: 'Success! oh yeah' })
          }
        })
      }
    }
  })
})

app.delete('/api/items/delete', (req, res) => {
  connection.query(`DELETE from items
  WHERE id=?;`, [req.body.id], (err, resp) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send({ message: `deleted` })
    }
  })
})

// app.listen(PORT, () => {
//   console.log(`App is listening on ${PORT}`);
// });
