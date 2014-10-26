module.exports = {
  db: {
    host: process.env.NODENICA_PG_HOST,
    database: process.env.NODENICA_PG_DATABASE,
    username: process.env.NODENICA_PG_USERNAME,
    password: process.env.NODENICA_PG_PASSWORD,
    ssl: true,
    name: 'db',
    connector: 'postgresql',
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
