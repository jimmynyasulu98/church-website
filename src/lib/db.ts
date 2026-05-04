import { PrismaClient } from "@prisma/client";
//Create a singleton instance of PrismaClient to be used across the application
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};
//Export the PrismaClient instance, creating it if it doesn't already exist
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
//In development, attach the PrismaClient instance to the global object to enable hot reloading without creating multiple instances
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
