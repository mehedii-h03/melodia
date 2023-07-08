import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const useAdmin = () => {
    const { user, loading } = useContext(AuthContext);


    const { data: isAdmin } = useQuery({
        queryKey: ['isAdmin', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`https://melodia-server.vercel.app/users/admin/${user?.email}`);
            
            return res.data.role === "admin";
        }
    })
    return [isAdmin]
}

export default useAdmin;