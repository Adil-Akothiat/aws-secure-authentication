import { useAuth as useOidcAuth } from 'react-oidc-context';

export const useAuth = () => {
  const auth = useOidcAuth();
  
  return {
    user: auth.user?.profile,
    isLoading: auth.isLoading,
    isAuthenticated: auth.isAuthenticated,
    login: auth.signinRedirect,
    logout: auth.signoutRedirect,
  };
};