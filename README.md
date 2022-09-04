# Amazon Clone Project
#### demo :https://amazon-clone-jb3d659rk-petersafwat11.vercel.app/
### i made the whole website from scratch using nextJS for routing and serveride rendering and built in functions and component, react hooks,componentand props, tailwindcss for styling, js functions, mongodb as mongoose for storing data, express and node js for backend, next-auth for authentications, react-hook-form for validations in the client-side. 
### the pages and the funcionalities that the website has:
* the layout component the wrapper component that have ther header which includes: search input, cart item, login button for login or ther user name if he authenticated that acts as dropdown that has the orders history, link to edit the profile page, logout button, and a dashboard if the user is the admin, and have the main to render the children component, and a simple footer and a side bar have categories of the wesite.
* the route page that renders a list of product components.
* the product page that fitches the data for specific element from the database before render the content by the the help of getStaticProps.
* cart page the renders a table of added to cart products from the contect api and their total amount and a button for checkout that leads to login page if the user is not logged in and register page if you have not register yet, after that reirected back to the shipping page. the user can change the amount of product he wanna order and can clear the cart. if added any product to the cart the react toastify package shows a toast to tell the client that the product added successfully. 
* shipping screen that have a form to store the shipping detail about the user in the context api and validate the data first. the button in the bottom of the screen leads to the the payment method. 
* payment page that have radio inputs and two buttons for next and back to store the payment method in the context api.
* place order screen that have all the data about the order and a button to take action that lead to that specific order. 
* order screen have the id of the product and the full details about it and the client can pay the amout of the order by paypal and track the order from this page.
* seacrh input you can search by name of the product, category or brand name. when you press enter or click on the search icon you redirected to the seach page that have some filters like category, price range, brands, ratings and you can sort items low to high and hiw to low. 
* i made a sign in page and login page and used next-auth cedentials for it. i made client side and serveride validations. 
* all the website is responsive.
 #### This Project Is Made By : Peter Safwat. 
