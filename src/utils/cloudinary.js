const cloudinary = require('cloudinary').v2;
const fs =require("fs")
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


const uploadoncloud= async function (localfilepath){
try{

if(!localfilepath){return null}
else{
// uplod on clouudinary
const response = await cloudinary.uploader.upload(localfilepath,{
    resource_type:"auto"
})
console.log("File uploaded on cloudinary", response.url)
return response;
}

}
catch(error){
fs.unlinkSync(localfilepath)
return null;
}
}





module.exports = {cloudinary,uploadoncloud};