const mongoose = require ("mongoose")
const { boolean } = require("webidl-conversions")

const productSchema = new mongoose.Schema({
    title : { type: String , required:true, unique:true},
    desc: {type: String , required : true , unique : true },
    img : {type : String , required : true},
    categories : {type : String , required : true},
    size : {type : String , required : true},
    color : {type : String , required : true},
    price : {type : String , required : true},
    
    isAdmin :{
        type : boolean,
        default: false,
    },
    
},{timestamps :true}
);
module.exports = mongoose.model("User", productSchema);
