const Course = require("../../modals/CourseModal/CourseModal");
const Stream = require("../../modals/CourseModal/StreamModal");
const Degree = require("../../modals/CourseModal/DegreeModal");

exports.CreateCourse = async (req, res) => {
  try {
    const {
      streamId,
      degreeId,
      coursename,
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

    // Check if coursename already exists
    const existingCourse = await Course.findOne({ coursename });
    if (existingCourse) {
      return res.status(400).json({
        statuscode: 400,
        success: false,
        message: "Course name already exists",
        data: [],
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

    const CourseData = new Course({
      stream: streamId,
      degree: degreeId,
      coursename,
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

    const response = await CourseData.save();
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: response,
      message: "Course created successfully",
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

exports.GetCourseData = async (req, res) => {
  try {
    const response = await Course.find({});
    res.status(200).json({
      statuscode: 200,
      success: true,
      response: response,
      message: "Entire Course data is Fetch",
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

exports.UpdateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        streamId,
        degreeId,
        coursename,
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
        stream: streamId,
        degree: degreeId,
        coursename,
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

  

exports.DeleteCourse=async(req,res)=>{
    try{
        const {id}=req.params;
        await Course.findByIdAndDelete(id)
 
        res.status(200).json({
            success:true,
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
};