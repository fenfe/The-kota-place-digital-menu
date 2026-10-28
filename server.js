const express = require('express');
const app = express();
const port = 3000;
// install ejs(3rd party library) the EJS module to use as my view [npm install ejs]

app.use(express.json());
app.use(express.static('public'));//run static files (css,images)
app.set('view-engine', 'ejs');//allow/configure express to use ejs


app.get('/', (req, res) => {
res.send('hello server today');
})

app.listen(port, () => {
    console.log('mmadikutle onfire with backend')
})