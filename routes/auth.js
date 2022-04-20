const router = require ("express").Router();
const User = require("../models/User");
var CryptoJS = require("crypto-js");

//Registration

router.post("/register", async (req,res)=>{
    const ciphertext = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : ciphertext,
    });
try{

const savedUser = await newUser.save();
res.status(201).json(savedUser);

}catch (err){
    res.status(500).json(err);
}

});

router.post("/login", async (req, res)=> {

    
    try{   
    const user = await User.findOne({ username : req.body.username });

        !user && res.status(401).json("wrong credentials!");
        const originalText = CryptoJS.AES.decrypt(
            User.password,
            process.env.PASS_SEC
            );
        const originalpassword = originalText.toString(CryptoJS.enc.Utf8)
        originalpassword !== req.body.password && res.status(401).json("wrong credentials!");

        const {password,...others}= user._doc;

        res.status(200).json(others);
            
} catch (err){
    res.status(500).json(err);
}
});

module.exports = router;