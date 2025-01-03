"use client"

import AppDrawer from "@/components/atoms/AppDrawer";
import MemberAndPermissionManager from "@/components/organisms/accounts/memberAndPermissionManager";
import { useRouter } from "next/navigation";

const MemberAndPermissionPage = ({params}: any) => {

    const router = useRouter();
    
    return (
        <AppDrawer 
            open={true} 
            onClose={() =>  router.back()} 
            breadcrumb={['To Teams', 'Administrator']}
        >
            <MemberAndPermissionManager 
                teamId={params.teamId} 
                organizationId={params.organizationId}
            />
        </AppDrawer>
    )
}

export default MemberAndPermissionPage;