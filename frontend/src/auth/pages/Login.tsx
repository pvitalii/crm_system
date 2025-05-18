import { useLogin } from "../auth.hooks";
import { Auth } from "../components/authPage/Auth";

export function Login() {
    const login = useLogin();

    const loginConfig = {
        title: 'Login',
        buttonText: 'Login', 
        linkText: 'Need an account? Register',
        linkTo: '/register',
        onSubmit: login.mutate,
        isLoading: login.isPending,
        error: login.error,
    };
    
    return <Auth config={loginConfig} />
}