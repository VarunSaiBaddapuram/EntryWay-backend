const bookingModel = require('../model/bookingschema');
const qrmModel = require('../model/qrschema');
const touristModel = require('../model/addtouristschema');
const ApiError = require('../utils/apiError');
const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger');

const createBooking = async (req, res) => {
  const { ticket_of, adminID, Totalpaid, ticket_ofname, adults, children, foreigner } = req.body;
  const user = req.rootUser;

  const booking = new bookingModel({
    ticket_bookedby: user._id,
    ticket_bookedbyname: user.name,
    ticket_of,
    ticket_ofname,
    adminID,
    adult: adults,
    children,
    foreigner,
    Totalpaid,
    Qr_generated: '',
    booked_on: new Date().toISOString().split('T')[0],
    valid_for: '24 hr',
  });

  await booking.save();
  logger.info(`Ticket booked by ${user.name} for ${ticket_ofname}`);
  res.status(StatusCodes.CREATED).json({
    success: true,
    data: req.userID,
  });
};

const saveQrData = async (req, res) => {
  const { bought_by, siteid, qrid, qrurl } = req.body;

  const site = await touristModel.findById(siteid);
  if (!site) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Site not found');
  }

  const qrInfo = new qrmModel({
    bought_by,
    siteid,
    adminID: site.Adminid,
    status: 'NOT USED',
    Total_paid: 0,
    qrid,
    qrurl,
  });

  await bookingModel.updateOne(
    { ticket_bookedby: bought_by, ticket_of: siteid },
    { $set: { Qr_generated: qrurl, Qr_id: qrid } }
  );

  await qrInfo.save();
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'QR data saved',
  });
};

const markVisited = async (req, res) => {
  const id = req.params.id;
  const booking = await bookingModel.findById(id);
  if (!booking) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Booking not found');
  }

  await qrmModel.updateOne(
    { bought_by: booking.ticket_bookedby, siteid: booking.ticket_of, qrid: booking.Qr_id },
    { $set: { status: `USED ON ${new Date().toLocaleString()}`, Total_paid: booking.Totalpaid } }
  );

  await bookingModel.findByIdAndDelete(id);
  res.render('../public/views/final.ejs');
};

const getAdminBookings = async (req, res) => {
  const bookings = await qrmModel.find({ adminID: req.params.id });
  res.status(StatusCodes.OK).json({
    success: true,
    data: bookings,
  });
};

const getUserBookings = async (req, res) => {
  const bookings = await bookingModel.find({ ticket_bookedby: req.rootUser._id });
  res.status(StatusCodes.OK).json({
    success: true,
    data: bookings,
  });
};

module.exports = {
  createBooking,
  saveQrData,
  markVisited,
  getAdminBookings,
  getUserBookings,
};
