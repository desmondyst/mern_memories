// our mongoose model
import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

const PAGELIMIT = 8;

export const getPosts = async (req, res) => {
    const { page } = req.query;

    console.log(page);
    // page is string when in url
    const startIndex = (Number(page) - 1) * PAGELIMIT;
    console.log(startIndex);

    try {
        // https://www.mongodb.com/docs/manual/reference/method/db.collection.countDocuments/#db-collection-countdocuments
        const numberOfPages = await PostMessage.countDocuments({});
        const posts = await PostMessage.find()
            // The limit() method limits the number of documents in the result set.
            //limit() corresponds to the LIMIT statement in SQL
            .sort({ _id: -1 })
            // The skip() method controls the starting point of the results set. The following operation skips the first 5 documents in the bios collection and returns all remaining documents:
            .limit(PAGELIMIT)
            .skip(startIndex);

        res.status(200).json({
            data: posts,
            numberOfPages: Math.ceil(numberOfPages / PAGELIMIT),
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
    }
};

export const getPostsBySearch = async (req, res) => {
    // req.query is to get the param in express.js
    const { searchQuery, tags } = req.query;

    try {
        // coonvert title into regular expression for easier db query
        // i stands for ignore case
        const title = new RegExp(searchQuery, "i");

        /**
        { title }: This condition checks if the "title" field in the documents matches the provided value. It's a shorthand for { title: title }.
        { tags: { $in: tags.split(",") } }: This condition checks if the "tags" field in the documents contains at least one element that matches any of the tags provided in the tags array (after splitting the string by commas).
         */

        const postMessages = await PostMessage.find({
            $or: [{ title }, { tags: { $in: tags.split(",") } }],
        });

        res.json(postMessages);
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error });
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
        console.log(error);
        res.status(409).json({ message: error });
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

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send("No post with that id");
        }

        await PostMessage.findByIdAndDelete(id);

        res.json({ message: "Post deleted successfully" });
    } catch (error) {
        console.log(error);
    }
};

export const likePost = async (req, res) => {
    // this is the post id
    const { id: _id } = req.params;

    // check if the user is authenticated
    // where is req.userId is populated by the middlewhere
    if (!req.userId) {
        return res.json({ message: "Unauthenticated" });
    }

    try {
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

            post.likes = post.likes.filter((id) => id !== String(req.userId));
        }

        const updatedPost = await PostMessage.findByIdAndUpdate(
            _id,
            // post that contain updated like
            post,
            { new: true }
        );

        res.json(updatedPost);
    } catch (error) {
        console.log(error);
    }
};
