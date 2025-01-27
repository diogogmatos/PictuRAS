import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  login,
  register,
  SessionData,
  validateSession,
  updateUser,
  updatePassword,
} from "../session";

export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: (session) => {
      localStorage.setItem("session", JSON.stringify(session));
      qc.invalidateQueries({ refetchType: "all", queryKey: ["session"] });
      qc.removeQueries({ queryKey: ["projects"], refetchType: "all" });
      qc.removeQueries({ queryKey: ["project"], refetchType: "all" });
      qc.removeQueries({ queryKey: ["projectImages"], refetchType: "all" });
      qc.removeQueries({
        queryKey: ["projectResults"],
        refetchType: "all",
      });
      qc.removeQueries({ queryKey: ["socket"], refetchType: "all" });
    },
  });
};

export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: register,
    onSuccess: (session) => {
      localStorage.setItem("session", JSON.stringify(session));
      qc.invalidateQueries({ refetchType: "all", queryKey: ["session"] });
      qc.removeQueries({ queryKey: ["projects"], refetchType: "all" });
      qc.removeQueries({ queryKey: ["project"], refetchType: "all" });
      qc.removeQueries({ queryKey: ["projectImages"], refetchType: "all" });
      qc.removeQueries({
        queryKey: ["projectResults"],
        refetchType: "all",
      });
      qc.removeQueries({ queryKey: ["socket"], refetchType: "all" });
    },
  });
};

export const useLogout = () => {
  const register = useRegister();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => localStorage.removeItem("session"),
    onSuccess: () => {
      register.mutate({ type: "anonymous" });
      qc.removeQueries({ queryKey: ["projects"], refetchType: "all" });
      qc.removeQueries({ queryKey: ["project"], refetchType: "all" });
      qc.removeQueries({ queryKey: ["projectImages"], refetchType: "all" });
      qc.removeQueries({
        queryKey: ["projectResults"],
        refetchType: "all",
      });
      qc.removeQueries({ queryKey: ["socket"], refetchType: "all" });
    },
  });
};

export const useUpdateSession = () => {
  const logout = useLogout();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: validateSession,
    onSuccess: (resp) => {
      // If the session is valid, update it with the received user data
      const updatedSession = {
        user: {
          _id: resp.user._id,
          name: resp.user.name,
          email: resp.user.email,
          type: resp.user.type,
          operations: resp.user.operations,
        },
        token: resp.token,
      } as SessionData;
      localStorage.setItem("session", JSON.stringify(updatedSession));
      qc.invalidateQueries({ refetchType: "all", queryKey: ["session"] });
    },
    onError: () => {
      // If the session is invalid, logout and create an anonymous session
      logout.mutate();
    },
  });
};

export const useUpdateUserProfile = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_, variables) => {
      const session = JSON.parse(
        localStorage.getItem("session")!,
      ) as SessionData;
      const updatedSession = {
        user: {
          ...session.user,
          name: variables.name,
          email: variables.email,
        },
        token: session.token,
      } as SessionData;
      localStorage.setItem("session", JSON.stringify(updatedSession));
      qc.invalidateQueries({ refetchType: "all", queryKey: ["session"] });
    },
  });
};

export const useUpdateUserPassword = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updatePassword,
    onSuccess: () => {
      qc.invalidateQueries({ refetchType: "all", queryKey: ["session"] });
    },
  });
};
