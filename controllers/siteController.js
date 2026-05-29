const touristModel = require('../model/addtouristschema');
const ApiError = require('../utils/apiError');
const { StatusCodes } = require('http-status-codes');
const logger = require('../utils/logger');

const addSite = async (req, res) => {
  const {
    siteName, siteType, siteDescription, country, state, city, zip, zone,
    phoneno, email, adult, children, foreigner, open, close, Availability,
    Bestseasonvisit, image, _id, name, emailuser,
  } = req.body;

  if (open === close) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Open and close timings cannot be the same');
  }

  const site = new touristModel({
    Adminid: _id,
    siteID: siteName.split(' ').join('') + Math.floor(Math.random() * 10001),
    siteName,
    siteType,
    siteDescription,
    siteAddress: { country, state, city, zip, zone },
    contact: { phoneno, email },
    ticketfair: { adult, children, foreigner },
    timings: { open, close },
    Availability,
    image,
    Bestseasonvisit,
    site_added_by: { _id, name, email: emailuser },
  });

  await site.save();
  logger.info(`New site added: ${siteName} by ${name}`);
  res.status(StatusCodes.CREATED).json({
    success: true,
    message: 'Site added successfully',
  });
};

const getAllSites = async (req, res) => {
  const sites = await touristModel.find({}).lean();
  res.status(StatusCodes.OK).json({
    success: true,
    data: sites,
  });
};

const getSiteById = async (req, res) => {
  const site = await touristModel.findById(req.params.id).lean();
  if (!site) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Site not found');
  }
  res.status(StatusCodes.OK).json({
    success: true,
    data: site,
  });
};

const getAdminSites = async (req, res) => {
  const sites = await touristModel.find({ Adminid: req.params.id }).lean();
  res.status(StatusCodes.OK).json({
    success: true,
    data: sites,
  });
};

const deleteSite = async (req, res) => {
  const site = await touristModel.findByIdAndDelete(req.params.id);
  if (!site) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Site not found');
  }
  logger.info(`Site deleted: ${req.params.id}`);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Deleted successfully',
  });
};

const searchSites = async (req, res) => {
  const { sitename } = req.body;
  if (!sitename || sitename.trim() === '') {
    return res.status(StatusCodes.OK).json({ success: true, data: [] });
  }
  const sites = await touristModel.find({
    siteName: { $regex: sitename, $options: 'i' },
  }).lean();
  res.status(StatusCodes.OK).json({
    success: true,
    data: sites,
  });
};

const updateSite = async (req, res) => {
  const {
    id, siteName, siteType, siteDescription, country, state, city, zip, zone,
    phoneno, email, adult, children, foreigner, open, close, Availability,
    Bestseasonvisit, image, _id, name, emailuser,
  } = req.body;

  if (open === close) {
    throw new ApiError(StatusCodes.BAD_REQUEST, 'Open and close timings cannot be the same');
  }

  const updatedSite = await touristModel.findByIdAndUpdate(
    id,
    {
      siteName,
      siteType,
      siteDescription,
      siteAddress: { country, state, city, zip, zone },
      contact: { phoneno, email },
      ticketfair: { adult, children, foreigner },
      timings: { open, close },
      Availability,
      image,
      Bestseasonvisit,
      site_added_by: { _id, name, email: emailuser },
    },
    { new: true, runValidators: true }
  );

  if (!updatedSite) {
    throw new ApiError(StatusCodes.NOT_FOUND, 'Site not found');
  }

  logger.info(`Site updated: ${siteName}`);
  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Site updated successfully',
  });
};

module.exports = {
  addSite,
  getAllSites,
  getSiteById,
  getAdminSites,
  deleteSite,
  searchSites,
  updateSite,
};
