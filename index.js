// * PKGS / SETTINGS
const express = require('express');
const server = express();

// * MIDDLEWARE
server.use(express.json())

// * HOMEPAGE
server.get('/', (req, res) => {
    res.send(`
        <h1>Welcome to the homepage of the web-ii-challenge</h1>
        <p>Here we will be executing the routing component aspect of the application for NodeJS.</p>
    `)
    res.end()
})

server.listen(5000, () => console.log(`LISTENING TO PORT 5000`))