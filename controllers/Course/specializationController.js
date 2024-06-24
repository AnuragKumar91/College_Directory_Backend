const Specialization = require("../../modals/CourseModal/SpecializationModal");
const Course = require("../../modals/CourseModal/CourseModal");
const Degree = require("../../modals/CourseModal/DegreeModal");
const Stream = require("../../modals/CourseModal/StreamModal");

exports.CreateSpecialization = async (req, res) => {
  try {
    const {
      courseId,
      streamId,
      degreeId,
      specalizationname,
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

    //check if specialzation name exist or not
    const existingSpecialization = await Specialization.findOne({
      specalizationname,
    });
    if (existingSpecialization) {
      return res.status(400).json({
        statuscode: 400,
        success: false,
        message: "Specialization name already exists",
        data: [],
      });
    }
    // Validate that the course id exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        message: "Course not found",
      });
    }
    // Validate that the stream id exists
    const stream = await Stream.findById(streamId);
    if (!stream) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        message: "Stream not found",
      });
    }

    // Validate that the degree id exists
    const degree = await Degree.findById(degreeId);
    if (!degree) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        message: "Degree not found",
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

    const SpecializationData = new Specialization({

      course: courseId,
      stream: streamId,
      degree: degreeId,
      specalizationname,
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

    const response = await SpecializationData.save();
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: response,
      message: "Specialization created successfully",
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


exports.GetSpecializationData=async(req,res)=>{
  try{  
    const response =await Specialization.find({})
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: response,
      message: "Entire Specialization data is Fetch",
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






exports.UpdateSpecialization = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      courseId,
      streamId,
      degreeId,
      specalizationname,
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
 

     //validate that the course if exist
     const course = await Course.findById(courseId);
     if (!course) {
       return res.status(404).json({
         statuscode: 404,
         success: false,
         message: "Course not found",
       });
     }
 

    // Validate that the stream id exists
    const stream = await Stream.findById(streamId);
    if (!stream) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        message: "Stream not found",
      });
    }

    // Validate that the degree id exists
    const degree = await Degree.findById(degreeId);
    if (!degree) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        message: "Degree not found",
      });
    }

    // Handle file uploads
    let updateData = {
      course:courseId,
      stream: streamId,
      degree: degreeId,
      specalizationname,
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

    const updatedCourse = await Course.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedCourse) {
      return res.status(404).json({
        statuscode: 404,
        success: false,
        message: "Course not found",
        data: [],
      });
    }

    res.status(200).json({
      statuscode: 200,
      success: true,
      response: updatedCourse,
      message: "Course updated successfully",
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




exports.DeleteSpecialization=async(req,res)=>{
  try{
      const {id}=req.params;
      await Specialization.findByIdAndDelete(id)

      res.status(200).json({
          success:true,
          statuscode:200,
          message: "Specialization Data deleted",
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