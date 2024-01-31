import { Request } from "express";
import joi from "joi";

export const validateQuery = (details:Request) => {
    const schema = joi.object({
      name: joi.string().min(2),
    });
    return schema.validate(details);
  };