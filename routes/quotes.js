const express = require('express');
const { quotes } = require('../data/data');
const { getRandomElement, getIndexById, updateElement, createQuote } = require('../helpers/utils');

const quotesRouter = express.Router();

quotesRouter.get('/random', (req, res, next) => {
    const quote = getRandomElement(quotes);
    res.send({quote: quote});
});

quotesRouter.get('/test', (req, res, next) => {
    const mQuery = req.query;
    res.send({quote: mQuery});
});

quotesRouter.get('/', (req, res, next) => {
    const person = req.query.person;
    if(!person) {
        res.send({quotes: quotes});
    } else {
        const quotePerson = quotes.filter(quote => quote.person === person);
        res.send({quotes: quotePerson});
    }
});

quotesRouter.get('/:id', (req, res, next) => {
    const quoteID = req.params.id;
    console.log(quoteID);
    const quoteById = quotes.filter(quote => quote.id === quoteID);
    console.log(quoteById);
    res.send(quoteById);
});

quotesRouter.post('/', (req, res, next) => {
    const receivedQuote = req.query;
    if(receivedQuote.quote && receivedQuote.person) {
        const newQuote = createQuote(receivedQuote);
        console.log(newQuote);
        res.status(201).send({quote: newQuote});
    } else {
        res.status(400).send('Unable to write file');
    }
});


quotesRouter.put('/:id', (req, res, next) => {
    const quoteID = getIndexById(req.params.id, quotes);
    console.log(quoteID);
    if (quoteID !== -1) {
        updateElement(req.params.id, req.query, quotes);
        res.send(quotes[quoteID]);
    } else {
        res.status(404).send();
    }
});

quotesRouter.delete('/:id', (req, res, next) => {
    const quoteID = getIndexById(req.params.id, quotes);
    if(quoteID !== -1) {
        quotes.splice(quoteID, 1);
        res.status(204).send();
    } else {
        res.status(404).send();
    }
})

module.exports = quotesRouter;

