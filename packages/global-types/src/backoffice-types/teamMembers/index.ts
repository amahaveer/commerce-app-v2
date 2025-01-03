export interface IInviteTeamMemberPayload {
    teamId: string;
    orgId: string;
    email: string;
}

export interface IJoinNewUserInTeam {
    firstName: string
    lastName: string
    password: string
    token: string
}