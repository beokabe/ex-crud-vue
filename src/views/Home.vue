<template>
    <div id="main" class="container-fluid">

        <section class="produtos">
            <ul class="produto-card-group">
                <li class="card" v-for="produto in produtos" :key="produto.id">
                    <p class="produtoId hidden"></p>

                    <img class="produto-img" :src="produto.urlImg">

                    <div class="produto-nome">
                        <h3>{{produto.nome}}</h3>
                    </div>

                    <div class="produto-categoria">
                        <h4>{{produto.categoria.nome}}</h4>
                        <p class="produto-categoriaId hidden">{{produto.id}}</p>
                    </div>

                    <div class="produto-descricao">
                        <p>{{produto.descricao}}</p>
                    </div>

                    <div class="produto-quantidade">
                        <h4>Disponível: {{produto.quantidade}}</h4>
                    </div>

                    <div class="produto-preco">
                        <p>R$ {{produto.valorDeVenda}}</p>
                    </div>

                    <div class="produto-custo hidden">
                        <p>{{produto.custo}}</p>
                    </div>

                    <div class="produto-botao" @click="comprarProduto(produto.id)">Comprar</div>
                </li>
            </ul>
        </section>
    </div>
</template>

<script>
    import crud from '../js/crud'

    export default {
        name: "Home",
        data() {
            return {
                URL: 'http://192.168.0.112:8081/albus/produto/',
                produtos: [],
            }
        },
        created() {
            this.carregarProdutos()
        },
        methods: {
            carregarProdutos() {

                this.produtos = []

                crud.getItens("produto")
                    .then(response => this.produtos = response.data)
                    .catch(function (error) {
                        console.log(error.status);
                    });
            },

            comprarProduto(id) {

                this.pegarProduto(id)
                    .then(response => {
                        this.produto = response.data;
                        this.produto.quantidade--;
                        crud.updateItem("produto", this.produto);
                        this.carregarProdutos();
                    })
                    .catch(function (error) {
                        console.log(error.status);
                    });
            },

            async pegarProduto(id) {
                return await crud.getItem("produto", id);
            }
        }
    }
</script>

<style scoped>
    #main {
        margin: 20px 0;
    }

    header {
        margin-bottom: 20px;
    }

    h1 {
        font-size: 37px;
    }

    ul li {
        list-style: none;
    }

    .produtos {
        width: 90%;
        margin: 15px auto auto;
        display: grid;
    }

    .card {
        border: 2px solid rgba(0, 0, 0, 0.5);
        box-sizing: border-box;
        padding: 10px;
        margin-bottom: 36px;
    }

    .card .hidden {
        display: none;
    }

    .card img {
        max-width: 100%;
    }

    .produto-nome, .produto-categoria {
        text-transform: capitalize;
    }

    .produto-quantidade {
        margin-top: 5px;
    }

    .card .produto-descricao {
        width: 90%;
        text-align: justify;
        letter-spacing: 0.6px;
        margin: auto;
        font-size: 16px;
    }

    .card .produto-preco {
        color: #388E3C;
        font-size: 18px;
        font-weight: bolder;
    }

    .produto-botao, .botao {
        background: #56709D;
        border: 0;
        border-radius: 5px;
        color: #fff;
        display: inline-block;
        text-align: center;
        text-decoration: none;
        font-size: 17px;
        cursor: pointer;
        font-family: 'Pacifico', cursive;
        position: relative;
        transition: filter cubic-bezier(0, 1.6, 1, -0.47);
        padding: 6px;
    }

    .produto-botao {
        max-width: 100%;
        line-height: 35px;
        padding: 10px;
    }

    .botao:hover,
    .produto-botao:hover,
    .filtro-btn:hover {
        filter: opacity(0.7);
    }

    @media screen and (min-width: 846px) {
        .filtro {
            text-align: right;
        }

        .produto-card-group {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            grid-gap: 20px;
        }

        .card {
            width: 14% / 90%;
            margin: 0;
        }

        .card .produto-descricao {
            width: 90%;
            padding: 0px 5px;
        }
    }
</style>