import {ErrorResponse} from "./errorResponse";

export interface ValidationErrorResponse<T> extends ErrorResponse {
    validationErrors: {
        [k in keyof T as string]: string[];
    }
}