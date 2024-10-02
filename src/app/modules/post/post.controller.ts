import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PostServices } from './post.service';

//* Create post into db
const createPost = catchAsync(async (req, res) => {
  const result = await PostServices.createPostIntoDB(req);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Post Created successfully',
    data: result,
  });
});

export const PostControllers = {
  createPost,
};
