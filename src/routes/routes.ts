import { NextRouter } from "next/router";


export const Router = {


    home: {
        name: '/',
        push: function(router: NextRouter){
            router.push({pathname: this.name})
        },
        icon: ''
    },
    searchTeacher: {
        name: '/searchTeacher',
        push: function(router: NextRouter, search?: string){
            router.push({pathname: this.name , query: {search}})
        },
        icon: ''
    },
    detailTeacher: {
        name: '/professor/detailTeacher',
        push: function(router: NextRouter, search?: string){
            router.push({pathname: this.name, query: {search} })
        },
        icon: ''
    },
    registerTeacher: {
        name: '/professor/registerTeacher',
        push: function(router: NextRouter){
            router.push({pathname: this.name })
        },
        icon: ''
    },
    listStudent: {
        name: '/professor/',
        push: function(router: NextRouter){
            router.push({pathname: this.name })
        },
        icon: "person",
    },
    login: {
        name: '/login',
        push: function(router: NextRouter){
            router.push({pathname: this.name })
        },
        icon: ''
    }

};