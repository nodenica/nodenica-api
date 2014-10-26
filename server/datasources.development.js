module.exports = {
  db: {
    host: 'localhost',
    database: 'nodenica',
    username: 'postgres',
    password: 'NodeRules',
    name: 'db',
    connector: 'postgresql'
  },
  email: {
    connector: 'mail',
    transports: [{
      type: 'smtp',
      host: process.env.SENDGRID_SMTP_HOST || '',
      secure: true,
      port: 465,
      tls: {
        'rejectUnauthorized': false
      },
      auth: {
        user: process.env.SENDGRID_SMTP_USERNAME || '',
        pass: process.env.SENDGRID_SMTP_PASSWORD || ''
      }
    }]
  }
};
