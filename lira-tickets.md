connecting mickies to a database
jira ticket mick-101 [Done]
title : Initialize express application & project directory architecture
status : TO DO
priOrity : HIGH
story points : 2

Description
>> as a dev, i need to initialize a structured Node/Express project workspace so that our team can separate backend server logic, routing, views, and mock data controllers effeciently.

Technical Acceptance criteria
1. Initialize a new Node project(npm init -y)and install express and ejs as dependencies.
2. Structure the root project directory exactly 
--config
--controllers
--models
--public [--css, js]
--routes
--views
--server.js
--package.json
3. Instantiate the server inside server.js
4. Configure Express to use EJS as the view engine.
5. set up the dynamic static asset folder pointing to thr /public directory
6. spin up the server on port 3000 with a clean console showing its alive.

////////////////////////////////////////////////////////////////////////////////

jira ticket mick-102
title : Implement local json storage engine & seed data controller
status : TO DO
priOrity : HIGH
story points : 3

Description
>> as a system developer working under data bundle network constraints, i need to create a local
json file system utility that mimics database read operations so that the server can serve menu content dynamically without hitting a live cloud database.

Technical Acceptance criteria
1. create a menu.json file inside a new data/ directory or inside the models/ directory.
2. populate the json file with an array of atleast 3 menu objects from the mickies menu dataset
3. each item obj must have properties for id, name, description,price, and category
4. create controller file controllers/menuController.js
5. inside controller, write a functional js methodthat uses the Node file system module(fs) to read menu.json synchronously or async, parsing it into a clean js array

>> 

///////////////////////////////////////////////////////////////////////////

jira ticket mick-103
title : Establish menu routing and dynamically render ejs view layer
status : TO DO
priOrity : medium
story points : 2

Description
>> As a user visiting the app, i want to see the real time menu items loaded dynamically from our storage engine instead of static html code.

Technical Acceptance criteria
1. create a route file  routes/menuRoutes that catches a GET request on the root path /.
2. link this route directly to ur menucontroller method created in MICK- 102.
3. WIRE the route fileup to the master pipeline inside server.js using app.use().
4. update the controller to pass the retrieved json array directly into ur inde.ejs file using res.render('index', {menuItems: datA}).
5. update the index.ejs file to loop through the passed array using an ejs array iterator loop(menuItems.forEach(...)) to render the item templates cleanly.

////////////////////////////////////////////////////////////////////////////////////////////

jira ticket mick-104
title : Migrate localfile storage engine to official mongoose schemas
status : TO DO
priOrity : high
story points : 5

Description
>> As an engineering team praparing for cloud production deployment, we need to replace the local file json system utility with an official mongodb modelling schema layer utilizing mongoose.

Technical Acceptance criteria
1. Install mongoose and dotenv via npm.
2. Create a db connection file config/database.js executing mongoose.connect().
3. pull the connection URI string directly from a hidden enviroment variable(process.env.DB_STRING) inside a .env root configuration file.
4. Define a strict model blueprint schema inside models/menu.js mapping fields explicitly: name (string, required), description(string), price(number required), category (string required).
5. Refactor 
-- controllers/menuController.js to completely drop the fs module system and use asynchronous mongoose operations (await menu.find({})) instead

/////////////////////////////////////////////////////////////////////////////////////

jira ticket mick-105
title : Deploy MERN stack base application live to render and atlas cloud
status : TO DO
priOrity : high
story points : 3

Description
>> As a product owner, i want the application deployed live to production cloud enviroments so that stakeholders and hiring managers can interact with the dynamic server applicaton acros the web.

Technical Acceptance criteria
1. spin up afree shared tier cluster on MongoDb Atlas and whitelist access coordinates.
2. Change the production port allocation block dynamically inside server.js using process.env.PORT || 3000.
3. CONFIG a production runtime build engine script ("start" : "node server.js") directly inside package.json.
4. Push all updated source files safely to an upstream repository on gtihub(ensuring .env is fully ignored via .gitignore)
5. connect your repo to a hosting platform that supports live node web servers (such as render or railway). set up ur cloud database enviroment strings inside their dashboard panel to successfully launch live.

////////////////////////////////////////////////////////////////////////////////////////////////

jira ticket mick-106
title : Implement admin view and http post route for menu creation (create)
status : TO DO
priOrity : high
story points : 3

Description
>> as an administrator, i need a dedicated form interfce to submit new menu items into the database without touching the backend code directly.

