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

// ? GET (POSTS + ID's)
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

module.exports = router;