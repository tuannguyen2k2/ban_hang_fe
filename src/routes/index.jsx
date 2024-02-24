import HomePage from '../modules/home';
import orderRoutes from '../modules/order/routes';
import productRoutes from '../modules/product/routes';
import SignInPage from '../modules/signIn';

const routes = {
    homePage: {
        path: '/',
        auth: true,
        component: HomePage,
    },
    signInPage: {
        path: '/sign-in',
        auth: false,
        component: SignInPage,
    },
    ...productRoutes,
    ...orderRoutes,
};
export default routes;
