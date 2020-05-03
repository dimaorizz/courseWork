const router = require('express').Router();
const Clients = require('../models/Clients');

router.get('/', async (req, res) => {
    const clients = await Clients.find();
    res.status(200).render('clients', { clients });
});

router.get('/:id', async (req, res) => {
    const client = await Clients.findOne({ _id: req.params.id });
    res.status(200).send(client);
});

router.post('/', async (req, res) => {
    const client = new Clients({
        firstName: req.body.firstName,
        surname: req.body.surname,
        secondName: req.body.secondName,
        phone: req.body.phone,
        successfulDeals: req.body.successfulDeals || 0,
        failedDeals: req.body.failedDeals || 0
    });
    try {
        await client.save();
    } catch (error) {
        console.error('Client saving error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(201).redirect('/clients');
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const editedClient = {
        firstName: req.body.firstName,
        surname: req.body.surname,
        secondName: req.body.secondName,
        phone: req.body.phone,
        successfulDeals: req.body.successfulDeals,
        failedDeals: req.body.failedDeals
    };
    try {
        await Clients.updateOne( {_id: id}, editedClient);
    } catch (error) {
        console.error('Client updating error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).redirect('/clients');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Clients.deleteOne( { _id: id } );
    } catch (error) {
        console.error('Client deleting error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).send();
});

module.exports = router;