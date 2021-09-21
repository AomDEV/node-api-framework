# NodeJS API Framework (TypeScript)
 API Framework for NodeJS (+ExpressJS)
 
 ## Installation
 Package installation
 ```
 npm install
 ```
  
 Migrate prisma database
 ```
 npm run prisma:migrate
 ```
 
 Run in development environment
 ```
 npm run dev
 ```
 
 ## Structure
 ```src/api/v1/*``` - Routing & Bussiness logic configurations
 
 ```src/framework/database/*``` - Database model configurations
 
 ```src/framework/entity/*``` - Function logic configurations
 
 
 ## How it works
 - Express search the route.ts files in the ```src/api/v1/*``` directory
 - Register all Express router that found in these folder ```(src/api/v1/*)``` to handler
 - When request is coming, Express will send thier user's request to **sub-method** *(Bussiness Logic)*
 - Sub-Method will request all required function from **entity** *(Function Logic)* folder
 - **Entity** maybe require database access. Then import it from Database Model
 - Finally, return all result back to **sub-method** and send them to response as json format
 
 ## Database Configuration
 Edit .env file to your favorite database. And don't forget to define your database model in ```./prisma/schema.prisma``` and then you need to run ```npm run prisma:migrate``` to generate your database schema (and create database server in your server if not exist)
 
 ## API Setup Example
 Example API directory setup
 ```
 |-- src
 |  |-- api
 |  |  |-- v1
 |  |  |  |-- some-category # API Category folder
 |  |  |  |  |-- get-all # sub-method
 |  |  |  |  |  |-- get-users.ts 
 |  |  |  |  |  |-- get-transactions.ts
 |  |  |  |  |-- get-info # sub-method
 |  |  |  |  |  |-- get-user.ts
 |  |  |  |  |  |-- get-transaction.ts
 |  |  |  |  |-- route.ts # combine all sub-method into single file
 ```
 route.ts
 ```javascript
 import {makeHandler} from "@/core/express/router";
 import express from "express"
 import getUsers from "@/api/v1/some-category/get-all/get-users";
 import getTransactions from "@/api/v1/some-category/get-all/get-transactions";
 import getUser from "@/api/v1/some-category/get-info/get-user";
 import getTransaction from "@/api/v1/some-category/get-info/get-transaction";
 const router = express.Router();

 router.get('/get-users', makeHandler(getUsers));
 router.get('/get-transactions', makeHandler(getTransactions));
 router.get('/get-users/:id', makeHandler(getUser));
 router.get('/get-transactions/:id', makeHandler(getTransaction));

 export default router;
 ```
 *Finished!*
 
 ## Note
 If you want to change default **PORT**, go to ```src/app.ts``` edit line 7 from ```app.Start();``` to ```app.Start(8080);```
 
 ## TODO
 - [x] Unit Test support
 - [x] Custom Middleware feature
 - [x] Add request validator feature
 - [x] Built-in UUID
 - [x] Security feature
 - [ ] Docker
 - [ ] Redis Database
 - [ ] Performance improve
 - [x] Route path customizable
 - [x] Reflection improve
