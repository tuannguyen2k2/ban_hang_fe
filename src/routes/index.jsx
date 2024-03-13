import HomePage from '../modules/home';
import orderRoutes from '../modules/order/routes';
import productRoutes from '../modules/product/routes';
import detailProductRoutes from '../modules/detailProduct/routes';
import SignInPage from '../modules/signIn';

const routes = {
    homePage: {
        path: '/',
        auth: false,
        component: HomePage,
    },
    signInPage: {
        path: '/sign-in',
        auth: false,
        component: SignInPage,
    },
    ...productRoutes,
    ...detailProductRoutes,
    ...orderRoutes,
};
export default routes;
