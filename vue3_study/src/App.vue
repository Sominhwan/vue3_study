
// 데이터 바인딩
<!-- <template>
  <div>
    <div :class="nameClass">{{ name }}</div>
    <div>{{ name2 }}</div>
    <input :value="name" :type="type">
    <button class="btn btn-primary" @click="updateName()">Click1</button>
    <button class="btn btn-primary" @click="updateName2()">Click2</button>
  </div>
</template>

<script>
import { reactive, ref } from 'vue';
export default {
  setup() {
    const name = ref('Hello World!');
    const name2= reactive({
      id: 1
    });
    const type = ref('number');
    const nameClass = ref('name');
    // const greeting = (name) => {
    //   return 'Hello, ' + name;
    // };

    const updateName = () => {
      name.value = 'Hello World2';
      type.value = 'text';
    };
    const updateName2 = () => {
    name2.id = 2;
    console.log(name2);
    };

    return {
      name, name2, updateName, updateName2, type, nameClass
    };
  }
}

</script>
<style scoped>
  .name {
    color: red;
  }
</style> -->

// 양방향 데이터 바인딩
<!-- <template>
  <div>
    <input 
      type="text"
      :value="name"
      @input="updateName"
    >
    <button class="btn btn-primary" @click="onSubmit">Click1</button>
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const name = ref('Hello World!');


    const onSubmit = () => {
      console.log(name.value);
    };
    const updateName = (e) => {
      name.value = e.target.value
    };

    return {
      name, 
      onSubmit,
      updateName
    };
  }
}

</script>
<style scoped>
  .name {
    color: red;
  }
</style> -->

// Todo List
<!-- <template>
  <div class="container">
    <h2>To-Do List</h2>
    <form 
      @submit.prevent="onSubmit"
      class="d-flex"
    >
        <div class="flex-grow-1 mr-2">
          <input 
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="Type new to-do"
          >
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
    </form>
    <div class="card mt-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body p-2">
        {{ todo.subject }}
      </div>
    </div>   
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const todo = ref('');
    const todos = ref([
      { id: 1, subject: '휴대폰 사기' },
      { id: 2, subject: '장보기' },
    ]);


    const onSubmit = () => {
      todos.value.push({
        id: Date.now(),
        subject: todo.value
      });
    };
    const updateName = (e) => {
      name.value = e.target.value
    };

    return {
      todo, 
      onSubmit,
      updateName,
      todos
    };
  }
}

</script>
<style scoped>
  .name {
    color: red;
  }
</style> -->

// v-if, v-show, checkbox
<template>
  <div class="container">
    <h2>To-Do List</h2>
    <form 
      @submit.prevent="onSubmit"
      
    >
    <div class="d-flex">
      <div class="flex-grow-1 mr-2">
          <input 
            class="form-control"
            type="text"
            v-model="todo"
            placeholder="Type new to-do"
          >
        </div>
        <div>
          <button class="btn btn-primary" type="submit">Add</button>
        </div>
        <div v-show="hasError" style="color: red;">
          This field cannot be empty
        </div>
    </div>

    </form>
    <div class="card mt-2" v-for="todo in todos" :key="todo.id">
      <div class="card-body p-2">
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="todo.completed">
          <label class="form-check-label" :class="{ todo: todo.completed }">{{ todo.subject }}</label>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
import { ref } from 'vue';
export default {
  setup() {
    const toggle = ref(false);
    const todo = ref('');
    const todos = ref([

    ]);
    const hasError = ref(false);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const onSubmit = () => {
      if(todo.value === '') {
        hasError.value = true;
      } else {
        todos.value.push({
          id: Date.now(),
          subject: todo.value,
          completed: false,
        });
        hasError.value = false;
        todo.value = '';
      }
    };
    const updateName = (e) => {
      name.value = e.target.value
    };

    const onToggle = () => {
      toggle.value = !toggle.value;
    }

    return {
      todo, 
      onSubmit,
      updateName,
      todos,
      toggle,
      onToggle,
      hasError,
      todoStyle
    };
  }
}

</script>
<style scoped>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>