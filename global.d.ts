import { PrismaClient } from "@prisma/client";
PrismaPromise
declare global{
    namespace globalThis{
        var prismadb: PrismaClient
    }
}