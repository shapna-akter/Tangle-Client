import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthProvider';
import Spinner from '../../components/shared/Spinner/Spinner';

const AdminRoute = ({children}) => {
    const { isValidUser, loading } = useContext(AuthContext);
    // const [isAdmin, isAdminLoading] = useAdmin(userData?.role);
    const location = useLocation()

    if (loading) {
        return <Spinner />
    }

    if (isValidUser.email && (isValidUser.role === "admin" || isValidUser.role === "superAdmin") ) {
        return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

export default AdminRoute;