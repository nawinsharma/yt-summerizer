export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';

export function debugLog(message: string, data?: unknown) {
  if (isDevelopment || process.env.DEBUG_PRODUCTION === 'true') {
    console.log(`[DEBUG] ${message}`, data || '');
  }
}

export function productionLog(message: string, data?: unknown) {
  if (isProduction) {
    console.log(`[PROD] ${message}`, data || '');
  }
}

export function errorLog(message: string, error?: unknown) {
  console.error(`[ERROR] ${message}`, error || '');
  
  // In production, you might want to send this to an error tracking service
  if (isProduction) {
    // TODO: Send to error tracking service (e.g., Sentry, LogRocket, etc.)
  }
}

export function getEnvironmentInfo() {
  return {
    nodeEnv: process.env.NODE_ENV,
    isDevelopment,
    isProduction,
    timestamp: new Date().toISOString(),
    runtime: typeof window !== 'undefined' ? 'client' : 'server',
  };
} 