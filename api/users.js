var log4js = require("log4js");
var logger = log4js.getLogger("SampleWebApp");
const user = require('./db/models/user');
const mongo = require('mongoose');
const md5 = require("md5");

const register = async (body)=> {
    return new Promise((resolve, reject) => {
        const db = "mongodb://localhost:27017/OrderManagement";
        mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
        .then(async () => {
            console.log("Database Connected!!");
            const newuser =  new user({
                companyName: body.companyName,
                employeeId: body.employeeId,
                password: md5(body.password)
            });
            newuser.save().then(item => resolve(item)).catch(err => reject(err));
        })
        .catch((error)=>{reject(error)});
    });
}

 const login = (body) => {
     return new Promise( async (resolve,reject) => {
        const db = "mongodb://localhost:27017/OrderManagement"
        mongo.connect(db,{useNewUrlParser:true, useCreateIndex: true, useFindAndModify: true, useUnifiedTopology: true })
        .then(async ()=>{
            console.log("Database Connected!!")
            const info = await user.findOne({employeeId: body.employeeId}).catch((error) => { reject(error) });
            if(!info){
                let response = {};
                response.message = "user does not exists";
                response.status = "failure";
                reject(response);
            }
           else{
               if(info.password === md5(body.password))
                    resolve(info);
               else{
                let response = {};
                response.message = "Passwords dont match";
                response.status = "failure";
                reject(response);
               }
           }
        })
        .catch((error)=>{
            console.log(error);
            reject(error);
        });
    });
 }

module.exports = {
    register: register,
    login: login
}