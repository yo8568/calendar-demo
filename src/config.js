require('dotenv').config()

module.exports = {
  client_url: process.env.REACT_APP_CLIENT_URL,
  client_port: process.env.REACT_APP_CLIENT_PORT,
  server_url: process.env.REACT_APP_SERVER_URL,
  server_port: process.env.REACT_APP_SERVER_PORT
}