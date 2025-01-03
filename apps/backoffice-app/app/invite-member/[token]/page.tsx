import CreateUserForm from "@/components/organisms/accounts/createUser";
import { LanguageProvider } from "context/language.context";
import { IntlProvider } from "react-intl";


const InviteMemberForm = ({ params }: any) => {

    const { token } = params;

    return (
        <LanguageProvider>
            <CreateUserForm token={token} />
        </LanguageProvider>
    )
}

export default InviteMemberForm;