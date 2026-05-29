const express = require('express');
const authController = require('../controllers/authController');
const siteController = require('../controllers/siteController');
const bookingController = require('../controllers/bookingController');
const authenticate = require('../middleware/authenticate');
const validate = require('../middleware/validate');
const { registerSchema, loginSchema } = require('../validations/userValidation');
const { siteSchema } = require('../validations/siteValidation');

const router = express.Router();

// Health
router.get('/', (req, res) => res.json({ message: 'EntryWay API is running' }));

// Auth Routes
router.post('/register', validate(registerSchema), authController.register);
router.post('/signin', validate(loginSchema), authController.signin);
router.get('/logout', authController.logout);
router.get('/about', authenticate, authController.getAbout);
router.get('/getdata', authenticate, authController.getAbout);
router.post('/contact', authenticate, authController.contact);

// Site Routes
router.post('/addsite', validate(siteSchema), siteController.addSite);
router.get('/readdata', siteController.getAllSites);
router.get('/getdataofsite/:id', authenticate, siteController.getSiteById);
router.get('/read/:id', siteController.getAdminSites);
router.get('/moreinfo/:id', siteController.getSiteById);
router.get('/getupdate/:id', authenticate, siteController.getSiteById);
router.put('/update', siteController.updateSite);
router.delete('/delete/:id', siteController.deleteSite);
router.post('/search', siteController.searchSites);

// Booking Routes
router.post('/booking', authenticate, bookingController.createBooking);
router.post('/qrdata', authenticate, bookingController.saveQrData);
router.get('/visited/:id', bookingController.markVisited);
router.get('/bookingdataadmin/:id', bookingController.getAdminBookings);
router.get('/bookingdata', authenticate, bookingController.getUserBookings);

// QR Generation EJS route
router.get('/generateqr/:id/', async (req, res) => {
  const bookingModel = require('../model/bookingschema');
  const id = req.params.id;
  try {
    const data = await bookingModel.find({ ticket_bookedby: id });
    res.render('../public/views/check.ejs', { title: 'ENTRY WAY', visitdata: data, success: '' });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
