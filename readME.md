# Requirement to run this project
node.js
postman
mongoDB (if have live string not needed local)

# Purra Backend Task: HS Code Import Tariff Lookup

This is a Node.js backend service that fetches real-time import tariff information based on a given Harmonized System (HS) code and destination country. The results are stored in a MongoDB database for future queries.

## How to Run the App

### 1. Clone the repository

git clone https://github.com/rajnishfrost/purra-task.git
cd purra-backend-task

npm install 

## create a .env at root of the project
MONGO_URI=your_mongodb_connection_string
PORT=5000

# to get sample hs code api
http://localhost:5000/hs-codes/sample-hs-codes

# to get sample support country api
http://localhost:5000/hs-codes/supported-countries

# real-time import tariff information
http://localhost:5000/hs-codes/090112/tariff?country=IN


