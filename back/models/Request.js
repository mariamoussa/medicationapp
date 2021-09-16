const {Schema,model} = require("mongoose");

const requestSchema= new Schema({
    date:Date,
    description:String,
    status:{
        type: String,
        required: true,
        default: 'Waiting'
    },
    _post:{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    _user:{
        type:Schema.Types.ObjectId,
        ref: 'User'
    }
});

const Request= model('Request', requestSchema);
module.exports=Request;