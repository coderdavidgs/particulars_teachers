import { ResponseErrorInterface } from "@data/@types/axios_response";
import { LoginErrorInterface, LoginInterface, ResponseLoginInterface } from "@data/@types/login";
import { TeacherContext } from "@data/contexts/TeacherContext";
import { ApiService } from "@data/services/ApiService";
import { getUser } from "@data/services/MeService";
import { Router } from "@routes/routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useContext, useState } from "react";

export default function useLogin(){
    const [valuesLogin, setValuesLogin] = useState<LoginInterface>({email: '', password: ''} as LoginInterface),
    [messageError, setMessageError] = useState<LoginErrorInterface>(),
    [loading, setLoading] = useState(false),
    [snackMessage, setSnackMessage] = useState('');
    const router = useRouter();
    const { TeacherDispatch } = useContext(TeacherContext);

    function handleLogin(event: FormEvent){
        event.preventDefault();

        if(!loading){
            setLoading(true);
            ApiService.post('/api/auth/login', valuesLogin)
                .then(async ({data}: AxiosResponse<ResponseLoginInterface>) => {
                    localStorage.setItem('token_yourteacher', data.token);
                    localStorage.setItem('refresh_token_yourteacher', data.refresh_token);
                    await handleGetUser();
                    Router.listStudent.push(router)
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

    async function handleGetUser(){
        await getUser().then(({ data }) => {
            TeacherDispatch(data);
        }).catch(() => {
            setSnackMessage('Login Error')
        })
    }

    return { valuesLogin, setValuesLogin, messageError, setMessageError, handleLogin, loading, snackMessage, setSnackMessage}
}