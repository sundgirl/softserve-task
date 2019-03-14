module.exports = {
  hostname: process.argv[2] || process.env.HOSTNAME || '127.0.0.1',
  port: process.env.PORT || process.argv[3] || 3000,
};
