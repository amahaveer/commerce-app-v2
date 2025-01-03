import { authSchema } from "./auth.schema";
import extensionAppSchema from "./extensionApp.schema";
import oraganizationSchema from "./organization.schema";
import permissionSchema from "./permissions.schema";
import projectSchema from "./project.schema";
import { teamSchema } from "./team.schema";
import { teamMemberSchema } from "./teamMember.schema";
import { userSchema } from "./user.schema";


export const typeDefs = [
  oraganizationSchema,
  teamSchema,
  userSchema,
  projectSchema,
  authSchema,
  teamMemberSchema,
  permissionSchema,
  extensionAppSchema,
];
