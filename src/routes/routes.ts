import { NextRouter } from "next/router";


export const Router = {


    home: {
        name: '/',
        push: function(router: NextRouter){
            router.push({pathname: this.name})
        }
    },
    searchTeacher: {
        name: '/searchTeacher',
        push: function(router: NextRouter, search?: string){
            router.push({pathname: this.name , query: {search}})
        }
    },
    detailTeacher: {
        name: '/professor/detailTeacher',
        push: function(router: NextRouter, search: string){
            router.push({pathname: this.name, query: {search} })
        }
    }

};