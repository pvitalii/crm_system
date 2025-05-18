export interface AuthConfig {
    title: string;
    buttonText: string;
    linkText: string;
    linkTo: string;
    onSubmit: (values: any) => void;
    isLoading: boolean;
    error: Error | null;
}
  
export interface AuthProps {
    config: AuthConfig;
}