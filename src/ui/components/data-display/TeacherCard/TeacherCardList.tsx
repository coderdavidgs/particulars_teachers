import { teacher } from "@data/@types/teacher";
import TeacherCard from ".";
import { ListStyled, BoxCardItemStyled } from "./styles";

export interface TeacherListProps{

    teachers: teacher[];
    onClick: (professor: teacher) => void;

}

export default function TeacherCardList({ teachers, onClick }: TeacherListProps) {

    return(
        <ListStyled>
            {teachers.map((teacher) => {
                return (
                    <BoxCardItemStyled key={teacher.id}>
                        <TeacherCard teacher={teacher} onClick={onClick}/>
                    </BoxCardItemStyled>
                )
            })}
        </ListStyled>
    )
}