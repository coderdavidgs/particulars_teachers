import { ResponseErrorInterface } from "@data/@types/axios_response";
import { LoginErrorInterface, LoginInterface, ResponseLoginInterface } from "@data/@types/login";
import { ApiService } from "@data/services/ApiService";
import { AxiosError, AxiosResponse } from "axios";
import { FormEvent, useState } from "react";

export default function useLogin(){
    const [valuesLogin, setValuesLogin] = useState<LoginInterface>({email: '', password: ''} as LoginInterface),
    [messageError, setMessageError] = useState<LoginErrorInterface>(),
    [loading, setLoading] = useState(false),
    [snackMessage, setSnackMessage] = useState('');

    function handleLogin(event: FormEvent){
        event.preventDefault();

        if(!loading){
            setLoading(true);
            ApiService.post('/api/auth/login', valuesLogin)
                .then(({data}: AxiosResponse<ResponseLoginInterface>) => {
                    localStorage.setItem('token_yourteacher', data.token);
                    localStorage.setItem('refresh_token_yourteacher', data.refresh_token);
                })
                .catch(({response}: AxiosError<ResponseErrorInterface<LoginErrorInterface>>) => {
                    if(response){
                        const {message, errors} = response.data;
                        setMessageError(errors);
                        setSnackMessage(message ?? '');
                    }
                })
                .finally(() => {
                    setLoading(false);
                });
        }

    }

    return { valuesLogin, setValuesLogin, messageError, setMessageError, handleLogin, loading, snackMessage, setSnackMessage}
}