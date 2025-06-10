import { useAuth } from "@/lib/auth-context";
import { Tabs, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";

export default function TabsLayout() {
  const router = useRouter();
  const { user, isLoadingUser} = useAuth();
  const segments = useSegments();

  useEffect(() => {
    const inAuthGroup = segments[0] === "auth";

    if (!user && !inAuthGroup && !isLoadingUser) {
      router.replace("/auth");
    }else if (user && inAuthGroup && !isLoadingUser) {
      router.replace("/");
    }
  }, [user, segments, isLoadingUser, router]);
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      
    </Tabs>
  );
}