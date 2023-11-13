import mongoose from "mongoose";

// creating a mongoose schema
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount: {
        // array of strings, which are the ids
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
});

//creating a mongoose model
const PostMessage = mongoose.model("PostMessage", postSchema);

// exporting the model
export default PostMessage;
