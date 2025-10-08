# Advanced Ecommerce Store using React, TypeScript, and Redux, and Firestore/Firebase.

This project builds on the previous project, "Advanced Ecomm Store", but focuses on use Firebase for authentication and replaced the Fakestore API with my Firestore database. Created custom hooks and mplemented Error handling with try/catch blocks.

## Key features 

-Shopping cart is remembered in session storage using Redux Persist.
-Functionality to show that items were added to or removed from the cart with a counter next to the Cart link in the navbar, updating the cart count in real time. When navbar is a hamburger, an alert pops up telling them the item was added to the cart.
-Functionality to filter categories from Firestore database.
-A details modal that also uses data from the Firestore database to show the star rating of an item and the ability to add to cart from the modal.
-Cart has functionality to increase or decrease quantity of an item, or remove it, or clear the cart entirely.
-Checkout function that adds the order to the Firestore database.
-Added the ability to view past orders by retreiving that data.
-Created a carousel from the Firestore database to disply products on the homescreen.
-Added admin features that allow the user to add, delete, or modify products.
-Styling is simple and clean, yet attractive.
-Used Bootstraps Container, Flexbox, and other Bootstrap classes to make all pages and components responsive.
-Separate components for things that are used in different places, including the Add To Cart button, Check Out button, and the Category Selector function to keep code clean and organized.

# How to run this application in VSCode:

-install all dependencies:
  -npm install 

-npm run dev
  -Click link to open in browser.
