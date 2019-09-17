const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4500;

const server = http.createServer(app);

const start = () => {
  try {
    server.listen(port, () => {
      console.log(`REST API on http://localhost:${port}/api`);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = start;
