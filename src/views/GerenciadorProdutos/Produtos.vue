<template>
    <div id="produto-list">
        <div class="actions">
            <a class="btn btn-success" data-target="#editarProduto"
               @click="atribuirProduto(produto)" data-toggle="modal" tabindex="1">
                Adicionar Novo Produto
            </a>
        </div>

        <table class="table">
            <thead>
            <tr>
                <th>Id</th>
                <th>Nome</th>
                <th>produto</th>
                <th>Quantidade</th>
                <th>Custo</th>
                <th>Valor Venda</th>
                <th>URL IMG</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="produto in produtos" :key="produto">
                <td>
                    {{produto.id}}
                </td>
                <td>
                    {{produto.nome}}
                </td>
                <td>{{ produto.descricao }}</td>
                <td>
                    {{ produto.quantidade }}
                </td>
                <td>
                    {{ produto.custo }}
                </td>
                <td>
                    {{ produto.valorDeVenda }}
                </td>
                <td>
                    {{ produto.urlImg }}
                </td>
                <td>
                    <a class="btn btn-warning btn-xs" data-toggle="modal" data-target="#editarProduto"
                       @click="atribuirProduto(produto)">Editar</a>
                    <a tabindex="1" class="btn btn-danger btn-xs" @click="deletarProduto(produto.id)">Deletar</a>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- Modal Editar Item -->
        <div class="modal fade" id="editarProduto" role="dialog">
            <div class="modal-dialog">

                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Editar Produto</h4>
                        <button type="button" class="close" data-dismiss="modal" @click="limparProduto()">&times;
                        </button>
                    </div>
                    <div class="modal-body">

                        <div>
                            <div class="form-group" v-show="produto.id">
                                <label for="id">ID</label>
                                <input type="text" class="form-control" id="id"
                                       name="id" required v-model="produto.id" disabled>
                            </div>
                            <div class="form-group">
                                <label for="nome">Nome</label>
                                <input type="text" class="form-control" id="nome"
                                       name="nome" required v-model="produto.nome">
                            </div>
                            <div class="form-group">
                                <label for="categoria">Categoria</label>
                                <input type="text" class="form-control" id="categoria"
                                       name="nome" required v-model="produto.categoria.id">
                            </div>
                            <div class="form-group">
                                <label for="quantidade">Quantidade</label>
                                <input type="text" class="form-control" id="quantidade"
                                       name="quantidade" required v-model="produto.quantidade">
                            </div>
                            <div class="form-group">
                                <label for="descricao">Descricao</label>
                                <input type="text" class="form-control" id="descricao"
                                       name="descricao" required v-model="produto.descricao">
                            </div>
                            <div class="form-group">
                                <label for="custo">Custo</label>
                                <input type="text" class="form-control" id="custo"
                                       name="custo" required v-model="produto.custo">
                            </div>
                            <div class="form-group">
                                <label for="valorDeVenda">Valor Venda</label>
                                <input type="text" class="form-control" id="valorDeVenda"
                                       name="valorDeVenda" required v-model="produto.valorDeVenda">
                            </div>
                            <div class="form-group">
                                <label for="urlImg">Url da Imagem</label>
                                <input type="text" class="form-control" id="urlImg"
                                       name="urlImg" required v-model="produto.urlImg">
                            </div>
                            <div>
                                <button @click="salvar()" class="btn btn-primary" data-dismiss="modal">
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal" @click="limparProduto()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>
    import crud from "../../js/crud";

    export default {
        nome: "Produtos",

        data() {
            return {
                produtos: [],
                produto: this.criarProdutoVazio(),
            }
        },

        created() {
            this.carregarProdutos();
        },

        methods: {
            carregarProdutos() {
                crud.getItens("produto")
                    .then(response => this.produtos = response.data)
                    .catch(function (error) {
                        console.log(error.status);
                    });
            },

            deletarProduto(id) {
                crud.deletar("produto", id).then(() => {
                    this.limparProduto();
                    this.carregarProdutos();
                });
            },

            atribuirProduto(produto) {
                this.produto = produto;
            },

            salvar() {

                if(!this.produto.nome || !this.produto.categoria.id || !this.produto.quantidade
                    || !this.produto.custo || !this.produto.valorDeVenda) {
                    alert("Preencha todos os campos obrigatórios!")
                    return;
                }

                if (this.produto.id) {
                    crud.updateItem('produto', this.produto)
                        .then(() => {
                            this.limparProduto();
                        }).catch(function (error) {
                        console.log(error);
                    });
                } else {
                    crud.postItem('produto', this.produto)
                        .then(() => {
                            this.limparProduto();
                            this.carregarProdutos();
                        }).catch(function (error) {
                        console.log(error);
                    });
                }
            },
            limparProduto() {
                this.produto = this.criarProdutoVazio();
            },

            criarProdutoVazio() {
                return {
                    id: '',
                    nome: '',
                    categoria: {
                        id: ''
                    },
                    quantidade: '',
                    descricao: '',
                    custo: '',
                    valorDeVenda: '',
                    urlImg: ''
                }
            },
        }
    }

</script>

<style scoped>
    #produto-list {
        width: 80%;
        position: relative;
        left: 13%;
        font-size: 20px;

    }

    a, #produto-list {
        font-size: 16px;
    }

    a {
        text-decoration: none;
        color: white;
    }

    .actions {
        padding: 10px 0;
    }
</style>