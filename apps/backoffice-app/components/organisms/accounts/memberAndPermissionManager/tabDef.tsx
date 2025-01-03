import TeamMembers from "./members";
import TeamPermissions from "./permissions";

export const tabConfigurations: Array<any> = [
    {
        label: 'account.members',
        path: "/members",
        component: TeamMembers,
    },
    {
        label: 'account.permissions',
        path: "/permissions",
        component: TeamPermissions,
    },
];