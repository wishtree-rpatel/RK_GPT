import { body, validationResult } from "express-validator";
export const validate = (validations) => {
    return async (req, res, next) => {
        for (let validation of validations) {
            const result = await validation.run(req);
            if (!result.isEmpty()) {
                // stop execution if any of the validation fails
                break;
            }
        }
        const errors = validationResult(req);
        if (errors.isEmpty())
            return next();
        return res.status(422).json({ errors: errors.array() });
    };
};
export const loginValidator = [
    body("email").trim().notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
    body("password").trim().notEmpty().withMessage("Password is required").isLength({ min: 6 }).withMessage("Password should contain atleast 6 characters")
];
export const signupValidator = [
    body("name").trim().notEmpty().withMessage("Name is required"),
    ...loginValidator
];
export const chatCompletionValidator = [
    body("message").trim().notEmpty().withMessage("Message is required")
];
//# sourceMappingURL=validators.js.map