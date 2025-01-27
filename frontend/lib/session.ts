import { api } from "./axios";
import Mongoose from "mongoose";

export interface User {
  _id: string;
  name?: string;
  email?: string;
  type: "anonymous" | "free" | "premium";
  operations: {
    day: Date;
    processed: number;
  }[];
}

interface UserResponse extends Omit<User, "_id"> {
  _id: Mongoose.Types.ObjectId;
}

export interface SessionData {
  user: User;
  token: string;
}

interface LoginRegisterResponse {
  user: UserResponse;
  jwt: string;
}

export const login = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<SessionData> => {
  const response = await api.post<LoginRegisterResponse>(
    `/users/${email}/login`,
    {
      password,
    },
  );

  if (response.status !== 201 || !response.data)
    throw new Error("Invalid credentials");

  const session = {
    user: {
      _id: response.data.user._id.toString(),
      name: response.data.user.name,
      email: response.data.user.email,
      type: response.data.user.type,
      operations: response.data.user.operations,
    },
    token: response.data.jwt,
  };

  return session;
};

export const register = async ({
  name,
  email,
  password,
  type,
}: {
  name?: string;
  email?: string;
  password?: string;
  type: "anonymous" | "free" | "premium";
}): Promise<SessionData> => {
  if (type === "anonymous") {
    const response = await api.post<LoginRegisterResponse>("/users/", {
      type: type,
    });
    // const response = {
    //   data: { user_id: new Mongoose.Types.ObjectId(), jwt: "ASKDJFAHSKDLFA" },
    // };

    if (response.status !== 201 || !response.data)
      throw new Error("An error occurred while registering");

    const session: SessionData = {
      user: {
        _id: response.data.user._id.toString(),
        type: "anonymous",
        operations: [],
      },
      token: response.data.jwt,
    };

    return session;
  }

  if (!name || !email || !password) throw new Error("All fields are required");

  const response = await api.post<LoginRegisterResponse>("/users/", {
    name,
    email,
    password,
    type,
  });

  if (response.status !== 201 || !response.data)
    throw new Error("An error occurred while registering");

  return {
    user: {
      _id: response.data.user._id.toString(),
      name: response.data.user.name,
      email: response.data.user.email,
      type: response.data.user.type,
      operations: response.data.user.operations,
    },
    token: response.data.jwt,
  };
};

export const validateSession = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const response = await api.get<{
    user: User;
    token: string;
  }>(`/users/validate/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status !== 200 || !response.data)
    throw new Error("Error fetching user data");

  return response.data;
};

export const updateUser = async ({
  userId,
  token,
  name,
  email,
}: {
  userId: string;
  token: string;
  name: string;
  email: string;
}) => {
  const response = await api.put(
    `/users/${userId}`,
    { name, email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 204) throw new Error("Error updating user data");
};

export const updatePassword = async ({
  userId,
  token,
  password,
}: {
  userId: string;
  token: string;
  password: string;
}) => {
  const response = await api.put(
    `/users/${userId}`,
    {
      password,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (response.status !== 204) throw new Error("Error updating password");
};
