import {ValidationErrorResponse} from "../types/errors/validationErrorResponse";
import {ErrorOption, FieldPath, FieldValues, Path} from "react-hook-form";

const useValidationErrors = <T extends FieldValues,>
(setErrorFn: (name: FieldPath<T>, error: ErrorOption, options?: {shouldFocus: boolean}) => void) => {
    return (validationErrorResponse: ValidationErrorResponse<T>) => {
        for (const [k, v] of Object.entries(validationErrorResponse.validationErrors)) {
            const fieldKey = k.toLowerCase() as Path<T>;
            v.forEach((err) => {
                setErrorFn(fieldKey, {
                    type: "custom",
                    message: err,
                })
            })
        }
    };
}

export default useValidationErrors;