import { DefaultSession} from "next-auth";
import { User } from "@/interfaces/user.interface";
import "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            role?: User["role"];
            id: User["id"];
        } & DefaultSession["user"];
    }

    interface User {
        role?: User["role"];
        id: User["id"];
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        role?: User["role"];
        id: User["id"];
    }
}