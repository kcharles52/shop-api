const http = require('http');
const app = require('./app');

const port = process.env.PORT || 4500;

const server = http.createServer(app);

const start = () => {
  try {
    server.listen(port, () => {
      const hostAddress =
        server.address().family === 'IPv6'
          ? `[${server.address().address}]`
          : `${server.address().address}`;
      console.log(`REST API on http://${hostAddress}:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

module.exports = start;
