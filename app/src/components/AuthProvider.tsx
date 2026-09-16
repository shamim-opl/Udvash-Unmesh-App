"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type UserProfile = {
  name: string;
  phone: string;
  role: "student" | "teacher";
  gender?: "male" | "female";
  studentClass?: string;
  division?: string;
  district?: string;
};

const KNOWN_PROFILES_KEY = "knownProfiles";

function readKnownProfiles(): Record<string, UserProfile> {
  try {
    return JSON.parse(localStorage.getItem(KNOWN_PROFILES_KEY) ?? "{}");
  } catch {
    return {};
  }
}

const AuthContext = createContext<{
  isLoggedIn: boolean;
  profile: UserProfile | null;
  login: (profile: UserProfile) => void;
  logout: () => void;
  findProfileByPhone: (phone: string) => UserProfile | null;
}>({
  isLoggedIn: false,
  profile: null,
  login: () => {},
  logout: () => {},
  findProfileByPhone: () => null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    const stored = localStorage.getItem("userProfile");
    if (stored) setProfile(JSON.parse(stored));
  }, []);

  const login = (nextProfile: UserProfile) => {
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userProfile", JSON.stringify(nextProfile));
    const known = readKnownProfiles();
    known[nextProfile.phone] = nextProfile;
    localStorage.setItem(KNOWN_PROFILES_KEY, JSON.stringify(known));
    setIsLoggedIn(true);
    setProfile(nextProfile);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setProfile(null);
  };

  const findProfileByPhone = (phone: string) => readKnownProfiles()[phone] ?? null;

  return (
    <AuthContext.Provider value={{ isLoggedIn, profile, login, logout, findProfileByPhone }}>{children}</AuthContext.Provider>
  );
}
