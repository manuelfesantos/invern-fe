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

const userClient = (queryParams?: Record<string, string>) => ({
  get: backendClient.get(usersEndpoint, undefined, queryParams),
  put: backendClient.put(usersEndpoint, undefined, queryParams),
  delete: backendClient.delete(usersEndpoint, undefined, queryParams),
  post: backendClient.post(usersEndpoint, undefined, queryParams),
});

export const getUser = async (getVersion?: "true") => {
  const client = userClient();
  const headers = {
    ...(getVersion && { getVersion }),
  };
  return await client.get(headers);
};

export const getUserVersion = async () => {
  return await getUser("true");
};

const updateUser = async (
  user: Partial<User & { password: string }>,
  action: string,
) => {
  const client = userClient();
  const headers = { action };
  return await client.put(user, headers);
};

export const updateUserEmail = async (email: string) =>
  await updateUser({ email }, Actions.UpdateEmail);

export const updateUserPassword = async (password: string) =>
  await updateUser({ password }, Actions.UpdatePassword);

export const updateUserName = async (firstName?: string, lastName?: string) =>
  await updateUser({ firstName, lastName }, Actions.UpdateName);

export const deleteUser = async () => {
  const client = userClient();
  return await client.delete();
};

export const login = async (loginBody: { email: string; password: string }) => {
  const client = userClient();
  const headers = {
    action: Actions.Login,
  };
  return await client.post({ ...loginBody }, headers);
};

export const signup = async (signupBody: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const client = userClient();
  const headers = {
    action: Actions.Signup,
  };
  return await client.post({ ...signupBody }, headers);
};

export const logout = async (): Promise<
  [string | undefined, any | undefined]
> => {
  const client = userClient();
  const headers = {
    action: Actions.Logout,
  };
  const body = {};
  return await client.post(body, headers);
};
