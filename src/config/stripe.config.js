export const STRIPE_CONFIG = {
  publishableKey: __DEV__
    ? process.env.STRIPE_PUBLISHABLE_KEY_TEST
    : process.env.STRIPE_PUBLISHABLE_KEY_LIVE,
};
