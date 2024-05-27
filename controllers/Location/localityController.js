const { json } = require("body-parser");
const Data = require("../../modals/LocationModal/locality")
const Region =require("../../modals/LocationModal/region");
const Country =require("../../modals/LocationModal/country");
const State =require("../../modals/LocationModal/state");
const City =require("../../modals/LocationModal/city");

exports.CreateLocality = async (req, res) => {
    try {
        const { localityname, cityId, stateId, countryId, regionId } = req.body;

        // Validate that the city exists
        const city = await City.findById(cityId);
        if (!city) {
            return res.status(500).json({
                statuscode: 500,
                success: false,
                message: 'City not found'
            });
        }

        // Validate that the state exists
        const state = await State.findById(stateId);
        if (!state) {
            return res.status(500).json({
                statuscode: 500,
                success: false,
                message: 'State not found'
            });
        }

        // Validate that the country exists
        const country = await Country.findById(countryId);
        if (!country) {
            return res.status(500).json({
                statuscode: 500,
                success: false,
                message: 'Country not found'
            });
        }

        // Validate that the region exists
        const region = await Region.findById(regionId);
        if (!region) {
            return res.status(500).json({
                statuscode: 500,
                success: false,
                message: 'Region not found'
            });
        }

        // Create and save the locality
        const locality = new Data({
            localityname,
            city: cityId,
            state: stateId,
            country: countryId,
            region: regionId,
        });
        const savedLocality = await locality.save();

        res.status(200).json({
            statuscode: 200,
            success: true,
            data: savedLocality,
            message: 'Locality created successfully',
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({
            statuscode: 500,
            success: false,
            data: [],
            message: err.message,
        });
    }
};

exports.GetlocalityData= async(req,res)=>{ 
    try{
        const LocalityData= await Data.find({}) .populate("region")
        .populate({
          path: "country",
        })
        .populate({
          path: "state",
        })
        .populate({
            path: "city",
          });
         //response 
  res.status(200).json(

    {    statuscode:200,
        success:true,
        response:LocalityData,
        message:"Entire Locality data is Fetch"
    }
  )
    }
    catch(err){
    console.error(err)
    console.log(err)
    res.status(500).json(

        {statuscode:500,
            success:false,
            data:[],
            message:err.message

        }
    )


}

}

exports.GetlocalityDataBYID =async(req,res)=>{
    try{
        const id=req.params.id;
        const localitydataid= await Data.findById({_id:id}).populate("region")
        .populate({
          path: "country",
        })
        .populate({
          path: "state",
        })
        .populate({
            path: "city",
          });
        if(!localitydataid){
            return res.status(500).json(
                {   statuscode:500,
                    success:false,
                    messgae:[]
                }
            )
        }
        //data for given id found
        res.status(200).json(
            {
                success:true,
                data:localitydataid,
                message:`localitydataid ${id} data successfully get`
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
  
exports.LocalityUpdate=async(req,res)=>{
    try{
        const {id}=req.params
        const {localityname}=req.body
        const localityupdate=await Data.findByIdAndUpdate(
            {_id:id},
            {localityname}
        )
        res.status(200).json({
            statuscode:200,
            success:true,
            data:localityupdate,
            message:"Updated Successfully "
        })
    }
    catch(err){

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

exports.LocalityDelete=async(req,res)=>{
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
            statuscode:500,
          success:false,
          data:[],
          message:err.message
        })
    }
    }