const express = require('express')
const moment = require('moment')
const cors = require('cors')
const config = require('./config')
const app = express()

app.use(cors())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', config.client_url);
  res.header('Access-Control-Allow-Headers', "Origin, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/api/schedule', function (req, res) {
  const start = req.query.start ? moment(req.query.start).startOf('day') : moment().startOf('week').startOf('day')
  const end = req.query.end ? moment(req.query.end).endOf('day') : moment().endOf('week').endOf('day')
  const result = {
    available: [],
    booked: []
  }

  let day = start
  while (day < end) {
    if (day.hour() >= 13 && day.hour() <= 19) {
      
      // insert available time
      if (day.hour() === 13) {
        if (day.day() === 0) {
          result.available = result.available.concat({ start: moment(day).format(), end: moment(day).add(7, 'hour').format() })
          result.booked = result.booked.concat({ start: moment(day).add(1, 'hours').format(), end: moment(day).add(4, 'hour').format() })
        }

        if (day.day() === 1) {
          result.available = result.available.concat({ start: moment(day).format(), end: moment(day).add(6, 'hour').format() })
          result.booked = result.booked.concat({ start: moment(day).add(1, 'hours').format(), end: moment(day).add(4, 'hour').format() })
        }

        if (day.day() === 2) {
          result.available = result.available.concat({ start: moment(day).subtract(1, 'hour').format(), end: moment(day).add(5, 'hour').format() })
          result.booked = result.booked.concat({ start: moment(day).add(1, 'hours').format(), end: moment(day).add(4, 'hour').format() })
        }

        if (day.day() === 3) {
          result.available = result.available.concat({ start: moment(day).subtract(2, 'hour').format(), end: moment(day).add(4, 'hour').format() })
          result.booked = result.booked.concat({ start: moment(day).add(3, 'hours').format(), end: moment(day).add(4, 'hour').format() })
        }

        if (day.day() === 4) {
          result.available = result.available.concat({ start: moment(day).subtract(3, 'hour').format(), end: moment(day).add(7, 'hour').format() })
          result.booked = result.booked.concat({ start: moment(day).subtract(3, 'hours').format(), end: moment(day).add(0, 'hour').format() })
        }

        if (day.day() === 5) {
          result.available = result.available.concat({ start: moment(day).format(), end: moment(day).add(7, 'hour').format() })
          result.booked = result.booked.concat({ start: moment(day).add(1, 'hours').format(), end: moment(day).add(2, 'hour').format() })
        }

        if (day.day() === 6) {
          result.available = result.available.concat({ start: moment(day).format(), end: moment(day).add(3, 'hour').format() })
          result.booked = result.booked.concat({ start: moment(day).format(), end: moment(day).add(1, 'hour').format() })
        }
      }
    }
    day = day.add(1, 'hour')
  }

  res.json(result)
})

app.listen(config.server_port, function () {
  console.log(`Example app listening on port ${config.server_port}!`)
})