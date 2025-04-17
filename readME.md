## Requirement to run this project
node.js (framework to run node.js code)
postman (to hit the api's)
mongoDB (if have live string not needed local)
mongoDB compass (or any other DB GUI sofware to see data)
git (if not please download)

## How to Run the App
1. git clone https://github.com/rajnishfrost/purra-task.git
2. cd purra-backend-task (or go inside the folder and open terminal on root path of the project)
3. npm install 
4. find .env file in root folder and put string of local or live server e.g(MONGO_URI=mongodb+srv://devid:devid@cluster12.cjkd7x36.mongodb.net/purra-db) [mongodb+srv://devid:devid@cluster12.cjkd7x36.mongodb.net] the sqaure bracket part is url and {purra-db} culry braces the name of the DB which reflect in your mongoDB.
5. npm run dev (it will run the project).
6. if every thing working fine you see [ =>MongoDB connected!<= ]

## Hitting api's from postman
1. in this project you will get a file name "Purra Task.postman_collection.json" under config folder .
2. now open postman , on top left of postman you can see new and import above the left side panel , click on import and choose the Purra Task.postman_collection.json file and import.
3. in the folder you find 3 api's Get HS Code , Get Country Code and Tarrif Lookup.
4. when you hit Get HS Code you get product name and code , copy the code of any product.
5. now do same above thing for Get Country Code and copy code from response.
6. now open Tarrif Lookup , http://localhost:3000/hs-codes/950691/tariff?country=840 you will see a link like this here 950691 is hs code and 840 is the country code replace with the copy once. and hit the api , first hit may take time , because data coming from another api . but when you hit it second time with same url it response will be quick due to data save in our Personal DB.
7. some of value you may see null beacause we dont get in the API of the third party.

# Resourse and explaination
1. https://wits.worldbank.org/data/public/WITSAPI_UserGuide.pdf under this link you find a pdf of API's which provided by worldbank . 
2. Get HS Code and Get Country Code data i make it static in the code base due to response of the workbank api for all product and all country is in xlm form and i need data in json format , it can be converted in json but it will cost more time.


