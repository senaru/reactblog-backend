import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

// const articlesInfo = ;

const app = express();

app.use(bodyParser.json());

app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;

    articlesInfo[articleName].upvotes++;
    res.status(200).send(`${articleName} now has ${articlesInfo[articleName].upvotes}`)
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const articleName = req.params.name;
    const { username, text } = req.body;

    articlesInfo[articleName].comments.push({ username, text });

    res.status(200).send(articlesInfo[articleName]);
})

app.get('/api/articles/:name/', async (req, res) => {

    try {
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('reactblog');

        const articlesInfo = await db.collection('articles').findOne({ name: articleName });
        res.status(200).json(articlesInfo)

        client.close();
    } catch (e) {
        res.status(500).json({ message: "Error Connecting to db", error });
    }

})

app.listen(8000, () => console.log("Listening on port 8000"));