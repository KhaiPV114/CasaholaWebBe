export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    connectionString: process.env.MONGO_URL,
  },
  google: {
    id: process.env.GOOGLE_CLIENT_ID,
    sercet: process.env.GOOGLE_CLIENT_SECRET,
  },
  vpn: {
    tmnCode: process.env.VPN_TMN_CODE,
    hashSecret: process.env.VPN_HASH_SECRET,
    vnpUrl: process.env.VPN_URL,
    returnUrl: process.env.VPN_RETURN_URL,
  },
  gmail: {
    user: process.env.GMAIL_USERNAME,
    sercet: process.env.GMAIL_PASSWORD,
    host: process.env.GMAIL_HOST,
  },
  fe: {
    url: process.env.FE_BASE_URL,
  },
  payos: {
    id: process.env.PAYOS_CLIENT_ID,
    apiKey: process.env.PAYOS_API_KEY,
    checksumKey: process.env.PAYOS_CHECKSUM_KEY,
  },
});
