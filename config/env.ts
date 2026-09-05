const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "";

export const env = {
  apiUrl,
  isApiConfigured: apiUrl.length > 0,
};
