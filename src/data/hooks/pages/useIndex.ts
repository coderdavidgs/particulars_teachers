import { Router } from "@routes/routes";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";


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

    return { setSearch, messageError, onSearchTeacher };
}