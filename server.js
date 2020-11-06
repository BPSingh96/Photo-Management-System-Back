const http = require("http");

const app = require("./app");
const port = process.env.PORT || 3000;

const server = http.createServer(app);

//start sever on specfic port
server.listen(port, () => {
    console.log(`Server running at :${port}`);
});

