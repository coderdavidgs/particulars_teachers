import { teacher } from "@data/@types/teacher";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiService } from "@data/services/ApiService";
import { AxiosResponse } from "axios";
import { Router } from "@routes/routes";

export default function useSearchTeacher(){
    const router = useRouter(),
        [teachers, setTeachers] = useState<teacher[]>(),
        [search, setSearch] = useState(router.query.search as string),
        [timeOutRef, setTimeOutRef] = useState<NodeJS.Timeout>();

    
    useEffect(() => {
        ApiService.get('/api/professores', {params: {q: search}})
            .then(({ data }: AxiosResponse<teacher[]>) => {
                setTeachers(data);
            })  
            .catch(() => {
                setTeachers([]);
            })
    }, [search]);

    function onSearch(value: string) {

        clearTimeout(timeOutRef);
        const time =setTimeout(() => {
            setSearch(value);
            Router.searchTeacher.push(router, value);
        }, 1000)
        setTimeOutRef(time);
    }

    function selectTeacher(teacher: teacher){
        sessionStorage.setItem('yourteacher', JSON.stringify(teacher));
        Router.detailTeacher.push(router)

    }

    return { teachers, onSearch, selectTeacher };
}