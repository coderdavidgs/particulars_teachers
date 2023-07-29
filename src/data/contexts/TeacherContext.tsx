import { teacher } from "@data/@types/teacher";
import { Dispatch, PropsWithChildren, SetStateAction, createContext, useState } from "react";

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

    return (
        <TeacherContext.Provider value={{TeacherState: teacherContext, 
            TeacherDispatch: setTeacherContext}}>
            
            {children}
        </TeacherContext.Provider>
    )
};