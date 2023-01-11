const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();


//to use local files such as images and all
//put static files in this folder
app.use(express.static("public"));
//use body parser
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
    
});




app.post("/", function(req,res){
     
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {   //key (api docs) : value(which we have declared)
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
    
            }
        ]
    };

    const jsonData =JSON.stringify(data);

    const listId = "5bff730c27";
    const apiKey = "55d7a38c1139c9660a778169f51909ae-us21";

    const url = "https://us21.api.mailchimp.com/3.0/lists/"+listId;

    const options = {
        method: "POST",
        auth: "ananya:"+apiKey
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            //res.sendFile(__dirname+ "html file");
            res.send("Successfully subscribed");
        }else{
            //res.sendFile(__dirname+ "html file");
            res.send("Error in signing up");
        }
        response.on("data",function(data){

            console.log(JSON.parse(data));
        });
    });

    //sending data to mailchimp server
    request.write(jsonData);
    //to say we are done
    request.end();
});


//for failure page try again button
/*
app.post("/failure",function(req,res){
    res.redirect("/");
})
*/


app.listen(3000,function(){
    console.log("Listening on port 3000");
});