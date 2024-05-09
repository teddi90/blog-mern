import PostModel from "../models/Post.js";

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get posts'
        })
    }
}

export const getPost = (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findByIdAndUpdate(
            {
                _id: postId,
            },
            {
                $inc: { viewsCount: 1 },
            },
            {
                returnDocument: "after",
            }
        )
            .then((post) => { res.json(post) })
            .catch(err => {
                console.log(err);
                res.status(500).json({
                    message: 'Cannot get post'
                })
            });


    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get post'
        })
    }
}

export const removePost = (req, res) => {
    try {
        const postId = req.params.id;

        PostModel.findOneAndDelete({ _id: postId })
            .then(() => res.json({ success: true }))
            .catch((err) => res.status(500).json({ message: err.message }));

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot get post'
        })
    }
}

export const createPost = async (req, res) => {
    try {
        const doc = new PostModel({
            title: req.body.title,
            text: req.body.text,
            imageUrl: req.body.imageUrl,
            tags: req.body.tags,
            user: req.userId,
        });
        const post = await doc.save();

        res.json(post)
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot create post'
        })
    }
}

export const updatePost = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, text, imageUrl, tags } = req.body;

        await PostModel.updateOne(
            { _id: postId },
            { title, text, imageUrl, tags },
        );

        res.json({ success: true });

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Cannot update post'
        })
    }
}
