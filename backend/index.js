const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const userRoute= require("./routes/users")
const adminRoute= require("./routes/admin")
const postRoute= require("./routes/posts");
const multer = require("multer");
const path = require("path");

dotenv.config();

const app = express();

//---------database connection----------
// mongoose.connect("mongodb+srv://akhilkdm:akhilkdm@cluster0.anvku5c.mongodb.net/social?retryWrites=true&w=majority",()=>{
//     console.log("connected to Mongo Db");
// });

mongoose.connect(process.env.MONGO_URI,()=>{
    console.log("connected to Mongo Db");
});


app.use("/images",express.static(path.join(__dirname,"public/images")));

//-----middleware-----
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"public/images");
  },
  filename:(req,file,cb)=>{
    cb(null,req.body.name);
    console.log("req.body",req.body);
  }
})

const upload = multer({storage});
app.post("/api/upload",upload.single("file"),(req,res)=>{
  try{
    return res.status(200).json("File uploaded successfully")
  }catch(err){
    console.log("err",err);
  }
})

app.use("/api/users",userRoute);
app.use("/api/admin",adminRoute);
app.use("/api/posts",postRoute);



// app.get("*",(req,res)=>{
//   res.render("404",{title:"404 page"})
// })

// app.use(function(req,res,next){
//   next(createError(404));
// })


// app.use((error,req,res,next)=>{
//   res.status(err.status || 500);
//   res.json({
//     error:{
//       message:error.message
//     }  
//   })
// })


//------port----------
app.listen(8800, () => {
  console.log("Running");
});


