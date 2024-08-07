const { json } = require("body-parser");
const Data = require("../../modals/LocationModal/state");
const Country = require("../../modals/LocationModal/country");
const Region = require("../../modals/LocationModal/region");

exports.CreateState = async (req, res) => {
  try {
    const {
      statename,
      countryId,
      regionId,
      titles,
      descriptions,
      aboutstate,
      population,
      chiefminister,
      rank,

      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
    } = req.body;

    // Ensure the type is set to "state"
    req.body.type = "state";
    const existingState = await Data.findOne({ statename });
    if (existingState) {
      return res.status(400).json({
        statuscode: 400,
        success: false,
        message: "State name already exists",
        data: [],
      });
    }

    // Validate that the country exists

    const country = await Country.findById(countryId);
    if (!country) {
      return res.status(500).json({
        statuscode: 500,
        success: false,
        message: "Country not found",
      });
    }

    // Validate that the region exists
    const region = await Region.findById(regionId);
    if (!region) {
      return res.status(500).json({
        statuscode: 500,
        success: false,
        message: "Region not found",
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

    const state = new Data({
      statename,
      country: countryId,
      region: regionId,
      map: mapPath,
      logo: logoPath,
      ogimage: ogimagePath,
      aboutstate,
      population,
      chiefminister,
      rank,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
    });
    const savedState = await state.save();

    res.status(200).json({
      statuscode: 200,
      success: true,
      data: savedState,
      message: "State created successfully",
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













exports.GetStateData = async (req, res) => {
  try {
    const StateData = await Data.find({}).populate("region").populate({
      path: "country",
    });
    //response
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: StateData,
      message: "Entire State data is Fetch",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      statuscode: 200,
      success: false,
      data: [],
      message: err.message,
    });
  }
};




exports.GetStateDatabyCountryId = async (req, res) => {
  try {
    const { countryId } = req.params;
    const states = await Data.find({ country: countryId });
    res.json({ success: true, state: states });
  } catch (error) {
    console.error("Error fetching countries:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.GetStateDataBYID = async (req, res) => {
  try {
    const id = req.params.id;
    const stateDataById = await Data.findById(id).populate("region").populate({
      path: "country",
    });
    if (!stateDataById) {
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
      data: stateDataById,
      message: `${id} data successfully get`,
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      statuscode: 200,
      success: false,
      data: [],
      message: err.message,
    });
  }
};

exports.StateUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const { statename } = req.body;
    const stateupdate = await Data.findByIdAndUpdate(
      { _id: id },
      { statename }
    );
    res.status(200).json({
      statuscode: 200,
      success: true,
      data: stateupdate,
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

exports.StateDelete = async (req, res) => {
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
