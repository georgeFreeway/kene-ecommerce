import { boolean, object, string, TypeOf } from 'zod';

export const registerUserSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email"),
        username: string({
            required_error: "Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is required to be atleast 6 characters"),
        confirmPassword: string({
            required_error: "Password confirmation is required"
        }),
        gender: string({
            required_error: "Please select a gender"
        }),
        checked: boolean()
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Password does not match",
        path: ["confirmPassword"]
    })
});

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    })
});

export const forgotPasswordSchema = object({
    body: object({
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email")
    })
});

export const resetPasswordSchema = object({
    params: object({
        id: string(),
        passwordResetCode: string()
    }),
    body: object({
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is required to be atleast 6 characters"),
        passwordConfirmation: string({
            required_error: "Password confirmation is required"
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Password does not match",
        path: ["passwordConfirmation"]
    })
});

//from the schemas, export a typescript interface for the Request object
export type RegisterUserInput = TypeOf<typeof registerUserSchema>['body'];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
export type ResetPasswordInput = TypeOf<typeof resetPasswordSchema>;