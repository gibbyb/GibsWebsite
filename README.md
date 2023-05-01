# Self Hosted Personal Website using Caddy, Node, and React meant to learn Modern Javascript Technology.
*hosted by [GibbyB](https://gibbyb.com)*

# The information below is mostly for myself

To develop this app, you will first need to clone the repository, download your db.js file from your server, and install all the necessary modules by running the command: ```npm install``` from the directory "app" as well as from the directory "client".


Install pm2 with the command ```npm install pm2 -g``` if necessary.
After this, the project should be good to start up by using  ```pm2 start index.js``` and ```pm2 start db.js``` for both the index.js file (express) and another for the db.js file (mysql2). You can stop any service with ```pm2 stop index``` as well. ``pm2 list`` is also a helpful command. To ensure that PM2 automatically starts your Node.js application when the server is restarted, you can use the following command to generate a startup script: ```pm2 startup``` 

You can install live-server, an extremely helpful tool, with the command ```npm install -g live-server```

Once you know that both are up and running, it is time to start the development server. You can do this by running ```npm start``` and if you get any errors, consider running ```npm install react-scripts``` or deleting the modules and rerunning ```npm install``` then try ```npm start```

Lastly, ```npm run build``` will build all the new changes into the build directory, which can be used once you feel you are at a version of the website that is production ready. Remember to fix the express.js script following switching to build though.



# Self Hosting Stuff

Keep in mind that it is possible that some of these commands are ran from the docker container and are not specified. I did my best to note it if they are, but I may have missed a few. The docker container is so locked down that trying the commands you are unsure about in the container first should give you a pretty good indication on if they are ran from the container or not.

First make sure you have NPM, nodejs, gcc, g++, make & curl installed. ```sudo apt update```  ```sudo apt install curl -y```  ```curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -```  ```sudo apt install gcc g++ make```  ```sudo apt install -y nodejs``` ```sudo apt-get install yarn```

It is also worth pointing out that you can install the current rather than the lts simply by replacing the string "*lts*" with "*current*".

You can initialize a new Node.js project with the command ```npm init -y``` which will create the package.json file with default values.

The Caddyfile entry for any Node.js website is very simply:

```Caddy
yourdomain.com {
  reverse_proxy <node_container_ip>:<specified_port>
}
```

In order to use React with our Node.js project, we will install ```npm install express``` and after it completes, create your initial file, with a name matching the created package.json name given, ie index.js, and make it look something like this:

```Javascript
const express = require('express');
const path = require('path');
const app = express();
const port = 8081;
app.use(express.static(path.join(__dirname, 'client/public'))); // Serve static files from the "public" directory
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html'); // Serve the index.html file on the root path
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
```

but with the correct information of course. Now you can run this with the command ```node index.js``` from the Docker Container. Following that, run the command ```npm install -g create-react-app``` from the host this time, if necessary, as if you have already installed this globally, theres no reason to run it again. After that we will create our react app with the command ```create-react-app client``` from the app directory.

Install pm2 with the command ```npm install pm2 -g```. You can use this to start index.js instead of Node and that way it always runs in the background with the command ```pm2 start index.js``` and later on, ```pm2 start db.js```. You can stop any service with ```pm2 stop index```

To ensure that PM2 automatically starts your Node.js application when the server is restarted, you can use the following command to generate a startup script: ```pm2 startup```

You may need to change the permissions of some of the folders for things like SSHing. You can use this command: ```sudo chown -R gib:gib /path/to/project/directory```

Now lets add a Database with Node.js. Run ```npm install mysql2``` and make a db.js file that looks a little bit like this:

```Javascript
const mysql = require('mysql');
async function connectToDb() {
    const connection = await mysql.createConnection({
    
        host: 'wwdb.gibbyb.com',
        user: 'database-user',
        password: 'database-password',
        database: 'database-name',
    });

    // Use the connection to query the database
}
connectToDb();
```
Now run it either with pm2 ```pm2 start db.js``` or with Node, depending on what works best ```node db.js```

Now youre just about all set. Start the development server with the command **npm start** or build the project with the command **npm run build**
