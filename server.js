const express = require('express');
const app = express();
const fetchAllQuotesRouter = require('./routes/quotes');

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

//mounts the routes
app.use('/api/quotes', fetchAllQuotesRouter);


app.listen(PORT, () => {
    console.log(`App running at ${PORT}`)
})

