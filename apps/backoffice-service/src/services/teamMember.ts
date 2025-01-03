import TeamMembersModel from "@/models/teamMembers.model";
import { IInviteTeamMemberPayload, IJoinNewUserInTeam } from "@royalcyber/global-types/src/backoffice-types/teamMembers"
import AuthService from "./auth.service";
import UserModel from "@/models/user.model";

class TeamMemberService {

    async getMembersByTeamId(_: any, data: { teamId: string }) {
        try {
            const members = await TeamMembersModel.find({ team: data.teamId }).populate("team").populate("user")
            return members;
        } catch (error) {
            throw new Error(error);
        }
    }

    async inviteMemberInTeam(_: any, data: { body: IInviteTeamMemberPayload }) {
        try {
            const { orgId, teamId, email } = data.body;

            const userData = await UserModel.findOne({ email });

            /* if user doesn't exist then create a invitation link to add user */
            if (!userData) {
                const service = new AuthService();
                const token = service.generateToken(data.body, '1d');
                return { token, msg: 'User has invited to join team!' };
            }

            /* check if user already a member */
            const member = await TeamMembersModel.findOne({
                user: userData._id,
                organization: orgId,
                team: teamId
            });
            if (member) {
                throw new Error(`${email} is already a member`)
            }
            
            /* if user already registered then directly add in the team */
            const teamMemberPayload = {
                user: userData._id,
                team: teamId,
                organization: orgId,
            }
            await TeamMembersModel.create(teamMemberPayload);
            return {token: "", msg: "User added in team successfully!"}

        } catch (error) {
            throw new Error(error);
        }
    }

    async addMemberInTeam(_: any, data: { body: any }, context) {
        try {
            const { orgId, teamId } = data.body;
            const { userId } = context.user;

            const payload = {
                team: teamId,
                organization: orgId,
                user: userId
            }

            await TeamMembersModel.create(payload);
            return ""
        } catch (error) {
            throw new Error(error);
        }
    }

    async createUserAndJoinTeam(_: any, data: { body: IJoinNewUserInTeam }) {
        try {
            const { token, firstName, lastName, password } = data.body;

            const authService = new AuthService();

            const decodeData: any = authService.decodeToken(token);
            if (!decodeData) {
                throw new Error("You'r not authorized to access")
            }

            // check if user already a member
            const memberData = await UserModel.findOne({ email: decodeData.email });
            if (memberData) {
                throw new Error("You'r already registered")
            }

            const hashedPassword = await authService.generateHashPassword(password);
            const payload = {
                email: decodeData.email,
                firstName,
                lastName,
                password: hashedPassword
            }

            const user = await UserModel.create(payload);

            const teamMemberPayload = {
                user: user._id,
                team: decodeData.teamId,
                organization: decodeData.orgId,
            }
            await TeamMembersModel.create(teamMemberPayload);
            return "You have successfully joined the team!";
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default TeamMemberService;