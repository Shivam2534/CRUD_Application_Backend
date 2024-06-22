import { Router } from "express";
import { CreateTeam, AddMember, FindAllTeams, FindTeamDetails } from "../controllers/Team.controller.js";

const router = Router();

router.route("/team").post(CreateTeam);
router.route("/addmember/:UserId").post(AddMember);
router.route("/AllTeams").get(FindAllTeams);
router.route("/SingleTeam/:TeamId").get(FindTeamDetails);

export default router;
