import TeamModel from "@/models/team.model";
import organizationModel from "../models/organization.model";
import TeamMembersModel from "../models/teamMembers.model"
import { ICreateTeam } from "../types/team.type";
import { Schema } from 'mongoose';
import { teamMembersLoader } from "@/graphql/dataLoader/teamMember";
import AuthService from "./auth.service";

const { Types } = Schema;
class TeamService {

    async createTeam(_: any, data: { body: ICreateTeam }) {
        try {
            const { organizationId, name } = data.body;

            const [orgExist, teamExist] = await Promise.all([
                organizationModel.exists({ _id: organizationId }),
                TeamModel.exists({ name: { $regex: new RegExp(`^${name}$`, 'i') } })
            ])

            if (!orgExist) {
                throw new Error("Organization doesn't exist")
            }

            if (teamExist) {
                throw new Error(`Team ${name} already exist`)
            }

            await TeamModel.create({ name, organization: organizationId });

            return "Team Created Successfully!"
        } catch (error) {
            throw new Error(error)
        }
    }


    async getTeamsByOrganization (_: any, data: {organizationId: string}) {
        try {
            const teams = await TeamModel.find({ organization: data.organizationId });

            const teamsWithMembers = await Promise.all(
                teams.map(async (team) => ({
                    ...team.toObject(),
                    teamMembers: await teamMembersLoader.load(team._id)
                }))
            );

            return teamsWithMembers;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getTeamById (_: any, data: {teamId: string}) {
        try {
            const team = await TeamModel.findOne({ _id: data.teamId }).populate("organization");
            return team;
        } catch (error) {
            throw new Error(error)
        }
    }

    async getTeamByInvitedToken(_: any, data: {token: string}) {
        try {
            const authService = new AuthService();
            const result: any = await authService.decodeToken(data.token);

            if (!result) {
                throw new Error("Invalid token!");
            }

            const teamData = await TeamModel.findOne({ _id: result.teamId }).populate("organization").lean();
            return {...teamData, email: result.email};

        } catch (error) {
            throw new Error(error)
        }
    }


}

export default TeamService;