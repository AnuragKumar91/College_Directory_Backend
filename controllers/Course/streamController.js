const stream = require("../../modals/CourseModal/StreamModal");

exports.CreateStream = async (req, res) => {
 



  try {
    const {
      streamname,
      shortdescription,
      longdescription,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      rank,
      ogdescription,
    } = req.body;
    // Ensure the type is set to "degree"
    //check if degreename is already exsit or not

    const existingStream = await stream.findOne({ streamname });
    if (existingStream) {
      return res.status(400).json({
        status: 400,
        success: false,
        response: [],
        message: "Stream name already exist",
      });
    }
    // Handle file uploads
    let iconPath = null;
    let bannerPath = null;
    let ogimagePath = null;

    if (req.files && req.files.icon) {
      iconPath = req.files.icon[0].path;
    }
    if (req.files && req.files.banner) {
      bannerPath = req.files.banner[0].path;
    }
    if (req.files && req.files.ogimage) {
      ogimagePath = req.files.ogimage[0].path;
    }

    const StreamData = new stream({
      streamname,
      shortdescription,
      longdescription,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      rank,
      ogtitle,
      ogdescription,
     icon :iconPath ,
     banner:bannerPath,
     ogimage:ogimagePath,
    });
    const response = await StreamData.save();
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: response,
      message: "Stream created successfully",
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

}

  
exports.GetStreamData=async(req,res)=>{
  try{
    const response =await stream.find({})
    res.status(200).json({
  statuscode:200,
  success: true,
        response: response,
        message: "Entire Stream data is Fetch",

    })

  }catch (err) {
    console.error(err);
    console.log(err);
    res.status().json({
      success: false,
      statuscode: 500,
      response: [],
      message: err.message,
    });
  }
}


exports.GetStreamDatabyId=async(req,res)=>{
  try{
    const {id}=req.params;
    const response=await stream.findById(id)
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: response,
      message: ` Stream data is Fetch by ${id} `,
    });
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

exports.StreamUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      streamname,
      shortdescription,
      longdescription,
      titles,
      descriptions,
      metatitle,
      metadescription,
      rank,
      metakeyword,
      ogtitle,
      ogdescription,
    } = req.body;

    // Handle file uploads
    let updateData = {
      streamname,
      shortdescription,
      longdescription,
      titles,
      descriptions,
      rank,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
    };

    if (req.files && req.files.icon) {
      updateData.icon = req.files.icon[0].path;
    }
    if (req.files && req.files.banner) {
      updateData.banner = req.files.banner[0].path;
    }
    if (req.files && req.files.ogimage) {
      updateData.ogimage = req.files.ogimage[0].path;
    }

    const updatestream = await Degree.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!updatestream) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        response: [],
        message: "stream not found",
      });
    }

    res.status(200).json({
      statuscode: 200,
      success: true,
      response: updatedegree,
      message: "Update stream successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      statuscode: 500,
      response: [],
      message: err.message,
    });
  }
};

exports.StreamDelete=async(req,res)=>{
  try{
  const{id}=req.params;
   const response= await stream.findByIdAndDelete(id)
  res.status(200).json({
    success:true,
    response:response,
    statuscode:200,
    message: "Stream Data deleted",
})

}catch (err) {
console.error(err);
console.log(err);
res.status(500).json({
  statuscode: 500,
  success: false,
  response: [],
  message: err.message,
});
}
 
}
