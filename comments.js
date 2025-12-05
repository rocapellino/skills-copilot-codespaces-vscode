// Create web server
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for comments
let comments = [];
let nextId = 1;

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a specific comment by ID
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// Create a new comment
app.post('/comments', (req, res) => {
    const newComment = {
        id: nextId++,
        text: req.body.text
    };
    comments.push(newComment);
    res.status(201).json(newComment);
});

// Update an existing comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (comment) {
        comment.text = req.body.text;
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const index = comments.findIndex(c => c.id === parseInt(req.params.id));
    if (index !== -1) {
        comments.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Comment not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});