import { AuthProvider } from "@/lib/auth-context";
import { Stack } from "expo-router";
import { useRouter } from "expo-router";
import { useEffect } from "react";

function RouteGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = false; 

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/auth");
    }
  });

  return <>{children}</>;
}

export default function RootLayout() {
  return(
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}/>
        <Stack.Screen name="auth"/>
      </Stack>
    </AuthProvider>
  );
}

