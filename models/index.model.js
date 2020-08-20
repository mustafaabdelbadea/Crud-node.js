const mongosse=require('mongoose')
const indexSchema=new mongosse.Schema({
    title:String,
    imgURL:String,
    date:String,
    desc:String
})
const indexModel=mongosse.model('product',indexSchema)
module.exports=indexModel