import { teacher } from "@data/@types/teacher";
import { getUser } from "@data/services/MeService";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useEffect, useState } from "react";

interface TeacherReducerInterface {
    TeacherState: teacher | undefined;
    TeacherDispatch: Dispatch<SetStateAction<teacher | undefined>>;
}

const initialValue: TeacherReducerInterface = {
    TeacherDispatch: () => {},
    TeacherState: undefined
}

export const TeacherContext = createContext(initialValue);

export const TeacherProvider: React.FC<PropsWithChildren> = ({children}) => {
    const [teacherContext, setTeacherContext] = useState<teacher>();

    useEffect(() => {
        getUser()
        .then(({ data }) => {
            setTeacherContext(data);
        })
    }, [])

    return (
        <TeacherContext.Provider value={{TeacherState: teacherContext, 
            TeacherDispatch: setTeacherContext}}>
            
            {children}
        </TeacherContext.Provider>
    )
};