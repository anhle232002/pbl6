import { storage } from "@/utils/storage";
import { useState, useEffect, useLayoutEffect } from "react";

export const useUser = () => {
  const [user, setUser] = useState<any>();

  useLayoutEffect(() => {
    if (localStorage) {
      setUser(JSON.parse(storage.get("user") || "{}"));
    }
  }, []);

  return { user };
};
