const { json } = require("body-parser");
const Data = require("../../modals/LocationModal/country");
const Region = require("../../modals/LocationModal/region");

exports.CreateCountry = async (req, res) => {
  try {
    const { countryname, regionId } = req.body;
    // Validate that the region exists
    const region = await Region.findById(regionId);
    if (!region) {
      return res.status().json({
        statuscode: 500,
        success: false,
        message: "Region not found",
        data: [],
      });
    }

    const country = new Data({ countryname, region: regionId });
    const savedCountry = await country.save();

    res.status(200).json({
      statuscode: 200,
      success: true,
      data: savedCountry,
      message: "Country created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status().json({
      statuscode: 500,
      success: false,

      data: [],
      message: error.message,
    });
  }
};

exports.GetCountryData = async (req, res) => {
  try {
    const CountryData = await Data.find({}).populate("region");
    //response
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: CountryData,
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

exports.GetCountryDataBYID = async (req, res) => {
  try {
    const id = req.params.id;
    const CountryDataid = await Data.findById(id).populate("region");
    if (!CountryDataid) {
      return res
        .status(500)
        .json({
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
