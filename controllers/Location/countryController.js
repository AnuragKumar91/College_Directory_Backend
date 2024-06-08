const { json } = require("body-parser");
const Data = require("../../modals/LocationModal/country");
const Region = require("../../modals/LocationModal/region");
const fs = require("fs");

exports.CreateCountry = async (req, res) => {
  try {
    const {
      countryname,
      regionId,
      aboutcountry,
      foodculture,
      language,
      primeminister,
      president,
      population,
      status,
      rank,
      populationByReligion,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
    } = req.body;

    // Validate that the region exists
    const region = await Region.findById(regionId);
    if (!region) {
      return res.status(500).json({
        statuscode: 500,
        success: false,
        message: "Region not found",
        data: [],
      });
    }

    // Handle file uploads
    let logoPath = null;
    let mapPath = null;
    let flagPath = null;
    let ogimagePath = null;

    if (req.files && req.files.logo) {
      logoPath = req.files.logo[0].path;
    }

    if (req.files && req.files.map) {
      mapPath = req.files.map[0].path;
    }

    if (req.files && req.files.flag) {
      flagPath = req.files.flag[0].path;
    }

    if (req.files && req.files.ogimage) {
      ogimagePath = req.files.ogimage[0].path;
    }

    const country = new Data({
      countryname,
      region: regionId,
      aboutcountry,
      foodculture,
      language,
      primeminister,
      president,
      population,
      status,
      populationByReligion ,// Ensure this is parsed correctly
      titles,
      descriptions,
      rank,// Ensure this is parsed correctly
      logo: logoPath,
      map: mapPath,
      flag: flagPath,
      commonFields: {
        metatitle,
        metadescription,
        metakeyword,
        ogtitle,
        ogdescription,
        ogimage: ogimagePath, // Ensure ogimage is included
      },
    });

    const response = await country.save();

    res.status(200).json({
      statuscode: 200,
      success: true,
      data: response,
      message: "Country created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statuscode: 500,
      success: false,
      data: [],
      message: error.message,
    });
  }
};

exports.GetCountryData = async (req, res) => {
  try {
    const response = await Data.find({}).populate("region");
    //response
    res.status(200).json({
      statuscode: 200,
      success: true,
      data: response,
      message: "Entire Country data is Fetch",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status().json({
      success: false,
      statuscode: 500,
      response: [],
      message: err.message,
    });
  }
};
exports.GetCountryDatabyRegionId = async (req, res) => {
  try {
    const { regionId } = req.params;
    const countries = await Data.find({ region: regionId });
    res.json({ success: true, countries: countries });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.GetCountryDataBYID = async (req, res) => {
  try {
    const id = req.params.id;
    const CountryDataid = await Data.findById(id).populate("region");
    if (!CountryDataid) {
      return res.status(500).json({
        statuscode: 500,
        success: false,
        messgae: "no data find ny given id",
      });
    }
    //data for given id found
    res.status(200).json({
      statuscode: 200,
      success: true,
      data: CountryDataid,
      message: `CountryDataid ${id} data successfully get`,
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "Internal server error",
      message: err.message,
    });
  }
};

exports.CountryUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { countryname } = req.body;
    const countryupdate = await Data.findByIdAndUpdate(
      { _id: id },
      { countryname }
    );
    res.status(200).json({
      statuscode: 200,
      success: true,
      data: countryupdate,
      message: "Updated Successfully ",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      statuscode: 500,
      success: false,
      data: [],
      message: err.message,
    });
  }
};

exports.CountryDelete = async (req, res) => {
  try {
    const { id } = req.params;
    await Data.findByIdAndDelete(id);
    res.status(200).json({
      statuscode: 200,
      success: true,
      message: "Region Data deleted",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      statuscode: 500,
      success: false,
      data: [],
      message: err.message,
    });
  }
};
