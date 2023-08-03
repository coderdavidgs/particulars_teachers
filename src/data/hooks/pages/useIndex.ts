import { getUser } from "@data/services/MeService";
import { Router } from "@routes/routes";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";


export default function useIndex() {
    const router = useRouter(),
        [search, setSearch] = useState<string>(""),
        [messageError, setMessageError] = useState<string>("");

    function onSearchTeacher(event: FormEvent){
        event.preventDefault();
        if(search.length >= 3){
            Router.searchTeacher.push(router, search);
        }else{
            setMessageError('Less than 3 characters');
        }

    }

    useEffect(() => {
        getUser()
        .then(() => {
            Router.listStudent.push(router);
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return { setSearch, messageError, onSearchTeacher };
}