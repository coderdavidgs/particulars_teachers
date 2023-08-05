import { ResponseErrorInterface } from "@data/@types/axios_response";
import { LoginInterface, ResponseLoginInterface } from "@data/@types/login";
import { TeacherErrorRegister, TeacherFormRegister, teacher } from "@data/@types/teacher";
import { TeacherContext } from "@data/contexts/TeacherContext";
import { ApiService } from "@data/services/ApiService";
import { FormSchemaService } from "@data/services/FormSchemaService";
import { getUser } from "@data/services/MeService";
import { TextFormatService } from "@data/services/TextFormatService";
import { Router } from "@routes/routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";

export default function useRegisterTeacher(){
    const [valuesRegister, setValuesRegister] = useState({} as TeacherFormRegister);
    const [messageError, setMessageError] = useState<TeacherErrorRegister>();
    const [loading, setLoading] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');
    const router = useRouter();
    const { TeacherDispatch, TeacherState} = useContext(TeacherContext);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        setValuesRegister({...TeacherState, valor_hora: TeacherState?.valor_hora} as TeacherFormRegister)
    }, [TeacherState])

    async function savePhoto(files: FileList){
        const photo = { photo: files[0] };

        ApiService.post('/api/professores/foto', photo, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${localStorage.getItem('token_yourteacher')}`
            }
        }).then(({ data }: AxiosResponse<{message: string}>) => {
            setSnackMessage(data.message);
            handleGetUser();
        }).catch(({response}: AxiosError<{message: string}>) => {
            if(response){
                setSnackMessage(response!.data.message);
            }
        })
    }

    async function handleSubmit(){
        const formValidate = FormSchemaService.registerTeacher(valuesRegister);
        setMessageError(formValidate);
        const isValid = Object.keys(formValidate).length === 0;

        if(isValid && !loading) {
            setLoading(true);   

            const data = {
                ...valuesRegister,
                //valor_hora: Number((valuesRegister.valor_hora as string).replace('R$', '').replace(',', '.'))
            } as TeacherFormRegister;

            delete data.foto_perfil;

            const token = localStorage.getItem('token_yourteacher');

            const typeHttp = token ? ApiService.put : ApiService.post;
            const header = {};

            await typeHttp('/api/professores', data, {
                headers: token ? {
                    Authorization: `Bearer ${token}`,
                } : {},
            })
            .then(async () => {
                await handleLogin();

                if(!token){
                    setSnackMessage('Register teacher successfully');
                    Router.listStudent.push(router);
                }

                token && setSnackMessage('Updated Teacher');
                
            })
            .catch(({response}: AxiosError<ResponseErrorInterface<TeacherErrorRegister>>) => {
                if(response){
                    const {message, errors} = response.data;
                    setMessageError(errors);
                    setSnackMessage(message);
                }
            })
            .finally(() => setLoading(false))
        }
    }

    async function handleGetUser(){
        await getUser()
            .then(({ data }) => TeacherDispatch(data))
            .catch(({response}) => {
                setSnackMessage(response?.data.message ?? 'Error')
            })
    }

    async function handleLogin(){
        setLoading(true);
        ApiService.post('/api/auth/login', {email: valuesRegister.email, password: valuesRegister.password} as LoginInterface)
        .then(async ({data}: AxiosResponse<ResponseLoginInterface>) => {
            localStorage.setItem('token_yourteacher', data.token);
            localStorage.setItem('refresh_token_yourteacher', data.refresh_token);
            await handleGetUser();
        })
        .catch(() => Router.login.push(router))
        .finally(() => setLoading(false));
    }

    async function deleteAccount() {
        if(!loading){
            setLoading(true)
            ApiService.delete('/api/professores', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token_yourteacher')}`
                }
            }).then(() => {
                TeacherDispatch(undefined);
                localStorage.removeItem('token_yourteacher');
                localStorage.removeItem('refresh_token_yourteacher');
                Router.home.push(router);
            }).catch(({response}: AxiosError<{message: string}>) => {
                if(response){
                    setSnackMessage(response.data.message)
                }
            }).finally(() => {
                setLoading(false);
            })
        }
    }

    return{
        valuesRegister, 
        messageError,
        snackMessage,
        setValuesRegister,
        handleSubmit,
        setSnackMessage,
        loading,
        TeacherState,
        savePhoto,
        openDialog,
        setOpenDialog,
        deleteAccount
    }
}