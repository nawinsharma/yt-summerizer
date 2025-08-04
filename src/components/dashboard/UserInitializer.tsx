"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import type { User } from "@/lib/types";

export default function UserInitializer({ user }: { user: User }) {
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  return null;
} 