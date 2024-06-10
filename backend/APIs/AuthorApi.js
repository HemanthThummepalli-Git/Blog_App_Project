//import the express module 
const exp=require('express')

//create the mini application
const AuthorApp=exp.Router()

//import the bcrypt
const bcryptjs=require('bcryptjs')

//import jsonwebtoken
const jsonwebtoken=require('jsonwebtoken')

//import the express-async-handler
const expressAsyncHandler=require('express-async-handler')

//import the verifytoken
const verifyToken=require('../Middlewares/verifyToken')

let authorcollectionObj,articlecollectionObj
//get the usercollection object to global
AuthorApp.use((req,res,next)=>{
    authorcollectionObj=req.app.get('authorcollectionObj')
    articlecollectionObj=req.app.get('articlecollectionObj')
    next()
})

//create the routes

//Registration 
AuthorApp.post('/new-user',expressAsyncHandler(async (req,res)=>{
    //get the data form the request
    let newuser=req.body
    //check the user is dublicate or not
    let dbuser=await authorcollectionObj.findOne({username:newuser.username})
    if(dbuser!=null){
        res.send({message:"Username is already taken"})
    }else{
        //hash the password
        let hashedpw=await bcryptjs.hash(newuser.password,6)
        //replace the password
        newuser.password=hashedpw
        //insert the obj into db
        await authorcollectionObj.insertOne(newuser)
        //status of the creation
        res.send({message:"Author is created"})
    }
}))

//Login
AuthorApp.post('/login',expressAsyncHandler(async (req,res)=>{
    //get the body
    let usercred=req.body
    //verify the username
    let dbuser=await authorcollectionObj.findOne({username:usercred.username})
    if(dbuser==null){
        res.send({message:"Invalid username"})
    }else{
        //compare the password
        let status=await bcryptjs.compare(usercred.password,dbuser.password)
        if(status==false){
            res.send({message:"Invalid password"})
        }else{
            //create the JWT token
            let signedToken=jsonwebtoken.sign({username:dbuser.username},process.env.JWT_SECRET_KEY,{expiresIn:'1d'})
            //send the JWT token
            res.send({message:"Login success",token:signedToken,user:dbuser})
        }
    }
}))

//add new article
AuthorApp.post('/articles',verifyToken,expressAsyncHandler(async (req,res)=>{
    //get the body 
    let newarticle=req.body
    //post it into articlecollectionObj
    await articlecollectionObj.insertOne(newarticle)
    //send the status
    res.send({message:"New article is created"})
}))

//view articles of respective author
AuthorApp.get('/articles/:authorname',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get the authorname
    let authornameUrl=req.params.authorname
    //get all the articles of author and status as true
    let allarticles=await articlecollectionObj.find({username:authornameUrl}).toArray()
    if(allarticles==null)
    res.send({message:"No Articles"})
    else
    res.send({message:"All articles of the author",payload:allarticles})
}))

//update the article
AuthorApp.put('/articles',verifyToken,expressAsyncHandler(async (req,res)=>{
    //get the body
    let modifiedarticle=req.body
    //update the article in the database
    await articlecollectionObj.updateOne({username:modifiedarticle.username},{$set:{...modifiedarticle}})

    let latestArticle=await articlecollectionObj.findOne({username:modifiedarticle.username})
    //send the response
    res.send({message:"Article is updated",payload:latestArticle})
}))

//delete the article 
AuthorApp.put('/articles/:articleid',verifyToken,expressAsyncHandler(async (req,res)=>{
    //get the articleid
    let urlarticleid=(+req.params.articleid)
    //get the body
    let deletedarticle=req.body

    if(deletedarticle.status==true){
        let modifedArt=await articlecollectionObj.findOneAndUpdate({articleId:urlarticleid},{$set:{...deletedarticle,status:false}},{returnDocument:'after'})
        res.send({message:"Article is Deleted",payload:modifedArt.status})
    }
    if(deletedarticle.status==false){
        let modifedArt=await articlecollectionObj.findOneAndUpdate({articleId:urlarticleid},{$set:{...deletedarticle,status:true}},{returnDocument:'after'})
        res.send({message:"Article is Restored",payload:modifedArt.status})
    }
}))

//get all authors
AuthorApp.get('/authors',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get all authors list from articleCollectionObj
    let allAuthors=await authorcollectionObj.find({}).toArray()
    res.send({message:"All authors",payload:allAuthors})
}))


//update the author for followers
AuthorApp.post('/authors/:authorUsername', verifyToken, expressAsyncHandler(async (req, res) => {
   
        let urlauthorUsername = req.params.authorUsername;
        // Get the new follower from the request body
        let follower = req.body;
        // Find the author document
        const author = await authorcollectionObj.findOne({ username: urlauthorUsername });
        // Copy the followers array
        let followerList = [...author.followers];
        // Remove the existing follower with the same username
        followerList = followerList.filter(existingFollower => existingFollower.username !== follower.username);
        // Add the new follower to the list
        followerList.push(follower);
        // Update the author document with the new followers list
        await authorcollectionObj.updateOne({ username: urlauthorUsername }, { $set: { followers: followerList } });
        // Fetch the modified author document
        let modifiedAuthor = await authorcollectionObj.findOne({ username: urlauthorUsername });

        res.send({ message: "Followers are updated", payload: modifiedAuthor });
    
}));


module.exports=AuthorApp