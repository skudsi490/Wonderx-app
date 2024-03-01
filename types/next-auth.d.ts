import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    userId?: string;
    profileId?: string;  // Add this line
  }
}
