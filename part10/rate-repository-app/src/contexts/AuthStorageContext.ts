import AuthStorage from "../utils/authStorage";
import { createContext } from "react";

const AuthStorageContext = createContext<AuthStorage>(new AuthStorage());

export default AuthStorageContext;