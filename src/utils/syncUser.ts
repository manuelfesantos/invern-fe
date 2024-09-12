import { User } from "@/types/store/user";

export const syncUser = (user: User | null) => {
  if (typeof window !== "undefined") {
    user === null
      ? localStorage.removeItem("user")
      : localStorage.setItem("user", JSON.stringify(user));
  }
};
