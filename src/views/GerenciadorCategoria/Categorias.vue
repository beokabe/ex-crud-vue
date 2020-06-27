<template>
    <div id="categoria-list">
        <div class="actions">
            <a class="btn btn-success" data-target="#editarCategoria"
               @click="atribuirCategoria(categoria)" data-toggle="modal" tabindex="1">
                Adicionar Nova Categoria
            </a>
        </div>

        <table class="table">
            <thead>
            <tr>
                <th>Id</th>
                <th>Tipo</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="categoria in categorias" :key="categoria">
                <td>
                    {{categoria.id}}
                </td>
                <td>
                    {{categoria.tipoCategoria}}
                </td>
                <td>{{ categoria.nome }}</td>
                <td>
                    {{ categoria.descricao }}
                </td>
                <td>
                    <a class="btn btn-warning btn-xs" data-toggle="modal" data-target="#editarCategoria"
                       @click="atribuirCategoria(categoria)">Editar</a>
                    <a tabindex="1" class="btn btn-danger btn-lg" @click="deletarCategoria(categoria.id)">
                        Deletar</a>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- Modal Editar Item -->
        <div class="modal fade" id="editarCategoria" role="dialog">
            <div class="modal-dialog">

                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Editar Categoria</h4>
                        <button type="button" class="close" data-dismiss="modal" @click="limparCategoria">&times;
                        </button>
                    </div>
                    <div class="modal-body">

                        <div class="form-group" v-show="categoria.id">
                            <label for="id">ID</label>
                            <input type="text" class="form-control" id="id"
                                   name="id" required v-model="categoria.id" disabled>
                        </div>
                        <div class="form-group">
                            <label for="tipoCategoria">Tipo de Categoria</label>
                            <input type="text" class="form-control" id="tipoCategoria"
                                   name="tipoCategoria" required v-model="categoria.tipoCategoria">
                        </div>
                        <div class="form-group">
                            <label for="nome">Nome</label>
                            <input type="text" class="form-control" id="nome"
                                   name="nome" required v-model="categoria.nome">
                        </div>
                        <div class="form-group">
                            <label for="descricao">Descrição</label>
                            <input type="text" class="form-control" id="descricao"
                                   name="descricao" required v-model="categoria.descricao">
                        </div>
                        <div>
                            <button @click="salvar()" class="btn btn-primary" data-dismiss="modal">
                                Salvar
                            </button>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal"
                                @click="this.limparCategoria">Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import crud from '../../js/crud';

    export default {
        name: "categorias",
        data() {
            return {
                categorias: [],
                categoria: this.criarCategoriaVazio()
            }
        },
        created() {
            this.carregarCategorias();
        },
        methods: {
            carregarCategorias() {
                crud.getItens("categoria")
                    .then(response => this.categorias = response.data)
                    .catch(function (error) {
                        console.log(error.status);
                    });
            },

            atribuirCategoria(categoria) {
                this.categoria = categoria;
            },

            deletarCategoria(id) {
                crud.deletar("categoria", id).then(() => {
                    this.limparCategoria();
                    this.carregarCategorias();
                });
            },

            salvar() {
                if (!this.categoria.tipoCategoria || !this.categoria.nome) {
                    alert("Preencha todos os campos obrigatórios!")
                    return;
                } else if (this.categoria.tipoCategoria !== 'PRODUTO' && this.categoria.tipoCategoria !== 'SERVICO') {
                    alert("O campo de tipo de categoria só aceita os seguintes valores: PRODUTO ou SERVICO")
                    return;
                }

                if (this.categoria.id) {
                    crud.updateItem('categoria', this.categoria)
                        .then(() => {
                            this.limparCategoria();
                        }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    crud.postItem('categoria', this.categoria)
                        .then(() => {
                            this.limparCategoria();
                            this.carregarCategorias();
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
            },

            limparCategoria() {
                this.categoria = this.criarCategoriaVazio()
            },

            criarCategoriaVazio() {
                return {
                    id: '',
                    tipoCategoria: '',
                    nome: '',
                    descricao: '',
                }
            }
        }
    }

</script>

<style scoped>
    #categoria-list {
        width: 80%;
        position: relative;
        left: 13%;
        font-size: 20px;
        margin: 50px 0;
    }

    a, #categoria-list {
        font-size: 16px;
    }

    a {
        text-decoration: none;
        color: white;
    }

    .actions {
        padding: 10px 0;
    }

    a:not([href]):not([tabindex]) {
        text-decoration: none;
    }

</style>