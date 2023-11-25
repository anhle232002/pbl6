import { storage } from "@/utils/storage";
import { useState, useEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState<any>();

  useEffect(() => {
    if (localStorage) {
      setUser(JSON.parse(storage.get("user") || "{}"));
    }
  }, []);

  return { user };
};
