module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET','LZ4yqPbA1+dVbxjhV99T1w=='),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT','hk8z4PnS+BpoRtEoUXfh8g=='),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
