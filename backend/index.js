const port=4000
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const cors=require('cors')
const multer=require('multer')
const path=require('path')
const { log } = require('console')

//whatever res we get, will be automatically passed thro json
//Client ends data in json, express server cant process as such, 
//this acts as a translator.
app.use(express.json())
app.use(cors())

//DB connection
mongoose.connect(
  "mongodb+srv://aasikasivaguru:PXcg6Bl55sTaS1j0@cluster0.9jksyn4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
);

//API creation
app.get('/',(req,res)=>{
    res.send("Hello, express app runs fine")
})

//Image storage in uploads folder
const storage=multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb)=>{
        cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload= multer({storage:storage})

//Creating upload endpoint

//We'll get the images folder in the /image endpoint
// <input type="file" name="product" /> ip comes from here
app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

//Schema for products
const Product=mongoose.model('Product',{
    id:{
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    new_price:{
        type:Number,
        required:true
    },
    old_price:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    available:{
        type:Boolean,
        default:true
    }
    
})

//User schema
const User=mongoose.model('User',{
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now
    } 
})

//Creating api for registering user
app.post('/signup',async (req,res)=>{
    const check=await User.findOne({name:req.body.name})
    if(check){
        return res.status(400).json({
            success:false,
            message:"User already exists"
        })
    }

    let cart={}
    for(let i=0;i<300;i++) cart[i]=0;
    const user=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save()

    const data={
        user:{
            id:user.id
        }
    }

    const token= jwt.sign(data,'secret_ecom')
    res.send({
        success:true,
        token:token
    })
    
})

//Creating api for login
app.post('/login',async (req,res)=>{
    const user=await User.findOne({email:req.body.email})
    if(user){
    if(user.password==req.body.password){
        const data={
            user:{
                id:user.id
            }
        }
        const token=jwt.sign(data,'secret_ecom')
        res.send({
            success:true,
            token:token
        })
    }
    else res.json({
        success:false,
        message:"Invalid credentials"
    })
    }else{
        res.json({
            success:false,
            message:"Email id doesn't exist"
        })
    }
})

//add product
app.post('/addproduct',async (req,res)=>{
    let products=await Product.find({})
    let id;

    if(products.length>0){
        let last_product=products[products.length-1]
        id=last_product.id+1
    }
    else id=1
    
    const product=new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price
    })
    console.log(product)
    await product.save()
    console.log("product saved in db")
    res.json({
        success:true,
        name:product.name,
        image:product.image,
    })
})

//delete product
app.post('/removeproduct',async (req,res)=>{
    let id=req.body.id
    try{
        await Product.findOneAndDelete({id:id})
        res.json({
            success:true,
            message:"Successfully deleted"
        })
    }
    catch(err){
        res.json({
            success:false,
            message:err
        })
    }

})

//Get all products
app.get('/allproducts',async (req,res)=>{
    try{
        let products=await Product.find({})
        res.send(products)
    }
    catch(err){
        res.json({
            success:false,
            message:err
        })
    }  
})

//for new collection data
app.get('/newcollections',async (req,res)=>{
    let products=await Product.find({})
    //To choose the latest 8 products
    let val=(products.length<8)?products.length:8 //or math.min(prod.len,8)
    let newcoll=products.slice(1).slice(-val)
    console.log("New collection fetched")
    res.send(newcoll)
})

//for popular in woman
app.get('/popularwoman',async (req,res)=>{
    let products=await Product.find({category:"women"})
    let popWoman=products.slice(0,4)
    res.send(popWoman);
})

//creating middleware to fetch user using token
const fetchUser=async (req,res,next)=>{
    const token=req.header('auth-token')
    if(!token){
        res.status(401).send({errors:"Please authenticate using a valid token"})
    }
    else{
        try{
            //To decode the token
            const data=jwt.verify(token,'secret_ecom')
            req.user=data.user
            next();
        }catch(e){
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}

//for adding item to cart
app.post('/addtocart',fetchUser,async (req,res)=>{
    let userData= await User.findOne({_id:req.user.id})
    userData.cartData[req.body.id]+=1
    await User.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.json({
        success:true,
        message:"Item added to cart"
    })
    console.log("Item added to cart!")
})

//for removing from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.id]>0) userData.cartData[req.body.id] -= 1;
  await User.findOneAndUpdate(
    { _id: req.user.id },
    { cartData: userData.cartData }
  );
  res.json({
    success: true,
    message: "Item removed from cart",
  });
  console.log("Item removed from cart!");
});

//Get cartdata
app.post('/getcartdata',fetchUser,async (req,res)=>{
    let userData=await User.findOne({_id:req.user.id})
    res.send(userData.cartData)
    console.log("Cart data logged",userData.cartData)
})


app.listen(port,(err)=>{
    if(err) console.log(err)
    else console.log("Listening on port 4000")
})
