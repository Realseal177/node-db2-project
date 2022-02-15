const { checkCarId, checkVinNumberUnique, checkVinNumberValid, checkCarPayload } = require('./cars-middleware');
const Car = require('./cars-model');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
    try {
        const car = await Car.getAll();
        res.status(200).json(car);
    } catch (err) {
        next(err)
    }
})

router.get('/:id', checkCarId, async (req, res, next) => {
    const { id } = req.params;
    try {
        const car = await Car.getById(id)
        res.json(car)
    } catch (err) {
        next(err)
    }
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Car.create(req.body)
        res.status(201).json(newCar)
    } catch (err) {
        next(err)
    }
})



module.exports = router;
