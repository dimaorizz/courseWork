const router = require('express').Router();
const Deals = require('../models/Deals');
const Branches = require('../models/Branches');
const Agents = require('../models/Agents');
const Cars = require('../models/Cars');
const Clients = require('../models/Clients');

router.get('/', async (req, res) => {
    const [deals, branches, agents, cars, clients] = await Promise.all(
        [Deals.find(), Branches.find(), Agents.find(), Cars.find(), Clients.find()]
    );
    res.status(200).render('deals',  { deals, branches, agents, cars, clients });
});

router.post('/', async (req, res) => {
    const rentalDays = req.body.rentalDays > 0 ? req.body.rentalDays : 0;
    const deal = new Deals({
        carId: req.body.carId,
        clientId: req.body.clientId,
        rentalDays: rentalDays,
        totalCost: req.body.totalCost,
        history: [{
            status: 'Видано',
            agentId: req.body.agentId,
            branchId: req.body.branchId,
        }]
    });
    try {
        await deal.save();
    } catch (error) {
        console.error('Deals saving error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(201).redirect('/deals');
});

router.post('/close/:id', async (req, res) => {
    const dealId = req.params.id;
    const closedDeal = {
        status: 'Прийнято',
        agentId: req.body.agentId,
        branchId: req.body.branchId
    };
    console.log(closedDeal)
    const deal = await Deals.findOne({_id: dealId});
    const history = deal.history;
    history.push(closedDeal);
    await Deals.updateOne({_id: dealId}, {history});
    res.redirect('/deals');
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const editedDeal = {
        carId: req.body.carId,
        clientId: req.body.clientId,
        rentalDays: req.body.rentalDays,
        totalCost: req.body.totalCost
    };
    try {
        await Deals.updateOne( {_id: id}, editedDeal );
    } catch (error) {
        console.error('Deal updating error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).redirect('/deals');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Deals.deleteOne( { _id: id } );
    } catch (error) {
        console.error('Deal deleting error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).send();
});

module.exports = router;