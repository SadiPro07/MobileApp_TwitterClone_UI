import { useRouter, useSegments } from 'expo-router';
import {
  PropsWithChildren,
  createContext,
  useState,
  useContext,
  useEffect,
} from 'react';
import * as SecureStore from 'expo-secure-store';

interface AuthContextType {
  authToken: string | null;
  updateAuthToken: (newToken: string) => void;
  removeAuthToken: () => void;
}

export { AuthContextType };

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: PropsWithChildren) => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const isAuthGroup = segments[0] === '(auth)';

    if (!authToken && !isAuthGroup) {
      router.replace('/signIn');
    }
    if (authToken && isAuthGroup) {
      router.replace('/');
    }
  }, [segments, authToken]);

  useEffect(() => {
    const loadAuthToken = async () => {
      const res = await SecureStore.getItemAsync('authToken');
      if (res) {
        setAuthToken(res);
      }
    };
    loadAuthToken();
  }, []);

  const updateAuthToken = async (newToken: string) => {
    await SecureStore.setItemAsync('authToken', newToken);
    setAuthToken(newToken);
  };

  const removeAuthToken = async () => {
    await SecureStore.deleteItemAsync('authToken');
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider
      value={{ authToken, updateAuthToken, removeAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;


export const useAuth = () => useContext(AuthContext);