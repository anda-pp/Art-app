import { createContext, use, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";
import { account } from "./appwrite";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    isLoadingUser: boolean;
    signUp: (email: string, password: string) => Promise<string | null>;
    signIn: (email: string, password: string) => Promise<string | null>;
    signOut: () => Promise<void>;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
 const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
 
 const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true);

 useEffect(() => {
    getUser();
 }, [])

 const getUser = async () => {
    try{
        const session = await account.get();
        setUser(session);
    } catch (error) {
        setUser(null); // If there's an error, set user to null
    } finally {
        setIsLoadingUser(false); // Set loading to false after trying to get user
    }
 };
 
    const signUp = async (email: string, password: string) => {
        try{
            await account.create(ID.unique(), email, password);
            await signIn(email, password);
            return null; // Sign up successful
        }catch (error) {
            if(error instanceof Error) {
                return error.message; // Return error message
            }
            return "An error occurred during Sign Up"; // Fallback error message
        }
    };

    const signIn = async (email: string, password: string) => {
        try{
            await account.createEmailPasswordSession( email, password);
            return null; // Sign in successful
        }catch (error) {
            if(error instanceof Error) {
                return error.message; // Return error message
            }
            return "An error occurred during Sign In"; // Fallback error message
        }
    };

    const signOut = async () => {
        try{
            await account.deleteSession("current");
            setUser(null); // Clear user state on sign out
        }catch (error) {
            console.log(error);
        }
    };

    return(
    <AuthContext.Provider value={{user, isLoadingUser, signUp, signIn, signOut}}>
        {children}
    </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(context === undefined) {
        throw new Error("useAuth must be inside of the AuthProvider");
    }
    return context;
}