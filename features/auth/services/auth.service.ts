import { apiRequest } from "@/lib/api";
import { env } from "@/config/env";
import type { AuthResponse } from "@/types/auth";
import type { LoginCredentials, RegisterData } from "@/types/auth";
import type { User } from "@/types/user";

const TOKEN_PREFIX = "mock-fsb";

function isNetworkError(error: { statusCode?: number } | null | undefined): boolean {
  return !error || typeof error.statusCode !== "number";
}

function mockUser(input: { name: string; email: string }): User {
  return {
    id: "mock-user-1",
    name: input.name,
    email: input.email,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

function mockTokens(email: string) {
  const encoded = btoa(email);
  return {
    accessToken: `${TOKEN_PREFIX}-access-${encoded}`,
    refreshToken: `${TOKEN_PREFIX}-refresh-${encoded}`,
  };
}

const simulateLatency = () => new Promise((resolve) => setTimeout(resolve, 600));

export async function login(credentials: LoginCredentials) {
  if (env.isApiConfigured) {
    const result = await apiRequest<AuthResponse>({
      method: "POST",
      url: "/auth/login",
      data: credentials,
    });

    if (!isNetworkError(result.error)) {
      return result;
    }
  }

  await simulateLatency();
  const name = credentials.email.replace(/@.*$/, "").replace(/[._-]+/g, " ");
  return {
    data: {
      user: mockUser({ name: name || "Fashion User", email: credentials.email }),
      tokens: mockTokens(credentials.email),
    },
    error: null,
  };
}

export async function register(data: RegisterData) {
  if (env.isApiConfigured) {
    const result = await apiRequest<AuthResponse>({
      method: "POST",
      url: "/auth/register",
      data,
    });

    if (!isNetworkError(result.error)) {
      return result;
    }
  }

  await simulateLatency();
  return {
    data: {
      user: mockUser({ name: data.name, email: data.email }),
      tokens: mockTokens(data.email),
    },
    error: null,
  };
}

export async function logout() {
  return { data: { success: true }, error: null };
}