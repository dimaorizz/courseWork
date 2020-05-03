const router = require('express').Router();
const Cars = require('../models/Cars');
const Branches = require('../models/Branches');

router.get('/', async (req, res) => {
    const cars = await Cars.find({ });
    const branches = await Branches.find({ });
    res.status(200).render('cars', { cars, branches });
});

router.get('/:id', async (req, res) => {
    const carId = req.params.id;
    const car = await Cars.findOne({ _id: carId });
    res.status(200).send(car);
});

router.post('/', async (req, res) => {
    const car = new Cars({
        branchId: req.body.branchId,
        brand: req.body.brand,
        color: req.body.color,
        description: req.body.description,
        cost: req.body.cost,
        isActive: Boolean(req.body.isActive)
    });
    try {
        await car.save();
    } catch (error) {
        console.error('Car saving error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(201).redirect('/cars');
});

router.post('/:id', async (req, res) => {
    const id = req.params.id;
    const editedCar = { 
        branchId: req.body.branchId,
        brand: req.body.brand,
        color: req.body.color,
        description: req.body.description,
        cost: req.body.cost,
        isActive: Boolean(req.body.isActive)
    };
    try {
        await Cars.updateOne( {_id: id}, editedCar);
    } catch (error) {
        console.error('Car updating error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).redirect('/cars');
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        await Cars.deleteOne( { _id: id } );
    } catch (error) {
        console.error('Car deleting error: ', error);
        res.status(501).send('Unexpected error');
    }
    res.status(200).send();
});

module.exports = router;