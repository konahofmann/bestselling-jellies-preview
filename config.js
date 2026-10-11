/*
  Shop configuration. Only this file needs editing by the shop owner.
  Leave paymentLink empty until a Stripe Payment Link exists: the button then
  shows "Ask on Instagram" instead of a broken checkout.

  Prices here are display only. The real price is the one set inside Stripe.
  The three items below are the Instagram highlights; price and link are
  intentionally empty because no price is public.
*/
window.SHOP_CONFIG = {
  currencySymbol: "£",
  instagramUrl: "https://www.instagram.com/bestselling_jellies/",
  // Optional basket mode: URL of the checkout function in /optional (empty = off).
  checkoutEndpoint: "",
  products: [
    { id: "giraffe", name: "The Giraffe", price: null, paymentLink: "" },
    { id: "smudge-monkey", name: "Smudge Monkey", price: null, paymentLink: "" },
    { id: "pancake", name: "The Pancake", price: null, paymentLink: "" }
  ]
};
