export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  database: {
    connectionString: process.env.MONGO_URL,
  },
  google: {
    id: process.env.GOOGLE_CLIENT_ID,
  },
  vpn: {
    tmnCode: process.env.VNP_TMN_CODE,
    hashSecret: process.env.VNP_HASH_SECRET,
    vnpUrl: process.env.VNP_URL,
    returnUrl: process.env.VNP_RETURN_URL,
  },
});
