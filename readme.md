![LinkedIn quote](https://github.com/basexhq/front-end/blob/master/linkedin-quote.jpg)

# BaseX front-end

We are rapidly developing the product and fixing annoying bugs, there are some [issues](https://github.com/basexhq/front-end/issues) still... Working on it.
Live beta version: https://beta.basex.com
More info about the flow of operations: https://wiki.basex.com

# Installation

* `git clone ...`
* install dependencies with `yarn` (npm may not work, haven't tested)
* provide environment variables in `.env` file (see `.env.example`)
* `yarn dev`

About the environment variables you should use the provided values, with the exception of `VITE_WALLETCONNECT_PROJECT_ID` and `VITE_INFURA_KEY`

Signup here: https://cloud.walletconnect.com/sign-up and here: https://app.infura.io/register (or reuse your existing keys)

# Deployment

We are using Vercel for deployment. Too keep the cost down (avoiding premium subscription), the deployment branch comes from the personal account of the developer.