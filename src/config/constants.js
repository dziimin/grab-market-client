//export const API_URL = "http://localhost:8080";
//export const API_URL = "https://grab-market-server-jm0403.fly.dev";

export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://grab-market-server-jm0403.fly.dev"
    : "http://localhost:8080";
