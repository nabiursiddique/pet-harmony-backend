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
    image: path,
  };
  const post = await Post.create(postData);
  return post;
};

//* Get all posts
const getAllPostsFromDB = async () => {
  const result = await Post.find();
  return result;
};

//* upvote post
// const upvotePostIntoDB = async (req: Request) => {
//   const { postId } = req.body;
//   const userId = req.user._id;

//   const post = await Post.findById(postId);
//   if (!post) {
//     throw new Error('Post not found');
//   }

//   const existingVote = post.voters.find(
//     (voter) => voter.userId.toString() === userId.toString(),
//   );

//   if (existingVote) {
//     if (existingVote.voteType === 'up') {
//       return post;
//     } else if (existingVote.voteType === 'down') {
//       post.downVotes -= 1;
//       post.upVotes += 1;
//       existingVote.voteType = 'up';
//     }
//   } else {
//     // New upvote
//     post.upVotes += 1;
//     post.voters.push({ userId, voteType: 'up' });
//   }

//   await post.save();
//   return post;
// };

export const PostServices = {
  createPostIntoDB,
  getAllPostsFromDB,
};
