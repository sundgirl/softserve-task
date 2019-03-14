module.exports = {
  hostname: process.argv[2] || process.env.HOSTNAME || '0.0.0.0',
  port:  process.env.PORT || process.argv[3] || 3000,
};
