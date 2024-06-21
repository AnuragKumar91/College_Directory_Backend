const Degree = require("../../modals/CourseModal/DegreeModal");

exports.CreateDegree = async (req, res) => {
   try {
    const { degreename, titles, descriptions } = req.body;
    const existingDegree = await Degree.findOne({ degreename });
    if (existingDegree) {
      return res.status(400).json({
        statuscode: 400,
        success: false,
        response: [],
        message: "Degree name already exist",
      });
    }

    const DegreeData=new Degree({
      degreename,
      titles,
      descriptions
    }
     
    ) 
    const response = await  DegreeData.save()
    res.status(200).json({
        statuscode: 200,
        success: true,
        response: response,
        message: "Degree created successfully",
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

exports.GetDegreeData=async(req,res)=>{
try{
    const response= await Degree.find({})
    res.status(200).json({
        statuscode: 200,
        success: true,
        response: response,
        message: "Entire Degree data is Fetch",
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

exports.DegreeUpdate = async (req, res) => {
    try {
      const { id } = req.params;
      const {
        degreename,
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
        degreename,
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
  
      const updatedegree = await Degree.findByIdAndUpdate(
        { _id: id },
        updateData,
        { new: true }
      );
  
      if (!updatedegree) {
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
        response: updatedegree,
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
  
exports.DegreeDelete=async(req,res)=>{
    try{
        const {id}=req.params;

        await Degree.findByIdAndDelete(id);
        res.status(200).json({
            success:true,
            statuscode:200,
            message: "Degree Data deleted",
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