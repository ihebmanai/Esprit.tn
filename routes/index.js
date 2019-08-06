const router = require('express').Router();

const indexRouter = require('./index');
const userRoutes = require('./user.route');
const clubRouter = require('./club.route');
const eventRouter = require('./event.route');
const challengesRouter = require('./challenges');
const unityRouter = require('./unity');
const partRouter = require('./parteneriat');
const pressRouter = require('./press.route');
const specRouter = require('./speciality');
const calRouter = require('./calendrier');
const tarRouter = require('./tarifs');
const infraRouter = require('./infrastructure');
const actRouter = require('./actualite');
const newsRouter = require('./news');
const departementRouter = require('./departement');

router.get('/', (req, res) => {
	res.send({
		success: true
	});
});

router.use('/user', userRoutes);
router.use('/club', clubRouter);
router.use('/events', eventRouter);
router.use('/challenges', challengesRouter);
router.use('/unity', unityRouter);
router.use('/part', partRouter);
router.use('/press', pressRouter);
router.use('/speciality', specRouter);
router.use('/calendrier', calRouter);
router.use('/tarif', tarRouter);
router.use('/infrastructure', infraRouter);
router.use('/act', actRouter);
router.use('/news', newsRouter);
router.use('/departement', departementRouter);

module.exports = router;
