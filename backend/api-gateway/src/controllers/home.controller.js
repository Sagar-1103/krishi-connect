
const home = async(req,res)=>{
    try {
        res.status(200).json({"API Gateway Status":"Connected"});
    } catch (error) {
        console.log("Error : ",error);
    }
}

export {home};