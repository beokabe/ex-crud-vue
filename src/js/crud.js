import axios from 'axios'
var API_URL = "http://localhost:8081/";

    async function getItens(tipo) {
        return await axios.get(API_URL + "albus/" + tipo)
    }

    async function getItem(tipo, id) {
        return await axios.get(API_URL + "albus/" + tipo + "/" + id)
    }

    async function postItem(tipo, item) {
        console.log(tipo)
        if (!tipo || !item) return;
        return await axios.post(API_URL + "albus/" + tipo, item)
    }

    async function deletar(tipo, id) {
        console.log(tipo)
        return axios.delete(API_URL + "albus/" + tipo + "/" + id);
    }

    async function updateItem(tipo, item) {
        console.log(tipo)
        return axios.put(API_URL + "albus/" + tipo + "/" + item.id, item);
    }

export default {getItem, getItens, updateItem, postItem, deletar}