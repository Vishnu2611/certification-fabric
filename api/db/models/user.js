const validator = require('validator');
const mongo = require('mongoose');

const Schema = mongo.Schema;

const UserSchema = new Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
        validate(value){
            if(!validator.isAlpha(value))
                throw new Error("Company name is Invalid");
        }
    },
    employeeId:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            if(value.includes("password"))
                throw new Error("Password contains Password!!!!");
        }
    },
    role:{
        type:String,
        required:true
    }
});
const CertSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    provider: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = mongo.model('users',UserSchema);