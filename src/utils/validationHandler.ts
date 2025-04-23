import ValidationException from "@/exceptions/ValidationException";
import { Schema } from "joi";

export const validate = (
  reqBody: Record<string, any>,
  validationSchema: Schema
) => {
  const { error } = validationSchema.validate(reqBody, { abortEarly: false });

  if (error) {
    const formattedErrors = error.details.reduce(
      (acc: Record<string, string>, err) => {
        if (err.context && err.context.key) {
          acc[err.context.key] = err.message;
        }
        return acc;
      },
      {}
    );

    throw new ValidationException(422, "Validation error", formattedErrors);
  }
};
