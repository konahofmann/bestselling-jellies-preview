/*
  Shop configuration. Only this file needs editing by the shop owner.
  Leave paymentLink empty until a Stripe Payment Link exists: the button then
  shows "Order via Instagram" instead of a broken checkout.

  Prices here are display only. The real price is the one set inside Stripe.
  No price is public on the Instagram profile ("Contact us for pricing"),
  so every price below is intentionally empty.
*/
window.SHOP_CONFIG = {
  currencySymbol: "£",
  instagramUrl: "https://www.instagram.com/bestselling_jellies/",
  // Optional basket mode: URL of the checkout function in /optional (empty = off).
  checkoutEndpoint: "",
  products: [
    { id: "giraffe", name: "The Giraffe", price: null, paymentLink: "" },
    { id: "smudge-monkey", name: "Smudge Monkey", price: null, paymentLink: "" },
    { id: "pancake", name: "The Pancake", price: null, paymentLink: "" },
    { id: "yum-sum-dumplings", name: "Amuseables Yum & Sum Dumplings", price: null, paymentLink: "" },
    { id: "pink-starfish", name: "Pink starfish", price: null, paymentLink: "" },
    { id: "cat-bow", name: "Cat with pink bow", price: null, paymentLink: "" }
  ]
};
