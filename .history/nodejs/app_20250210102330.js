
const express = require('express')
const app = express()
const port = 6600
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

app.use(express.static('public'))
app.set('views', path.join(__dirname,'/views'))
app.set('view engine', 'ejs')

const games = JSON.parse(fs.readFileSync('./game.json','utf-8'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/privacy-policy.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'privacy-policy.html'));
});

// app.get('/home.html', (req, res) => {
//     return res.render('home',{games});
// })

app.get('/', (req, res) => {
    return res.render('home', { games });
});

app.get('/home.html', (req, res) => {
    return res.render('home', { games });
});


app.get('/game/:name', (req, res) => {
    const find = games.filter(i => i.slug == req.params.name);
    const newdata = [...Array(8)].map(i => games[(Math.floor(Math.random() * games.length))]);

    if (!find.length) {
        return res.send('404')
    }
    return res.render('singel',{data:find[0], newdata});
})

app.get('/category/:name', (req, res) => {
    const find = games.filter(i => i.type == req.params.name);
    if (!find.length) {
        return res.send('404')
    }
    return res.render('category',{data:find});
})

app.get('/game/:name/play', (req, res) => {
    const find = games.filter(i => i.slug == req.params.name);
    if (!find.length) {
        return res.send('404')
    }
    return res.render('play',{data:find[0]});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})