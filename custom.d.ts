declare namespace NodeJS {
    interface ProcessEnv {
      AUTH0_ISSUER_BASE_URL: string;
      AUTH0_CLIENT_ID: string;
      // Add other environment variables here if needed
    }
  }