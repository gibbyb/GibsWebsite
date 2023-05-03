# Self Hosted Personal Website using Caddy, Node, and React meant to learn Modern Javascript Technology.

*hosted by [GibbyB](https://gibbyb.com)*

# Developing for this Project:

1. Clone the repository

2. Add db.js in the root directory & fill in relevant database information. Here is a template of the file with the credentials removed:

```Javascript
const mysql = require('mysql2/promise');
async function connectToDb() {
  try {
    const connection = await mysql.createConnection({
      host: '',
      user: '',
      password: '',
      database: '',
    });
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
    return null;
  }
}
module.exports = connectToDb;
```

3. Install pm2 globally in order to run index.js in the background.

```bash
sudo npm install -g pm2
```

4. Install live-server globally so that the webpage will reload upon saving the project files.

```bash
sudo npm install -g live-server
```

5. From the root directory **and** the client directory, install the necessary node_modules

```bash
npm install
```

6. You will need to edit the index.js file to point to the public folder while you develop, rather than the build folder. Simply change
this line `app.use(express.static(path.join(__dirname, 'client/build')));` to this `app.use(express.static(path.join(__dirname, 'client/public')));` 

7. Run index.js file with pm2

```bash
pm2 start index.js
```

8. Go to the client directory and start npm. You're finished!

```bash
cd client && npm start
```



# Information on Self Hosting a React/Node.js project

First make sure you have NPM, nodejs, gcc, g++, make & curl installed. `sudo apt update`  `sudo apt install curl -y`  `curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -`  `sudo apt install gcc g++ make`  `sudo apt install -y nodejs` `sudo apt-get install yarn`

It is also worth pointing out that you can install the current rather than the lts simply by replacing the string "lts" with "*current*".

You can initialize a new Node.js project with the command `npm init -y` which will create the package.json file with default values in the directory you are in.

The Caddyfile entry for any Node.js website is very simple:

```Caddy
yourdomain.com {
  reverse_proxy <node_container_ip or node_container_hostname>:<specified_port>
}
```

In order to use React with our Node.js project, we will install express in the root directory of our project using

```bash
npm install express
``` 

and after it completes, create your initial file, with a name matching the created package.json name given, ie index.js, and make it look something like this:

```Javascript
const express = require('express');
const path = require('path');
const app = express();
const port = 8081;
const connectToDb = require('./db.js');

app.use(express.static(path.join(__dirname, 'client/build'))); // Serve static files from the "public" directory

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve the index.html file on the root path
});

// Test database connection
connectToDb()
  .then((db) => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.stack);
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

```

Make sure you are using the correct port that you are using with the Node container.

Add the db.js file & add your credentials for your database:

```Javascript
const mysql = require('mysql2/promise');
async function connectToDb() {
  try {
    const connection = await mysql.createConnection({
      host: '',
      user: '',
      password: '',
      database: '',
    });
    return connection;
  } catch (err) {
    console.error('Error connecting to the database:', err.stack);
    return null;
  }
}
module.exports = connectToDb;
```

Install mysql2 with npm

```bash
npm install mysql2
```

Now lets set up the React Environment. Lets install create-react-app globally

```
npm install -g create-react-app
```

now lets create the environment

```
create-react-app client
```

Now, from your Docker Container run 

```
node index.js
```

then change directories to client and run 

```
npm run build
```

Your website should now be live
