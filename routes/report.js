const router = require('express').Router();
const Deals = require('../models/Deals');
const Cars = require('../models/Cars');
const Agents = require('../models/Agents');


router.get('/', async (req, res) => {
    const closedDeals = await Deals.find(
        {
            history: {
                $size: 2
            }
        }
    );
    const monthMiliseconds = 2592000000;
    const monthDeals = (await Deals.aggregate([
        {
            $lookup:{
                from: 'cars',
                localField: 'carId',
                foreignField: '_id',
                as: 'carInfo'
            }
        }
    ]))
    .filter(deal => new Date().getTime() - deal.history[0].date < monthMiliseconds);
    const usedCars = [];
    monthDeals.forEach(deal => usedCars.push(deal.carId));
    const unusedCars = await Cars.find({
        _id: {
            $nin: usedCars
        }
    });
    let monthIncome = 0;
    monthDeals.forEach(deal => monthIncome += deal.rentalDays * deal.carInfo[0].cost);

    const agentsInMonthDeals = [];
    monthDeals.forEach(deal => agentsInMonthDeals.push(deal.history[0].agentId, deal.history[1] === undefined ? null : deal.history[1].agentId));
    const uselessMonthAgents = await Agents.find({
        _id: {
            $nin: agentsInMonthDeals
        }
    })
    res.render('report', {closedDeals, unusedCars, monthIncome, uselessMonthAgents});
});

module.exports = router;