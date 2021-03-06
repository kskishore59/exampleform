import IRoute from "../interfaces/route";

import LoginPage from "../pages/auth/login";
import LogoutPage from "../pages/auth/logout";
import RegisterPage from "../pages/auth/register";
import HomePage from "../pages/StepOne";
import StepTwoPage from '../pages/StepTwo';
import StepThree from '../pages/StepThree';
import ResultPage from "../pages/result";
import ForgotPasswordPage from "../pages/auth/forgot";



const routes: IRoute[] = [
    {
        path: '/',
        exact: true,
        component: HomePage,
        name: 'Home Page',
        protected: true
    },
    {
        path: '/register',
        exact: true,
        component: RegisterPage,
        name: 'Register Page',
        protected: false
    },
    {
        path: '/login',
        exact: true,
        component: LoginPage,
        name: 'Login Page',
        protected: false
    },
    {
        path: '/logout',
        exact: true,
        component: LogoutPage,
        name: 'Logout Page',
        protected: true
    },
    {
        path: '/forgot',
        exact: true,
        component: ForgotPasswordPage,
        name: 'Forgot Password Page',
        protected: false
    },
    {
        path: '/step2',
        exact: true,
        component: StepTwoPage,
        name: 'Step Two Page',
        protected: true
    },
    {
        path: '/step3',
        exact: true,
        component: StepThree,
        name: 'Step Three Page',
        protected: true
    },
    {
        path: '/result',
        exact: true,
        component: ResultPage,
        name: 'Result Page',
        protected: true
    }
];

export default routes;
