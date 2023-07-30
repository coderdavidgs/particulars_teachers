import { StudentInterface } from "@data/@types/students";
import { ApiService } from "@data/services/ApiService";
import { Router } from "@routes/routes";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function useTeacherPanel(){
    const [students, setStudents] = useState<StudentInterface[]>();
    const router = useRouter();
    const [expanded, setExpanded] = useState('');

    useEffect(() => {
        ApiService.get('/api/professores/alunos', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token_yourteacher')}`
            }
        })
        .then(({ data }: AxiosResponse<StudentInterface[]>) => {
            setStudents(data);
        })
        .catch(() => {
            Router.login.push(router)
        })

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {students, expanded, setExpanded}
}