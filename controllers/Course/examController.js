const Exam = require("../../modals/CourseModal/ExamModal");

exports.CreateExam = async (req, res) => {
  try {
    const {
      examname,
      shortdescription,
      longdescription,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
    } = req.body;
    // Ensure the type is set to "degree"
    req.body.type = "degree";
    //check if degreename is already exsit or not

    const existingExam = await Exam.findOne({ examname });
    if (existingExam) {
      return res.send(400).json({
        status: 400,
        success: false,
        response: [],
        message: "Exam name already exist",
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

    const ExamData = new Exam({
      examname,
      shortdescription,
      longdescription,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
      icon: iconPath,
      banner: bannerPath,
      ogimage: ogimagePath,
    });
    const response = await ExamData.save();
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: response,
      message: "Exam created successfully",
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


exports.GetExamData =async(req,res)=>{
    try{
   const response =await Exam.find({})
   res.status(200).json({
    statuscode: 200,
    success: true,
    response: response,
    message: "Entire Exam data is Fetch",
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



exports.ExamUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      examname,
      shortdescription,
      longdescription,
      titles,
      descriptions,
      metatitle,
      metadescription,
      metakeyword,
      ogtitle,
      ogdescription,
    } = req.body;

    // Handle file uploads
    let updateData = {
      examname,
      shortdescription,
      longdescription,
      titles,
      descriptions,
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

    const updateexam = await Degree.findByIdAndUpdate(
      { _id: id },
      updateData,
      { new: true }
    );

    if (!updateexam) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        response: [],
        message: "Degree not found",
      });
    }

    res.status(200).json({
      statuscode: 200,
      success: true,
      response: updateexam,
      message: "Update degree successfully",
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






exports.DeleteExam=async(req,res)=>{
    try{
        const {id}=req.params;
        await Course.findByIdAndDelete(id)
 
        res.status(200).json({
            success:true,
            statuscode:200,
            message: "Exam Data deleted",
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
};

