const mongoose = require ('mongoose')

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, 'title is required field']
    },
    desc:{
        type:String,
        required:[true, 'desc is required field']
            },
    price:{
        type:Number,
        required:[true, 'price is required field']
            },
    image:{
        type:String,
        required:[true, 'image is required filed'],
    }
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports=ProductModel