import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";

const useClasses = () => {
  const { user, loading } = useContext(AuthContext);
  const { refetch, data: selectClass = [] } = useQuery({
    queryKey: ["selectClass", user?.email],
    enabled: !loading,

    queryFn: async () => {
      const res = await axios.get(
        `https://melodia-server.vercel.app/selectClasses?email=${user?.email}`
      );
      return res.data;
    },
  });
  return [selectClass, refetch];
};

export default useClasses;