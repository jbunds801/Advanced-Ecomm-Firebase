# Advanced Ecommerce Store using React, TypeScript, and Redux, and Tanstack.

This project focuses on Redux Toolkit and to use actions and reducers to keep state management in one place, making it resuable across components. TypeScript was also used to ensure type saftey. Bootstrap was used as much as possible to keep the styling simple and responsive yet attractive. 

## Key features 

-Shopping cart is remembered in session storage using Redux Persist.
-Functionality to show that items were added to or removed from the cart with a counter next to the Cart link in the navbar, updating the cart count in real time.
-Functionality to filter categories from API.
-A details modal that also uses data from the API to show the star rating of an item and the ability to add to cart from the modal.
-Cart has functionality to increase or decrease quantity of an item, or remove it, or clear the cart entirely.
-Cart has a simulated check out function.
-Created a carousel from the API to disply products on the homescreen.
-Styling is simple and clean, yet attractive.
-Used Bootstraps Container, Flexbox, and other Bootstrap classes to make all pages and components responsive.
-Separate components for things that are used in different places, including the Add To Cart button, Check Out button, and the Category Selector function to keep code clean and organized.
-Deployed on Netlify - https://advanced-ecomm-store-jbunds.netlify.app/

# How to run this application in VSCode:

-install all dependencies:
  -npm install react react-dom react-bootstrap bootstrap redux react-redux @reduxjs/toolkit @tanstack/react-query redux-persist react-star-ratings

-npm run dev
  -Click link to open in browser.
