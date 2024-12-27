import { Session } from "express-session";

declare global {
  namespace Express {
    interface Session {
      user?: {
        id: string;
        emailId: string;
        userName: string;
      };
    }
  }
}
