import { object, string, TypeOf } from "zod";

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email('Invalid Email and Password'),
        password: string({
            required_error: "Password is required"
        }).min(6, 'Invalid Email and Password')
    })
});

export type createSessionInput = TypeOf<typeof createSessionSchema>['body'];