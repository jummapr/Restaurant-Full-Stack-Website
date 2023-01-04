const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    customerID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    items : {
        type : Object,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    paymentType : { 
        type: String,
        default: 'COD'
    },
    status : { 
        type: String,
        default: 'ORDER_PLACED',
    }
}, { timestamps: true });

const Menu = mongoose.model("order", OrderSchema);

module.exports = Menu;
