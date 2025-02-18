import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const checkIfIsAdmin = async () => {
    try {
        const session = await auth();
        if(!session || !session.user.id) {
            throw new Error("You need stay authenticated");
        }
        const user = await prisma.user.findUnique({ where: { id: session.user.id }});
        if(!user || user.role !== "ADMIN") {
            throw new Error("You do not have permission to perform this action");
        }
    } catch (error) {
        if(error instanceof Error) {
            throw error;
        }
        throw new Error("An unexpected error has ocurred");
    }
}