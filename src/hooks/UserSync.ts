import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { ApiURL } from "@/constants/ApiURI";

export function useUserSync() {
  const auth = useAuth();
 console.log("USER SYNC",auth.user?.profile)
  // Mutation to save user in DynamoDB
  const saveUserMutation = useMutation({
    mutationFn: async () => {
      const user = auth.user?.profile;
      if (!user) throw new Error("No user profile available");

      const res = await axios.post(
        ApiURL.SAVE_USER,
        {
          sub: user.sub,
          email: user.email,
          name: user.name || "", // for email/password login this might be empty
          pictureUrl: user.picture || "", // google login has it, hosted UI may not
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        }
      );
      return res.data;
    },
  });


  useEffect(() => {
    if (auth.isAuthenticated && auth.user?.profile) {
      saveUserMutation.mutate();
    }
  }, [auth.isAuthenticated]);
}
