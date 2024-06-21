const { json } = require("body-parser");
const Data = require("../../modals/LocationModal/city");
const Region = require("../../modals/LocationModal/region");
const Country = require("../../modals/LocationModal/country");
const State = require("../../modals/LocationModal/state");

exports.CreateCity = async (req, res) => {
  try {
    const {
      cityname,
      stateId,
      countryId,
      regionId,
      aboutcity,
      mla,
      population,
      rank,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
    } = req.body;

    // Ensure the type is set to "city"
    req.body.type = "city";

    //validate that the state exist
    const state = await State.findById(stateId);
    if (!state) {
      return res.status(500).json({
        statuscode: 500,
        success: false,
        message: [],
      });
    }
    // Validate that the country exists

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(500).json({
        statuscode: 500,
        success: false,
        message: [],
      });
    }

    // Validate that the region exists
    const region = await Region.findById(regionId);
    if (!region) {
      return res.status(500).json({
        statuscode: 500,
        success: false,
        message: [],
      });
    }
    // Handle file uploads

    let mapPath = null;
    let logoPath = null;
    let ogimagePath = null;

    if (req.files && req.files.map) {
      mapPath = req.files.map[0].path;
    }
    if (req.files && req.files.logo) {
      logoPath = req.files.logo[0].path;
    }

    if (req.files && req.files.ogimage) {
      ogimagePath = req.files.ogimage[0].path;
    }

    const city = new Data({
      cityname,
      state: stateId,
      country: countryId,
      region: regionId,
      map: mapPath,
      logo: logoPath,
      ogimage: ogimagePath,
      aboutcity,
      mla,
      population,
      rank,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
    });
    const savedCity = await city.save();

    res.status(200).json({
      statuscode: 200,
      success: true,
      data: savedCity,
      message: "City created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      statuscode: 500,
      success: false,
      message: [],
      error: error.message,
    });
  }
};

exports.GetCityData = async (req, res) => {
  try {
    const CityData = await Data.find({})
      .populate("region")
      .populate({
        path: "country",
      })
      .populate({
        path: "state",
      });
    //response
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: CityData,
      message: "Entire State data is Fetch",
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

exports.GetCityDatabyStateId = async (req, res) => {
  try {
    const { stateId } = req.params;

    console.log(`Fetching cities for stateId: ${stateId}`);

    const cities = await Data.find({ state: stateId });
    if (cities.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No cities found" });
    }
    res.json({ success: true, city: cities });
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.GetCityDataBYID = async (req, res) => {
  try {
    const id = req.params.id;
    const citydataid = await Data.findById({ _id: id })
      .populate("region")
      .populate({
        path: "country",
      })
      .populate({
        path: "state",
      });
    if (!citydataid) {
      return res
        .status(500)
        .json({ statuscode: 500, success: false, messgae: [] });
    }
    //data for given id found
    res.status(200).json({
      statuscode: 200,
      success: true,
      data: citydataid,
      message: `StateDataid ${id} data successfully get`,
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

exports.CityUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { cityname } = req.body;
    const cityupdate = await Data.findByIdAndUpdate({ _id: id }, { cityname });
    res.status(200).json({
      statuscode: 200,
      success: true,
      data: cityupdate,
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

exports.CityDelete = async (req, res) => {
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
