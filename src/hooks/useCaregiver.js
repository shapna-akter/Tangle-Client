import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../Contexts/AuthProvider';

const useCaregiver = () => {
  const [isCaregiver, setIsCaregiver] = useState(false);
  const [isCaregiverLoading, setIsCaregiverLoading] = useState(true);

  const { userData } = useContext(AuthContext);
  const role = userData?.role;

  useEffect(() => {
    if (role === "caregiver") {
      setIsCaregiver(true);
    }
    setIsCaregiverLoading(false);
  }, [role]);

  return [isCaregiver, isCaregiverLoading];
};

export default useCaregiver;
