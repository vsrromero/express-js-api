const express = require('express');
const { quotes } = require('../data/data');
const { getRandomElement } = require('../helpers/utils');

const quotesRouter = express.Router();

quotesRouter.get('/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({quote: quote});
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




module.exports = quotesRouter;

