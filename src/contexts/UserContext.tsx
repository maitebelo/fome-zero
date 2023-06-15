import { createContext } from "react";

import useLocalStorage from "../utils/hooks/useLocalStorage";

const UserContext = createContext({
    userData: {
        token: "",
        email: "",
    },
    setUserData: (data: any) => {},
});
export default UserContext;

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [userData, setUserData] = useLocalStorage("userData", {});

    return <UserContext.Provider value={{ userData, setUserData }}>{children}</UserContext.Provider>;
}
