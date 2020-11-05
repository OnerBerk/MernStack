const Job = require ('../models/modelJobs.js')

//Get all Jobs => /api/v1/jobs
exports.getJobs =async (req,res, next)=>{
    const jobs =await Job.find();
    res.status(200).json({
        success:true,
        results:jobs.length,
        data:jobs
    })
}

//create a new job
exports.newJob = async (req,res,next)=>{
    const job = await Job.create(req.body);
    res.status(200).json({
        success:true,
        message:'job Created',
        data : job
    }) 
}