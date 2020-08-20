const express=require('express');
const app=express();
const bodyParser=require('body-parser').urlencoded({extended:false})
const path=require('path');
const mongoose=require('mongoose');

app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'assets')));
app.use('/images',express.static(path.join(__dirname,'images')));
app.use(bodyParser);

const IndexRouter=require('./routes/index.routes');
const multer = require('multer');
var storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname)
    }
})
function fileFilter (req, file, cb) {
 
    if (file.mimetype==="image/png" ||file.mimetype==="image/jpg"||file.mimetype==="image/jpeg"){
        cb(null, true)
    }
    
   else{
    cb(null, false)
   }
   
  }

app.use(multer({dest:'images',storage,fileFilter}).single('img'));
app.use(IndexRouter);
mongoose.connect("mongodb://localhost:27017/uploadDB", { useNewUrlParser: true , useUnifiedTopology: true });
app.listen(process.env.PORT||3000,()=>{
    console.log('server is running now......')
})