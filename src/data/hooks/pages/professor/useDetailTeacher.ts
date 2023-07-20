import { ResponseErrorInterface } from "@data/@types/axios_response";
import { StudentErrorResponseInterface, StudentInterface } from "@data/@types/students";
import { teacher } from "@data/@types/teacher";
import { ApiService } from "@data/services/ApiService";
import { BrowserService } from "@data/services/BrowserService";
import { Router } from "@routes/routes";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useDetailTeacher(){
 const router = useRouter()
 const [teacherHook, setTeacherHook] = useState<teacher>(),
 [teachers, setTeachers] = useState<teacher[]>(),
 [openDialog, setOpenDialog] = useState<Boolean>(false),
 [student, setStudent] = useState<StudentInterface>({ nome: '', data_aula: '', email: ''}),
 [snackMessage, setSnackMessage] = useState(''),
 [studentError, setStudentError] = useState<StudentErrorResponseInterface>();
 
 useEffect(() => {
    const data = sessionStorage.getItem('yourteacher');

    if(data){
        setTeacherHook(JSON.parse(data));
        getTeachers();
    }else {
        Router.home.push(router);
    }

    return () => {
        sessionStorage.removeItem('yourteacher');
    };
 // eslint-disable-next-line react-hooks/exhaustive-deps
 }, []);

 async function getTeachers(){
    await ApiService.get('/api/professores', { params: router.query.search})
    .then(({ data }: AxiosResponse<teacher[]>) => {
        setTeachers(data);
    })
    .catch(() => {
        setTeachers([]);
    })
 }

 function selectTeacher(teacher: teacher){
    setTeacherHook(teacher);
    sessionStorage.setItem('yourteacher', JSON.stringify(teacher))
    BrowserService.scrollToTop();
 }

 function formatDateToJson(date: string): Date{
    const [_date, time] = date.split(' '),
    [day, month, year] = _date.split('/'),
    [hour, minute] = time?.split(':') ?? [];

    const newDate = new Date(`${month} ${day} ${year} ${hour}:${minute} UTC`)
    return newDate;
 }
 
 async function handleSubmit(){

    setSnackMessage('The class is confirmed')

    const newDate = {
        ...student,
        data_aula: formatDateToJson(student.data_aula as string),
    } as StudentInterface;

    await ApiService.post(`/api/professores/${teacherHook?.id}/alunos`, newDate)
        .then(() => {
            setOpenDialog(false)
            setStudent({data_aula: '', email: '', nome: ''});
            setSnackMessage('The class is confirmed')
        })
        .catch(({response}: AxiosError<ResponseErrorInterface<StudentErrorResponseInterface>>) => {
            if(response){
                setStudentError(response.data.errors);
                setSnackMessage(response.data.message); 
            }
        })
    ;
 }

 return  { teacherHook, 
    teachers, 
    selectTeacher, 
    openDialog, 
    setOpenDialog, 
    setStudent, 
    handleSubmit, 
    snackMessage, 
    setSnackMessage,
    studentError,
    setStudentError }
}