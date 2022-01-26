<template>
  <nav>
    <ul>
      <li v-for="rota in rotas" :key="rota.titulo">
        <router-link v-bind:to="rota.path ? rota.path : '/'">{{ rota.titulo }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>

export default {
  props: {
    rotas: {
      required: true,
    }
  }
}
</script>

<style scoped>

</style>
