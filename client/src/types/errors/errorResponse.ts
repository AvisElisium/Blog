import {AxiosError} from "axios";

export interface ErrorResponse {
    message: string,
    stackTrace?: string,
}

export const isErrorResponse = (error: AxiosError): error is AxiosError<ErrorResponse> => {
    
    if (error.response?.data === null) return false;
    
    return (<AxiosError<ErrorResponse>>error).response?.data.message !== undefined;
}