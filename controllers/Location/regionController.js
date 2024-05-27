const { json } = require("body-parser");
const Data = require("../../modals/LocationModal/region");

exports.CreateRegion = async (req, res) => {
    try {
        const { regionname } = req.body;
        const response = await Data.create({
            regionname
        });
        res.status(200).json({
            statuscode:200,
            success: true,
            data: response,
            message: "Region created successfully",
        });
    } catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json({
            statuscode:500,
            success: false,
            data: [],
            message: err.message,
        });
    }
};

exports.GetRegionData= async(req,res)=>{ 
    try{
        const RegionData= await Data.find({})
         //response 
  res.status(200).json(
    { statuscode:200,
        success:true,
        response:RegionData,
        message:"Entire Region data is Fetch"
    }
  )
    }
    catch(err){
    console.error(err)
    console.log(err)
    res.status(500).json(

        {  statuscode:200,
            success:false,
            data:[],
            message:err.message

        }
    )


}

}

exports.GetRegionDataBYID =async(req,res)=>{
    try{
        const id=req.params.id;
        const RegionDataid= await Data.findById({_id:id})
        if(!RegionDataid){
            return res.status(500).json(
                {   statuscode:200,
                    success:false,
                    messgae:"no data find ny given id"
                }
            )
        }
        //data for given id found
        res.status(200).json(
            {
                statuscode:200,
                success:true,
                data:RegionDataid,
                message:`RegionDataid ${id} data successfully get`
            }
        )


    }catch(err){
      console.error(err)
      console.log(err)
      res.status(500).json({
        statuscode:500,
        success:false,
        data:[],
        message:err.message
      })
    }
}
    

exports.RegionUpdate=async(req,res)=>{
    try{
        const {id}=req.params
        const {regionname}=req.body
        const regionupdate=await Data.findByIdAndUpdate(
            {_id:id},
            {regionname}
        )
        res.status(200).json({
            statuscode:200,
            success:true,
            data:regionupdate,
            message:"Updated Successfully "
        })
    }
    catch(err){

        console.error(err)
      console.log(err)
      res.status(500).json({
        statuscode:200,
        success:false,
        data:[],
        message:err.message
      })
    }
}

exports.RegionDelete=async(req,res)=>{
    try{
         const{id}=req.params
         await Data.findByIdAndDelete(id)
         res.status(200).json({
            statuscode:200,
            success:true,
            message:"Region Data deleted",
        })
    
    }catch(err){
        console.error(err)
        console.log(err)
        res.status(500).json({
          success:false,
          statuscode:200,
          data:[],
          message:err.message
        })
    }
    }

    