"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import SuperTokens from "supertokens-auth-react/ui";

export default function Auth() {
    // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if (SuperTokens.canHandleRoute([]) === false) {
            redirect('/login')
        } else {
            setLoaded(true);
        }
    }, []);

    if (loaded) {
        return SuperTokens.getRoutingComponent([]);
    }

    return null;
}
