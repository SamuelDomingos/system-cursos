import { z } from "zod";

const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const registerSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z.string().min(6, { message: "Password must be at least 6 characters." }),
    "confirm-password": z.string().min(6, { message: "Confirm password must be at least 6 characters." }),
}).refine((data) => data.password === data["confirm-password"], {
    message: "Passwords don't match.",
    path: ["confirm-password"],
});

export { loginSchema, registerSchema };