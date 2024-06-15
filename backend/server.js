//import the express module
const exp=require('express')
//create the express application
const app=exp()
//import the dotenv
require('dotenv').config() //process.env

let port=process.env.PORT || 5000
//import cors
const cors=require('cors')


app.use(cors({
    origin:"http://localhost:4000",
    methods:"GET,POST,PUT,DELETE",
    credentials:true
}))


//import the userapp 
let UserApp=require('./APIs/UserApi.js')
//import the AuthorApp 
let AuthorApp=require('./APIs/AuthorApi.js')
//import the userapp 
let AdminApp=require('./APIs/AdminApi.js')
//body parser middleware
app.use(exp.json())

//import the 'path' core module
let path=require('path')

//deploy react build in this server
app.use(exp.static(path.join(__dirname,'../blog_appclient/build')))

//import the mongodb
const mc=require('mongodb').MongoClient
//connect the client with the port number
mc.connect(process.env.DB_URL)
.then(client=>{
    //get the db object
    let dbObj=client.db('blogdb')

    //get the usercollection object
    let usercollectionObj=dbObj.collection('usercollection')
    //set the usercollection object to app
    app.set('usercollectionObj',usercollectionObj)

    //get the authorcollection object
    let authorcollectionObj=dbObj.collection('authorcollection')
    //set the authorcollection object to app
    app.set('authorcollectionObj',authorcollectionObj)

    //get the articlecollectionObj
    let articlecollectionObj=dbObj.collection('articlecollection')
    //set the articles collection Object to app
    app.set('articlecollectionObj',articlecollectionObj)

    //status of the DB 
    console.log("DB is connected")
})
.catch(err=>{
    console.log("DB is not connected",err.message)
})

//create the respective middlewares
app.use('/user-api',UserApp)
app.use('/author-api',AuthorApp)
app.use('/admin-api',AdminApp)

//Refreshing the components does not create an error
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../blog_appclient/build/index.html'))
})

//sychronous error handling
app.use((err,req,res,next)=>{
    res.send({erroremessage:err.message})
})


//assign the port number to the server
app.listen(port,()=>{console.log(`Http server is running in  ${port}`)})