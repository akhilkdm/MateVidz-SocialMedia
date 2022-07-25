const Post = require("../models/Post");
const User = require("../models/User");

//create post
const createPost = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

//edit post
const editPost = async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.postId });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update post
const updatePost = async (req, res) => {
  const { desc, postId } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      postId,
      {
        desc: desc,
      },
      {
        new: true,
      }
    );
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete post
const deletePost = async (req, res) => {
  console.log("paramsId", req.params.id);
  try {
    const post = await Post.findById(req.params.id);
    await post.deleteOne();
    res.status(200).json("Post Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

//like & dislike a post
const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("This post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("this post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//get a post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get timeline posts
const timelinePost = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.following.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    res.status(500).json(err);
  }
};

//get user posts
const userPost = async (req, res) => {
  try {
    // console.log("params",req.params.userId)
    // const user = await User.findOne({ username: req.params.username });
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};

//comment post
const comm = async (req, res) => {
  console.log("body", req.body);

  const { ...comment } = req.body;

  console.log("text", comment);
  await Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  )
    .populate("comments.postedBy", "_id username")
    .populate("postedBy", "_id username")
    .exec((err, result) => {
      if (err) {
        return res.status(422).json({ error: err });
      } else {
        res.json(result);
      }
    });
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPost,
  timelinePost,
  userPost,
  comm,
  editPost,
};
