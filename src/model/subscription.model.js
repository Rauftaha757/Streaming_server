const mongoose=require('mongoose')
const SubscriptionSchema =new mongoose.Schema({

subscriber:

    {
type:mongoose.Schema.Types.ObjectId,
ref:"Users"
    }
,
channel:
{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Users"
}


},{timestamps:true});


const subscriptionModel=mongoose.model("Subscription",SubscriptionSchema);
module.exports=subscriptionModel;