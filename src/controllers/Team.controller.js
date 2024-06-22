import { Team } from "../models/Teams.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiErrors.js";
import { User } from "../models/User.model.js";

const CreateTeam = asyncHandler(async (req, res) => {
  console.log("Request Received at Create Team function");
  const { Team_name, Team_Id } = req.body;
  console.log("Team Data-", Team_name, Team_Id);
  if (!Team_name || !Team_Id) {
    throw new ApiError(400, "Teamname | TeamId not Found");
  }

  const IsTeamExist = await Team.findOne({
    $or: [{ Team_name }, { Team_Id }],
  });
  if (IsTeamExist) {
    throw new ApiError(400, "Team Already Exist");
  }

  const team = await Team.create({
    Team_name,
    Team_Id,
  });

  if (!team) {
    throw new ApiError(500, "Something Went Wrong Team Not Created");
  }

  return res
    .status(200)
    .json(new apiResponse(200, team, "Team created Successfully"));
});

const AddMember = asyncHandler(async (req, res) => {
  const { Team_name, Team_Id } = req.body;
  const { UserId } = req.params;
  console.log(UserId, Team_name, Team_Id);
  if (!UserId || !Team_name || !Team_Id) {
    throw new ApiError(401, "User | Team name | Team Id not found");
  }

  const team = await Team.findOne({ $or: [{ Team_name }, { Team_Id }] });
  if (!team) {
    return new apiResponse(
      402,
      {},
      "Team With Given Team name And Team id not found"
    );
  }

  const user = await User.findById(UserId);

  team.Team_mambers.push(user._id);
  await team.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new apiResponse(200, team, "Member Added Successfully"));
});

const FindAllTeams = asyncHandler(async (req, res) => {
  console.log("Request Received at Find All Teams");

  const teams = await Team.find();

  return res
    .status(200)
    .json(new apiResponse(200, teams, "All Teams Fetched Successfully"));
});

const FindTeamDetails = asyncHandler(async (req, res) => {
  const { TeamId } = req.params;
  console.log(TeamId);
  if (!TeamId) {
    throw new ApiError(401, "Team ID not found");
  }

  const team = await Team.findById(TeamId).populate("Team_mambers");

  if (!team) {
    throw new ApiError(400, "Team not Found");
  }

  console.log(team);

  return res
    .status(200)
    .json(new apiResponse(200, team, "Team Data Fetched Successfully"));
});

export { CreateTeam, AddMember, FindAllTeams, FindTeamDetails };
