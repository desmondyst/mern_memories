import mongoose from "mongoose";

// creating a mongoose schema

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    id: { type: String },
});

//creating a mongoose model
const User = mongoose.model("User", userSchema);

// exporting the model
export default User;
