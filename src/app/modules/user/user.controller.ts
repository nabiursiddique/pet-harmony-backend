import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import config from '../../config';

const createUser = catchAsync(async (req, res) => {
  // Parsing req.body directly if it's already a JSON object
  const userPayload =
    typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

  // Constructing the payload with the profile image if it exists
  const result = await UserServices.createUserIntoDB({
    ...userPayload,
    profileImage: req.file?.path, // Adding the profile image to the payload
  });

  const { refreshToken, accessToken } = result;
  // setting refresh token into cookie
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: { accessToken, refreshToken },
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.FOUND,
    message: 'Users retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUsers,
};
