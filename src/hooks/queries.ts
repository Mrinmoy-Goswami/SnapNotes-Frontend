//TO MAKE ALL THE QUERY CALLS CUSTOM HOOKS 
export interface TextractReponse {
    s3Key : string,
    extrextractedText : string
}

interface UserData{
  "sub": string,
  "tier":string,
  "email":string,
  "name": string,
  "picture": string
}

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_BASE = import.meta.env.VITE_API_BASE; // your API Gateway URL

// ✅ Fetch user info
export const useUserInfo = (token: string | null) => {
  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      if (!token) throw new Error('No token');
      const res = await fetch(`${API_BASE}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch user info');
      return res.json();
    },
    enabled: !!token,
  });
};

// ✅ Save user info (idempotent)
export const useSaveUserInfo = (token: string | null) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (userData: UserData) => {
      if (!token) throw new Error('No token');
      const res = await fetch(`${API_BASE}/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) throw new Error('Failed to save user info');
      return res.json();
    },
    onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['userInfo'] });
    },
  });
};
