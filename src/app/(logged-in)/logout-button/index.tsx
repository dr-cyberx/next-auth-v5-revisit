"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { logout } from "./actions";

const logoutButton = () => {
    return (
        <Button
            size={"sm"}
            onClick={async () => {
                logout();
            }}
        >
            Logout
        </Button>
    );
};

export default logoutButton;
