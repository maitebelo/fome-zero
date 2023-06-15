import { useContext } from "react";

import UserContext from "../../contexts/UserContext"
import { User } from "firebase/auth";

export default function useToken() {
    const { userData: user } = useContext(UserContext) as any;

    return user?.token;
}
