import { useContext } from "react";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const useInstructor = () => {
    const { user, loading } = useContext(AuthContext);


    const { data: isInstructor } = useQuery({
        queryKey: ['isInstructor', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axios.get(`https://melodia-server.vercel.app/users/instructor/${user?.email}`);
            
            return res.data.role === "instructor";
        }
    })
    return [isInstructor]
}

export default useInstructor;