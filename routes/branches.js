const router = require('express').Router();
const Branches = require('../models/Branches');

router.get('/', async (req, res) => {
    const branches = await Branches.find();
    res.status(200).render('branches', { branches });
});

router.get('/:id', async (req, res) => {
    const branch = await Branches.findOne({_id: req.params.id});
    res.status(200).send(branch);
});

router.post('/', async (req, res) => {
    const branch = new Branches({ country: req.body.country, city: req.body.city, adress: req.body.adress });
    try {
        await branch.save();
    } catch (error) {
        console.error('Branch saving error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(201).redirect('/branches');
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const editedBranch = { country: req.body.country, city: req.body.city, adress: req.body.adress };
    try {
        await Branches.updateOne( {_id: id}, editedBranch);
    } catch (error) {
        console.error('Branch updating error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).redirect('/branches');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Branches.deleteOne( { _id: id } );
    } catch (error) {
        console.error('Branch deleting error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).send();
});

module.exports = router;