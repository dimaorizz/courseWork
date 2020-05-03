const router = require('express').Router();
const collectionName = 'deals';

router.get('/', async (req, res) => {
    const deals = await db.collection(collectionName).find({ }).toArray();
    res.status(200).render('deals',  { deals });
});

router.post('/', async (req, res) => {
    const deal = {
        carId: new mongodb.ObjectID(req.body.carId),
        clientId: new mongodb.ObjectID(req.body.clientId),
        rentalDays: req.body.rentalDays,
        totalCost: req.body.totalCost,
        history: [{
            status: 'Видано',
            agentId: new mongodb.ObjectID(req.body.agentId),
            branchId: new mongodb.ObjectID(req.body.branchId),
            date: new Date().now()
        }]
    };
    try {
        await db.collection(collectionName).insertOne(deal);
    } catch (error) {
        console.error('Deals saving error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(201).send(deal);
});

router.post('/:id', async (req, res) => {
    const id = new mongodb.ObjectID(req.params.id);
    const editedDeal = {
        carId: new mongodb.ObjectID(req.body.carId),
        clientId: new mongodb.ObjectID(req.body.clientId),
        rentalDays: req.body.rentalDays,
        totalCost: req.body.totalCost
    };
    try {
        await db.collection(collectionName).updateOne( {_id: id}, { $set: editedDeal });
    } catch (error) {
        console.error('Deal updating error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).send();
});

router.delete('/:id', async (req, res) => {
    const id = new mongodb.ObjectID(req.params.id);
    try {
        await db.collection(collectionName).deleteOne( { _id: id } );
    } catch (error) {
        console.error('Deal deleting error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).send();
});

module.exports = router;