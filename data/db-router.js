const router = require('express').Router();
const db = require('./db');

// * ROUTES

// ? GET (POSTS)
router.get('/', async (req, res) => {
    await db.find()
        .then(posts => res.status(200)
            .json(posts)
        )
        .catch(err => res.status(500)
            .json({ error: "The posts information could not be retrieved." })
        )
    res.end()
})

// ? GET (POSTS + ID)
router.get('/:id', async (req, res) => {
    const id = req.params.id

    !!id === true ?
        await db.findById(id)
            .then(post => res.status(200).json(post))
            .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
        :
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    res.end()
})

// ? GET (POSTS + ID + COMMENTS)
router.get('/:id/comments', async (req, res) => {
    const id = req.params.id

    !!id === true ?
        await db.findPostComments(id)
            .then(comment => res.status(200).json(comment))
            .catch(err => res.status(500).json({ error: "SOMETHING WENT WRONG" }))
        :
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    res.end()

})

// ? POST (POST OBJ)
router.post('/', async (req, res) => {
    const { title, contents } = req.body

    if (!!title === false || !!contents === false) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else {
        await db.insert(req.body)
            .then(post => res.status(201).json(req.body))
            .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }))
    }

    res.end()

})

module.exports = router;