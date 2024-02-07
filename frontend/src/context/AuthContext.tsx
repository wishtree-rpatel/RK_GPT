import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  checkAuthStatus,
  loginUser,
  logoutUser,
  signUpUser,
} from "../helpers/api-communicator";
import toast from "react-hot-toast";

type User = {
  name: string;
  email: string;
};
type userAuth = {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<userAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  useEffect(() => {
    //check if user's cookies are valid if then skip login
    async function checkStatus() {
      const { data } = await checkAuthStatus();
      if (data) {
        setUser({ email: data?.email, name: data?.name });
        setIsLoggedIn(true);
      }
    }
    checkStatus();
  }, []);

  // We've login method here so that we don't have to add setState methods like setIsLoggedIn and setUser in provider
  const login = async (email: string, password: string) => {
    const { data } = await loginUser(email, password);
    if (data) {
      setIsLoggedIn(true);
      console.log("name", data);
      setUser({ name: data?.name, email: data?.email });
    }
  };
  const signup = async (name: string, email: string, password: string) => {
     await signUpUser(name, email, password);
  };
  const logout = async () => {
    try {
      await logoutUser();
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.log("error", error);
      toast.error("Something went wrong");
    }
  };

  const value = {
    user,
    isLoggedIn,
    login,
    signup,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const userAuth = () => useContext(AuthContext);
