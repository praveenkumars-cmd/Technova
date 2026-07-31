const API_BASE_URL = (import.meta as any).env?.VITE_API_BASE_URL || '/api';

export interface ApiResponse<T> {
  data?: T;
  error?: string;
  status: number;
}

export async function httpRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = localStorage.getItem('pulsecare-auth-token');

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: response.statusText }));
      return {
        status: response.status,
        error: errorData.message || `Request failed with status ${response.status}`,
      };
    }

    const data = await response.json().catch(() => ({}));
    return {
      status: response.status,
      data,
    };
  } catch (err: any) {
    return {
      status: 0,
      error: err.message || 'Network error: Backend server is unreachable.',
    };
  }
}
