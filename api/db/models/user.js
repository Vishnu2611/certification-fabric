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
    }
});

module.exports = mongo.model('users',UserSchema);