import { backendClient } from "@/service/backend-client";
import { User } from "@/types/store/user";
import { handleError } from "@/utils/error";

const usersEndpoint = "users";

enum Actions {
  Login = "login",
  Signup = "signup",
  UpdateEmail = "update-email",
  UpdatePassword = "update-password",
  UpdateName = "update-name",
}

const userClient = {
  get: (params: { userId: string }, queryParams?: Record<string, string>) =>
    backendClient.get(usersEndpoint, params, queryParams),
  put: (params: { userId: string }, queryParams?: Record<string, string>) =>
    backendClient.put(usersEndpoint, params, queryParams),
  delete: (params: { userId: string }, queryParams?: Record<string, string>) =>
    backendClient.delete(usersEndpoint, params, queryParams),
  post: (queryParams?: Record<string, string>) =>
    backendClient.post(usersEndpoint, undefined, queryParams),
};

export const getUserById = async (userId: string) => {
  const client = userClient.get({ userId });
  const headers = {};
  return await client(headers);
};

const updateUser = async (
  userId: string,
  user: Partial<User & { password: string }>,
  action: string,
) => {
  const client = userClient.put({ userId });
  const headers = { action };
  try {
    return await client(user, headers);
  } catch (error) {
    handleError(error);
  }
};

export const updateUserEmail = async (userId: string, email: string) =>
  await updateUser(userId, { email }, Actions.UpdateEmail);

export const updateUserPassword = async (userId: string, password: string) =>
  await updateUser(userId, { password }, Actions.UpdatePassword);

export const updateUserName = async (
  userId: string,
  firstName?: string,
  lastName?: string,
) => await updateUser(userId, { firstName, lastName }, Actions.UpdateName);

export const deleteUser = async (userId: string) => {
  const client = userClient.delete({ userId });
  const headers = {};
  try {
    return await client(headers);
  } catch (error) {
    handleError(error);
  }
};

export const login = async (loginBody: { email: string; password: string }) => {
  const client = userClient.post();
  const headers = {
    action: Actions.Login,
  };
  try {
    return await client({ ...loginBody }, headers);
  } catch (error) {
    handleError(error);
  }
};

export const signup = async (signupBody: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const client = userClient.post();
  const headers = {
    action: Actions.Signup,
  };
  try {
    return await client({ ...signupBody }, headers);
  } catch (error) {
    handleError(error);
  }
};

export const getUserVersion = async (userId: string) => {
  const client = userClient.get({ userId });
  const headers = { getVersion: "true" };
  try {
    return await client(headers);
  } catch (error) {
    handleError(error);
  }
};
