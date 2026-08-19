interface ApiErrorPayload {
  message?: string | string[];
}

function hasErrorPayload(value: unknown): value is { data?: ApiErrorPayload } {
  return typeof value === 'object' && value !== null && 'data' in value;
}

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (hasErrorPayload(error)) {
    const message = error.data?.message;
    if (Array.isArray(message) && message.length > 0) {
      return message.join(' ');
    }
    if (typeof message === 'string' && message.trim().length > 0) {
      return message;
    }
  }
  return fallback;
}
