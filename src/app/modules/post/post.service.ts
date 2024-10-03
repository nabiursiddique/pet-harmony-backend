import { Request } from 'express';
import { Post } from './post.model';

//* create post into db
const createPostIntoDB = async (req: Request) => {
  const user = req.user;
  const path = req.file ? req.file.path : null;
  const { title, category, isPremium, content } = req.body;
  const postData = {
    author: user.name,
    authorId: user._id,
    authorProfileImage: user.profileImage,
    authorEmail: user.email,
    title,
    category,
    isPremium,
    content,
    PostImage: path,
  };
  const post = await Post.create(postData);
  return post;
};

//* Get all posts
const getAllPostsFromDB = async () => {
  const result = await Post.find();
  return result;
};

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
};
