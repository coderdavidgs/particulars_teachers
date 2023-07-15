import { Button, Typography } from "@mui/material";
import { BoxAvatarStyled, BoxContainsStyled, ImageStyled } from "./styles";
import { teacher } from "@data/@types/teacher";

export interface TeacherCardProps{

    teacher: teacher;
    onClick: (professor: teacher) => void;
}

export default function TeacherCard({ teacher, onClick }: TeacherCardProps){


    return(
        <>
            <BoxAvatarStyled>

                {teacher.foto_perfil ? (
                    <ImageStyled 
                        src={teacher.foto_perfil}
                        alt="Profile"
                    />
                ): (
                    <ImageStyled 
                        src={'./user.svg'}
                        alt="Profile"
                        style={{width: "50%"}}
                    /> 
                )}
                
            </BoxAvatarStyled>
            <BoxContainsStyled>
                <div className="text-container">
                    <Typography variant="h6"
                        className="descricao"
                        paragraph
                    >
                        {teacher.nome}
                    </Typography>
                    <Typography variant="body2"
                        paragraph
                        sx={{display: 'flex', alignItems: "center"}}
                        className="descricao"
                    >
                        {teacher.descricao}
                    </Typography>
                </div>
                <Button variant="outlined"
                    color="inherit"
                    onClick={() => onClick(teacher)}
                >
                    See Details
                </Button>
            </BoxContainsStyled>
        </>

    )
}