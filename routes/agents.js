const router = require('express').Router();
const Agents = require('../models/Agents');
const Branches = require('../models/Branches');

router.get('/', async (req, res) => {
    const branches = await Branches.find();
    const agents = await Agents.find();
    res.status(200).render('agents', { agents, branches });
});

router.get('/:id', async (req, res) => {
    const agent = await Agents.findOne({_id: req.params.id});
    res.status(200).send(agent);
});

router.post('/', async (req, res) => {
    const agent = new Agents({
        branchId: req.body.branchId,
        firstName: req.body.firstName,
        surname: req.body.surname,
        secondName: req.body.secondName
    });
    try {
        await agent.save();
    } catch (error) {
        console.error('Agent saving error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(201).redirect('/agents');
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const editedAgent = {
        branchId: req.body.branchId,
        firstName: req.body.firstName,
        surname: req.body.surname,
        secondName: req.body.secondName
    };
    try {
        await Agents.updateOne( {_id: id}, editedAgent);
    } catch (error) {
        console.error('Agent updating error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).redirect('/agents');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Agents.deleteOne( { _id: id } );
    } catch (error) {
        console.error('Agent deleting error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).redirect('/agents');
});

module.exports = router;