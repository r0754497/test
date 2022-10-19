const express = require('express');
const router = express.Router();
const Campus = require('./models/campus');
const Docent = require('./models/docent');

router.param('id', (req, res, next, id) => {
    req.params.id = id;
    next();
});

router.get('/', (req, res) => {
    console.log('/ route called');
    res.send(
        '<body><h1>Welcome to my API, these are the available routes:</h1>'
        + '<h2>/</h2>'
        + 'Where you are right now'
        + '<hr/>'
        + '<h2>/campus</h2>'
        + 'Returns all compuses in the database using .find()'
        + '<hr/>'
        + '<h2>/campus/:id</h2>'
        + 'Returns campus from id.'
        + '<hr/>'
        + '<h2>/campus/create</h2>'
        + 'Create new campus from body'
        + '<hr/>'
        + '<h2>/campus/update/:id</h2>'
        + 'Update existing campus by id'
        + '<hr/>'
        + '<h2>/campus/delete/:id</h2>'
        + 'Delete campus by id'
        + '<hr/></body>'
        )
});




router.get('/campus', async (req, res) => {
    console.log('/campus route called');
    try {
        res.json(await Campus.find());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.post('/campus/create', async (req, res) => {
    console.log('/campus/create has been called');
    try {
        res.send(await Campus.create(req.body));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.put('/campus/update/:id', async (req, res) => {
    console.log('/campus/update/:id route called');
    try {
        res.send(await Campus.findByIdAndUpdate(req.params.id, { $set: req.body}));
    } catch(e) {
        console.log(e); 
        res.sendStatus(500);
    }
});

router.delete('/campus/delete/:id', async (req, res) => {
    console.log('/campus/delete/:id route called');
    try {
        res.send(await Campus.findByIdAndDelete(res.params.id));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/campus/:id', async (req, res) => {
    console.log('Campus/:id has been called')
    try {
        res.send(await Campus.findById(req.params.id));
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

router.get('/docent', async (req, res) => {
    console.log('./docent route called');
    try {
        res.json(await Docent.find().populate());
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = router;