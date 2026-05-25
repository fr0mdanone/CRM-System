let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
};
export const getAccessToken = (): string | null => {
  return accessToken;
};
export const clearToken = () => {
  accessToken = null;
};

export const isAuthenticated = (): boolean => {
  const refreshToken = localStorage.getItem("refreshToken");
  return !!refreshToken;
};
