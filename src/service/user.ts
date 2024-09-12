import { backendClient } from "@/service/backend-client";
import { User } from "@/types/store/user";

const usersEndpoint = "user";

enum Actions {
  Login = "login",
  Signup = "signup",
  Logout = "logout",
  UpdateEmail = "update-email",
  UpdatePassword = "update-password",
  UpdateName = "update-name",
}

const userClient = {
  get: (queryParams?: Record<string, string>) =>
    backendClient.get(usersEndpoint, undefined, queryParams),
  put: (queryParams?: Record<string, string>) =>
    backendClient.put(usersEndpoint, undefined, queryParams),
  delete: (queryParams?: Record<string, string>) =>
    backendClient.delete(usersEndpoint, undefined, queryParams),
  post: (queryParams?: Record<string, string>) =>
    backendClient.post(usersEndpoint, undefined, queryParams),
};

export const getUser = async (getVersion?: "true") => {
  const client = userClient.get();
  const headers = {
    ...(getVersion && { getVersion }),
  };
  return await client(headers);
};

export const getUserVersion = async () => {
  return await getUser("true");
};

const updateUser = async (
  user: Partial<User & { password: string }>,
  action: string,
) => {
  const client = userClient.put();
  const headers = { action };
  return await client(user, headers);
};

export const updateUserEmail = async (email: string) =>
  await updateUser({ email }, Actions.UpdateEmail);

export const updateUserPassword = async (password: string) =>
  await updateUser({ password }, Actions.UpdatePassword);

export const updateUserName = async (firstName?: string, lastName?: string) =>
  await updateUser({ firstName, lastName }, Actions.UpdateName);

export const deleteUser = async () => {
  const client = userClient.delete();
  return await client();
};

export const login = async (loginBody: { email: string; password: string }) => {
  const client = userClient.post();
  const headers = {
    action: Actions.Login,
  };
  return await client({ ...loginBody }, headers);
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
  return await client({ ...signupBody }, headers);
};

export const logout = async (): Promise<
  [string | undefined, any | undefined]
> => {
  const client = userClient.post();
  const headers = {
    action: Actions.Logout,
  };
  const body = {};
  return await client(body, headers);
};
