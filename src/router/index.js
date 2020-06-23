import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Produtos from '../views/GerenciadorProdutos/Produtos'
import Categorias from "../views/GerenciadorCategoria/Categorias";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/Administrador/Produtos',
        name: 'Produtos',
        component: Produtos
    },
    {
        path: '/Administrador/Categorias',
        name: 'Categorias',
        component: Categorias
    },
]

const router = new VueRouter({
    routes
})

export default router