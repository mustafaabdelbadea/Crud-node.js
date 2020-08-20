const indexModel = require('../models/index.model')
const IndexRouter = require('express').Router()
IndexRouter.get('/', async (req, res) => {
    const data = await indexModel.find();
    // console.log(data);
    res.render('index', { data})
})
IndexRouter.post('/handleForm', async (req, res) => {
    const {title,desc} = req.body;
    const date=Date();
    // console.log(req.file)
    if(req.file==undefined){
       res.redirect('/');
    }
    else{
        await indexModel.insertMany({ title, imgURL: req.file.path,date,desc })
    }
     res.redirect('/');
})

IndexRouter.get('/readMore/:id',async(req,res)=>{
    const dataImg =await indexModel.findById({_id:req.params.id});
    
    res.render('readMore',{dataImg});
;})
IndexRouter.post('/edit-photo/:id',async(req,res)=>{
    if(req.file==undefined){
        await indexModel.findOneAndUpdate({_id:req.params.id},{ 
            title:req.body.title,
           desc:req.body.desc
        });
     }
     else{
    await indexModel.findOneAndUpdate({_id:req.params.id},{ 
        title:req.body.title,
        imgURL:req.file.path,
       desc:req.body.desc
    });
}
        res.redirect('/');
});
IndexRouter.get('/delete/:id',async(req,res)=>{
    let _id=req.params.id;
    await indexModel.findByIdAndDelete({_id});
     res.redirect('/');
})

IndexRouter.post('/search', async(req,res)=>{

    const searchData = await indexModel.find({title: { $regex:  req.body.searchTitle  , $options : 'i' } });
    res.render('searchPage',{searchData});
})
module.exports = IndexRouter;