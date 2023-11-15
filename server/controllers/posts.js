// our mongoose model
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
    try {
        const postMessage = await PostMessage.find();

        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    const newPost = new PostMessage({
        ...post,
        creator: req.userId,
        createdAt: new Date().toISOString(),
    });
    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id");
    }

    // this post is from the form, dont have id with it
    const post = req.body;

    // When new: true is set, it instructs Mongoose to return the modified document after the update operation has been applied. In other words, it will give you the updated version of the document.
    // If you omit new or set it to false (the default behavior), findByIdAndUpdate will return the document as it was before the update operation.

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(
            _id,
            { ...post, _id },
            {
                new: true,
            }
        );
        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).send("No post with that id");
    }

    await PostMessage.findByIdAndDelete(id);

    res.json({ message: "Post deleted successfully" });
};

export const likePost = async (req, res) => {
    // this is the post id
    const { id: _id } = req.params;

    // check if the user is authenticated
    // where is req.userId is populated by the middlewhere
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post with that id");
    }

    const post = await PostMessage.findById(_id);

    // check if user already liked the post
    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        // like the post
        post.likes.push(req.userId);
    } else {
        // dislike a post
        post.likes.filter((id) => id !== req.userId);
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
        _id,
        // post that contain updated like
        post,
        { new: true }
    );

    res.json(updatedPost);
};
