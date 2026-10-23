
# Oksyo Community Feeding Program

## Start the website

You need [Node.js](https://nodejs.org/) installed. It includes `npm`, which installs the tools this project needs.

1. Open a terminal in this project folder.
2. Run `npm install`. This installs the project requirements and creates the `node_modules` folder. You only need to do this again if the dependencies are removed or changed.
3. Run `npm run dev`.
4. Open the local URL printed in the terminal, usually `http://localhost:5173/`. If that port is already being used, Vite will print a different one.

Use `npm install`, not `npm run install`.

## Set up Stripe test payments

You can browse the website without Stripe keys, but the Continue to payment button needs them to open checkout.

1. Sign in or create an account at the [Stripe Dashboard](https://dashboard.stripe.com/).
2. Switch to a **Sandbox** or turn on **Test mode** using the account or mode selector in Stripe. The exact menu can vary by Dashboard version.
3. Open **Developers → API keys** (in some Dashboard versions, this may be under **Workbench → API keys**).
4. Copy the **test publishable key** (`pk_test_...`) and **test secret key** (`sk_test_...`). Keep the secret key private. Never put it in React code, upload it to GitHub, or send it in chat. If it is exposed, delete or rotate it in Stripe.
5. In the project folder, copy `.env.example` to a new file named `.env`. In PowerShell, you can run:

   ```powershell
   Copy-Item .env.example .env
   ```

6. Open `.env` and replace the example values with your own **test** keys. Keep the API port as `4242`:

   ```dotenv
   STRIPE_SECRET_KEY=sk_test_paste_your_secret_key_here
   VITE_STRIPE_PUBLISHABLE_KEY=pk_test_paste_your_publishable_key_here
   STRIPE_PAYMENT_METHOD_CONFIGURATION=pmc_paste_your_test_configuration_id_here
   API_PORT=4242
   ```

   `STRIPE_PAYMENT_METHOD_CONFIGURATION` is optional. Set it to the `pmc_...` ID for **Other Payment Method** in the same Stripe Sandbox/test mode as your API keys. Leave it blank to use Stripe's default payment configuration.

7. Save `.env`, stop the running website with `Ctrl+C`, and run `npm run dev` again so the settings load.
8. Choose an amount on the website and click **Continue to payment**. Use Stripe's test payment details; do not use a real card while in test mode.


## If checkout does not open

- Check that `.env` is named exactly `.env`, not `.env.example` or `.env.txt`.
- Make sure the keys are test keys: `pk_test_...` and `sk_test_...`.
- Make sure `API_PORT=4242` is in `.env`, then restart `npm run dev`.
- Check the terminal for errors. The website and payment API both need to be running.
- If the terminal says a port is already in use, close the old copy of this project or use the new local URL printed by Vite.

Keep using test mode while testing. Before accepting real donations, the organization must set up and verify its live Stripe account, payouts, required business details, payment methods, and a Stripe webhook for payment updates. Monthly donations are not currently supported.
   
