// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get comments
app.get('/comments', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }

        res.json(JSON.parse(data));
    });
});

// Post comments
app.post('/comments', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
            return;
        }

        const comments = JSON.parse(data);
        comments.push(req.body);

        fs.writeFile(filePath, JSON.stringify(comments), (err) => {
            if (err) {
                res.status(500).send('Error writing data');
                return;
            }

            res.json(comments);
        });
    });
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});