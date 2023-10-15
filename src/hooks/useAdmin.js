import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../Contexts/AuthProvider';

const useAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  const { userData } = useContext(AuthContext);
  const role = userData?.role;

  useEffect(() => {
    if (role === "admin") {
      setIsAdmin(true);
    }
    setIsAdminLoading(false);
  }, [role]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
