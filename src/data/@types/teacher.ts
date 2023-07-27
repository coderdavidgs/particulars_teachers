export interface teacher{
        id: number,
        nome: string,
        email: string,
        idade: number,
        descricao: string,
        valor_hora: number,
        foto_perfil?: string,
        created_at: string,
        updated_at: string
}

export interface TeacherFormRegister extends Omit<teacher, 'id' | 'created_at' | 'updated_at'>{
        password: string,
        password_confirmation: string
}

export interface TeacherErrorRegister extends TeacherFormRegister{}