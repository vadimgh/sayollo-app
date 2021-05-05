## Features
The app allows basic authentication, fetching user transactions,
canceling transaction (canseletion request will be written to local file on backend)

instructions to start api:

1. `npm install`
2. `node server.js`

instructions to start angular app:

1. `npm install`
2. `ng serve`

# API
Backend part created using node js and express. No typescript on backend part, the backend
serves several puproses:
- authorisation (and after a user is authorizied, he can see user's transactions on the client side)
- fetching transactions
- canseling transaction

Structure:
- controller folder contains backend controllers
- util folder - for external api requests
- storage contains log file for writing 'cancel transaction' requests
- basic express set up is in app.js file

# Client
Client created on Angular (latest). Client part functionality:
- authorization
- showing transactions
- possibility to cancel any transaction

Structure
- components folder contains all components
- services folder - for sevices
- guards contains one guard for authorization, that used on home component

HomeComponent, LoginComponent, NotFoundPageComponent loaded by routes. If user is
not authorized he will be redirected to the login page. After authorization,
UserService has private member _userSubject (which stores data about current user)

API part can build using docker-compose. For that in root directory type:

1. `docker-compose up`
