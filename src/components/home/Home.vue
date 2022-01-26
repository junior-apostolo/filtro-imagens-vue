<template>
  <div>
    <h1 class="centralizado">Lista de Imagens</h1>

    <p class="centralizado">{{ msg }}</p>

    <input type="search" class="filtro" @input="filtro = $event.target.value" placeholder="filtre pelo titulo">
    <input type="text" @input="nome = $event.target.value">
    <p>{{ texto }}</p>

    <ul class="lista-fotos">
      <li class="lista-fotos-item" v-for="foto of fotosComFiltro" :key="foto._id">

        <meu-painel :titulo="foto.titulo">
          <imagem-responsiva
            :url="foto.url"
            :titulo="foto.titulo"
            v-transform:rotate.animate.reverse="1.2">
          </imagem-responsiva>

          <router-link :to="{name:'altera',params:{id:foto._id}}">
            <meu-botao rotulo="ALTERAR" tipo="button"/>
          </router-link>

          <meu-botao
            tipo="button"
            rotulo="REMOVER"
            @botaoAtivado="remove(foto)"
            :confirmacao="true"
            estilo="perigo">

          </meu-botao>
        </meu-painel>

      </li>
    </ul>

  </div>
</template>

<script>
import Painel from '../shared/painel/Painel';
import ImagemResponsiva from '../shared/imagem-responsiva/imagemResponsiva';
import Botao from '../shared/botao/Botao'
import transform from '../../directives/Transform'
import FotoService from '../../domain/foto/FotoService'

export default {

  components: {
    'meu-painel': Painel,
    'imagem-responsiva': ImagemResponsiva,
    'meu-botao': Botao
  },

  directives: {
    'transform': transform
  },

  data() {
    return {
      msg: '',
      fotos: [],
      filtro: '',
      nome: ''
    };
  },

  computed: {
    fotosComFiltro() {
      if (this.filtro) {
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.fotos.filter(foto => exp.test(foto.titulo))

      } else {
        return this.fotos
      }
    },

    texto() {
      return `o nome ${this.nome} possui ${this.nome.length} caracteres`
    },

  },

  methods: {
    remove(foto) {

      this.service
        .apaga(foto._id)
        .then(() => {
            let indice = this.fotos.indexOf(foto);
            this.fotos.splice(indice, 1)
            this.msg = "foto removida com sucesso"
          },
          err => this.msg = err.message)

      // this.$http
      //   .delete(`v1/fotos/${foto._id}`)
      //   .then(() => {
      //       let indice = this.fotos.indexOf(foto);
      //       this.fotos.splice(indice, 1)
      //       this.msg = "foto removida com sucesso"
      //     },
      //     err => {
      //       console.log(err)
      //       this.msg = "nao foi possivel remover a foto"
      //     })
    },
  },

  created() {

    // criando um recurso para consumir API.
    // this.resource = this.$resource('v1/fotos{/id}')

    this.service = new FotoService(this.$resource)

    // MÉTODO QUERY pode ser usado como método get() para listar e trazer os dados.
    this.service
      .lista()
      .then(fotos => this.fotos = fotos, err => this.msg = err.message)

    // this.$http.get('v1/fotos')
    //   .then(res => res.json())
    //   .then(fotos => this.fotos = fotos, err => console.log(err))
  },

};
</script>

<style>
.centralizado {
  text-align: center;
}

.lista-fotos {
  list-style: none;
}

.lista-fotos .lista-fotos-item {
  display: inline-block;
}

.filtro {
  display: block;
  width: 100%;
}

</style>
