const express = require('express');
const { quotes } = require('../data/data');
const { getRandomElement } = require('../helpers/utils');

const quotesRouter = express.Router();

quotesRouter.get('/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({quote: quote});
})

quotesRouter.get('/test', (req, res, next) => {
    const mQuery = req.query;
    res.send({quote: mQuery});
})

quotesRouter.get('/', (req, res, next) => {
    const person = req.query.person;
    if(!person) {
        res.send({quotes: quotes});
    } else {
        const quotePerson = quotes.filter(quote => quote.person === person);
        res.send({quotes: quotePerson});
    }
});

quotesRouter.post('/', (req, res, next) => {
    const receivedQuote = req.query;
    if(receivedQuote.quote && receivedQuote.person) {
        quotes.push(receivedQuote);
        res.status(201).send(quotes);
    } else {
        res.status(400).send('Unable to write file')
    }
})


module.exports = quotesRouter;

