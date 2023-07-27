import { TeacherErrorRegister, TeacherFormRegister } from "@data/@types/teacher";
import { useState } from "react";

export default function useRegisterTeacher(){
    const [valuesRegister, setValuesRegister] = useState({} as TeacherFormRegister);
    const [messageError, setMessageError] = useState<TeacherErrorRegister>();
    const [loading, setLoading] = useState(false);
    const [snackMessage, setSnackMessage] = useState('');

    function handleSubmit(){
        
    }

    return{
        valuesRegister, 
        messageError,
        snackMessage,
        setValuesRegister,
        handleSubmit
    }
}