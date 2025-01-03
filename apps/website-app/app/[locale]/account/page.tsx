"use client";

import React from "react";
import AccountTabs from "@/components/account/AccountTabs";
import { useAccount } from "@/context/AccountContext";

const AccountPage: React.FC = () => {
    const { account } = useAccount();

    if (!account) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-gray-500 text-lg">Loading account details...</p>
            </div>
        );
    }

    return (
        <div className="bg-gray-100 md:flex">
            <AccountTabs />
        </div>
    );
};

export default AccountPage;
