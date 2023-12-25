<template>
  <div>
    <div>{{ name }}</div>
    <div>{{ name2 }}</div>
    <button class="btn btn-primary" @click="updateName()">Click1</button>
    <button class="btn btn-primary" @click="updateName2()">Click2</button>
  </div>
</template>

<script setup>
  import { reactive, ref } from 'vue';

  const name = ref('Hello World!');
  const name2= reactive({
    id: 1
  });
  // const greeting = (name) => {
  //   return 'Hello, ' + name;
  // };

  const updateName = () => {
   name.value = 'Hello World2'
   console.log(name);
  }
  const updateName2 = () => {
   name2.id = 2;
   console.log(name2);
  }
</script>
<style scoped>
  .name {
    color: red;
  }
</style>