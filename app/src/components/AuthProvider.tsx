"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type UserProfile = {
  name: string;
  phone: string;
  role: "student" | "teacher" | "guardian";
  gender?: string;
  religion?: string;
  email?: string;
  studentClass?: string;
  branch?: string;
  registrationNo?: string;
  password?: string;
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
  ready: boolean;
  login: (profile: UserProfile) => void;
  logout: () => void;
  findProfileByPhone: (phone: string) => UserProfile | null;
  findProfileByIdentifier: (identifier: string) => UserProfile | null;
}>({
  isLoggedIn: false,
  profile: null,
  ready: false,
  login: () => {},
  logout: () => {},
  findProfileByPhone: () => null,
  findProfileByIdentifier: () => null,
});

export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  // True once the localStorage session has been read on the client. Pages
  // that redirect unauthenticated users must wait for this — otherwise
  // they see the initial isLoggedIn=false and boot out an actually-logged-in
  // user before this effect has had a chance to run.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    const stored = localStorage.getItem("userProfile");
    if (stored) setProfile(JSON.parse(stored));
    setReady(true);
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

  const findProfileByIdentifier = (identifier: string) => {
    const known = readKnownProfiles();
    return (
      Object.values(known).find((p) => p.phone === identifier || p.registrationNo === identifier) ?? null
    );
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, profile, ready, login, logout, findProfileByPhone, findProfileByIdentifier }}
    >
      {children}
    </AuthContext.Provider>
  );
}
