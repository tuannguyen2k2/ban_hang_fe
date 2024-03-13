/* eslint-disable react/prop-types */

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import routes from '.';
import { accessRouteTypeEnum } from '../constants';

const ValidateAccess = ({ authRequire, component: Component, componentProps, isAuthenticated, pageOptions }) => {
    const location = useLocation();
    const getRedirect = (authRequire) => {
        if (authRequire === accessRouteTypeEnum.NOT_LOGIN && isAuthenticated) {
            return false;
        }

        if (authRequire === accessRouteTypeEnum.REQUIRE_LOGIN && !isAuthenticated) {
            return routes.signInPage.path;
        }

        return false;
    };

    const redirect = getRedirect(authRequire);

    if (redirect) {
        return <Navigate state={{ from: location }} key={redirect} to={redirect} replace />;
    }

    return (
        <Component pageOptions={pageOptions} {...(componentProps || {})}>
            <Outlet />
        </Component>
    );
};

export default ValidateAccess;
