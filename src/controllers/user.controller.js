import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
import { UploadOnCloudinary } from "../utils/Cloudinary.js";
import { User } from "../models/User.model.js";

const CretaeUser = asyncHandler(async (req, res) => {
  // console.log("Request Received")
  const { id, first_name, last_name, email, gender, domain, available } =
    req.body;
  console.log(first_name);
  if (!id || !first_name || !last_name || !email || !gender || !domain) {
    throw new ApiError(401, "Field is missing while Creating User");
  }

  const IsUserExist = await User.findOne({ $or: [{ email }, { id }] });
  if (IsUserExist) {
    throw new ApiError(400, "User Already Exist With This Email|Id");
  }

  const AvatarLocalFilePath = req.file?.path;
  console.log("This is Local File path:", AvatarLocalFilePath);
  if (!AvatarLocalFilePath) {
    throw new ApiError(403, "Local File path is not found");
  }

  const avatarfromCloud = await UploadOnCloudinary(AvatarLocalFilePath);

  if (!avatarfromCloud) {
    throw new ApiError(501, "Avatar is not uploaded on cloudinary");
  }

  const user = await User.create({
    id,
    first_name,
    last_name,
    email,
    gender,
    avatar: avatarfromCloud.url,
    domain,
    available,
  });

  if (!user) {
    throw new ApiError(500, "Something Went Wrong User Not Created");
  }
  console.log(user);

  return res
    .status(200)
    .json(new apiResponse(200, user, "user created Successfully"));
});

const GetUsrById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  if (!id) {
    throw new ApiError(401, " UserId is not found");
  }

  const user = await User.findOne({ id: id });
  if (!user) {
    throw new ApiError(400, "user NOT found with this Id");
  }
  //   console.log(user);

  return res.status(200).json(new apiResponse(200, user, "UserData Found"));
});

const UpdateUserById = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  console.log(_id);
  if (!_id) {
    throw new ApiError(401, "MongoUserId is not found");
  }
  const { id, first_name, last_name, email, gender, domain, available } =
    req.body;
  console.log(first_name);

  if (
    !id ||
    !first_name ||
    !last_name ||
    !email ||
    !gender ||
    !domain
  ) {
    throw new ApiError(401, "Field is missing while Updating User");
  }

  const user = await User.findByIdAndUpdate(
    _id,
    {
      $set: {
        id: id,
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        domain: domain,
        available: available.toLowerCase(),
      },
    },
    {
      new: true,
    }
  );

  if (!user) {
    throw new ApiError(400, "user NOT Updated with this Id");
  }
  console.log(user);

  return res
    .status(200)
    .json(new apiResponse(200, user, "UserData Updated Successfully"));
});

const DeleteUserById = asyncHandler(async (req, res) => {
  console.log("Request Received at Delete Function");
  const { _id } = req.params;
  console.log(_id);
  if (!_id) {
    throw new ApiError(401, "UserId not found");
  }

  await User.findByIdAndDelete(_id);

  return res
    .status(200)
    .json(new apiResponse(200, "User Deleted Successfully"));
});

const FindAllUsers = asyncHandler(async (req, res) => {
  try {
    console.log("Request Received");
    const {
      page = 1,
      first_name = "",
      domain = "",
      gender = "",
      available = true,
    } = req.query;

    console.log("Current Data is :", page, first_name);
    const limit = 20;
    const skip = (page - 1) * limit;

    let query = {};

    if (first_name.trim() !== "") {
      query.first_name = { $regex: new RegExp(first_name.trim(), "i") }; // by using this we can search on the basis of this field in db
    }
    if (domain.trim() !== "") {
      query.domain = domain;
    }
    if (gender.trim() !== "") {
      query.gender = gender;
    }
    query.available = available;

    const users = await User.find(query).skip(skip).limit(limit);
    // console.log(users);

    return res
      .status(200)
      .json(new apiResponse(200, users, "All users Fetched Successfully"));
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export { CretaeUser, GetUsrById, UpdateUserById, DeleteUserById, FindAllUsers };
