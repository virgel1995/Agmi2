const mongoose =  require("mongoose")

const uri = process.env.MONGODB_URI
const intiMongoose = () => {
mongoose.set('strictQuery', false);
mongoose
  .connect(uri)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

}
module.exports = intiMongoose