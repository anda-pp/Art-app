import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View} from "react-native";
import { TextInput, Text, Button} from "react-native-paper";

export default function AuthScreen() {
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>("");

    const {signUp, signIn} = useAuth();
    const router = useRouter();

    const handleAuth = async() => {
        if(!email || !password) {
            setError("Please fill in all fields");
            return;
        }

        if(password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setError(null);

        if(isSignUp) {
            const error = await signUp(email, password)
            if (error) {
                setError(error);
                return;
            }
        } else {
            const error = await signIn(email, password);
            if (error) {
                setError(error);
                return;
            }

            router.replace("/");
        }

    };

    const handleSwitchMode = () => {
        setIsSignUp((prev) => !prev);
    };

  return <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
    <View>
        <Text>{isSignUp ? "Create Account" : "Welcome Back"}</Text>

    <TextInput
    label ="Email"
    placeholder="example@gmail.com"
    keyboardType="email-address"
    autoCapitalize="none"
    mode="outlined"
    onChangeText={setEmail}
    />

    <TextInput
    label="Password"
    autoCapitalize="none"
    secureTextEntry
    mode="outlined"
    onChangeText={setPassword}
    />

    {error && (
        <Text>{error}</Text>
    )}

    <Button mode="contained" onPress={handleAuth}>{isSignUp ? "Sign Up" : "Sign In"}</Button>

    <Button mode="text" onPress={handleSwitchMode}>
        {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
    </Button>

    </View>

  </KeyboardAvoidingView>
}