Technical Acceptance criteria
1. create admin.ejs view featuring a styled html form capturing name, price, descriptio and category.
2. ensure form fields match the data attributes of your mongoose schema exactly.
3. configure express middleware in server.js to parse form data (app.use(express.urlencoded({extended : true})))
4. build a post route handler (/admin/add-item) that takes req.body data and executes await menu.create().
5. redirect the user back to the home page or admin view upon a successful save operation

//////////////////////////////////////////////////////////////////////////////////////////////////////

jira ticket mick-107
title : Implement administrative delete functionality via client controller (delete)
status : TO DO
priOrity : medium
story points : 2

Description
>> as an administrator, i need ato ewmove old or sold-out items from the live database menu seamlesly.

Technical Acceptance criteria
1. render a delete btn or icon next to each menu item inside the admin interface view.
2. embed the unique database id of the document into the target deletion path or layout action.
3. create a backend route handling the item ewmoval(eg post or delete hitting /admin/delete-item/:id)
4. exercute the mongoose controller action await (menu.findByIdAndDelete(req.params.id))

///////////////////////////////////////////////////////////////////////////////////////////////////

jira ticket mick-108
title : lock admin routes behind basic session authentication
status : TO DO
priOrity : high
story points : 5

Description
>> as an product owner, i need to protect administrative write/delete capabilities behind a secure login system so unauthenticated web traffic cannot alter business data.

Technical Acceptance criteria
1. create a user mongoose schema to store a clean admin username and password structure.
2. implement a pre('save) encryption hook using bcrypt to automatically hash user passwords securely before database entry.
3. intergrate express-session or token validation tracking to maintain user state.
4. build a custom middleware file middleware/auth.js that checks if a user session is active.
5. apply this authentication middleware layer to secure /admin, /admin/add-item,and /admin/delete-item/:id from unauhtorised access

project structure plannning
1. config
 >>> What goes here:
  Setup files for your application. This includes database connection files (e.g., MongoDB or MySQL setup), environment variable configurations, or third-party API keys.

controllers/ (The Brains / Logic)
>>>   What goes here:
The actual function code that does things. This is where your menuController.js lives. It handles fetching data from the models, processing it (like using fs to read the JSON file), and sending the response back.
>>>> controllers/ is the chef: This is where the cooking (logic) happens. The chef knows how to prepare the menu, but they need ingredients first.

3. models/ (Data & Schema)
>>> what goes here
The blueprint of your data. If you are using a database, this defines what a "Menu Item" or an "Order" looks like (e.g., a Kota must have a name, price, and ingredients list). Note: If you aren't using a database yet, your menu.json file could temporarily live here or in the root directory.
>>>> models/ is the pantry/fridge: This is where the ingredients (your data structure/MongoDB) live. The controller goes here to grab the data.

4. public/ (Frontend Static Assets)
>>> what goes here
 Everything the client's browser needs to download directly. This includes your frontend HTML files, CSS stylesheets, browser JavaScript files, and images of your Kotas.

 5. routes/ (The Traffic Cop)
 >>> what goes here
 Files that define the URLs (endpoints) of your app. For example, it says: "If a user goes to /api/menu, direct them to the controller function that reads the menu."
 >>>> routes/ is the waiter: They take the order (the URL request) from the customer and pass it to the kitchen. They don't cook the food; they just direct traffic.

 6. views/ (The Face of your App)
 >>> what goes here
 Your visual layout templates (like EJS, Pug, or plain HTML if you are serving pages from Node). If you are using a template engine like EJS, this is where you write HTML mixed with a tiny bit of JavaScript to dynamically list your Kotas.
>>>> views/ is the plate presentation: This is how the food is arranged visually (HTML/CSS) before the waiter brings it back to the customer.

 7. server.js (The Engine / Entry Point)
 >>> what goes here
 The main starting file for your whole app. It initializes Express, connects to your MongoDB database (using config files), registers your routes, and tells the server to start listening on a specific port (like localhost:3000).
>>>> server.js is the restaurant manager: They turn on the lights, open the doors, connect the gas (MongoDB link), and make sure all the staff members are talking to each other.



How to approach this as you code:

Instead of forcing yourself to memorize the path, focus on the "Chain of Imports". Whenever you create a new feature (like a /checkout page or an /add-kota button), just follow these three simple questions in your head:
1. The Route: Where is the URL? (Write a file in routes/).
2. The Controller: What happens when they hit that URL? (Write a function in controllers/).
3. The Model: Do I need database data for this action? (Talk to your schema in models/).

