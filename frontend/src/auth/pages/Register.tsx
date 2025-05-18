import { Auth } from "../../auth/components/authPage/Auth";

import { useRegister } from "../../auth/auth.hooks";

export function Register() {
    const register = useRegister();

    const registerConfig = {
        title: 'Register',
        buttonText: 'Register', 
        linkText: 'Already have an account? Login',
        linkTo: '/login',
        onSubmit: register.mutate,
        isLoading: register.isPending,
        error: register.error,
    };
    
    return <Auth config={registerConfig} />
}