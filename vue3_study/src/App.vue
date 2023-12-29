
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

// v-if, v-show, checkbox, 배열 아이템 삭제
<!-- <template>
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
    <div v-if="!todos.length">
      추가된 Todo 가 없습니다
    </div>
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
      <div class="card-body p-2 d-flex alingn-items-center">
        <div class="form-check flex-grow-1">
          <input class="form-check-input" type="checkbox" v-model="todo.completed">
          <label class="form-check-label" :class="{ todo: todo.completed }">{{ todo.subject }}</label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm"
            @click="deleteTodo(index)">
            Delete
          </button>
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
    
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    return {
      todo, 
      onSubmit,
      updateName,
      todos,
      toggle,
      onToggle,
      hasError,
      todoStyle,
      deleteTodo
    };
  }
}

</script>
<style scoped>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style> -->

// props, emit, computed(캐싱처리)
<!-- <template>
  <div class="container">
    <h4>count: {{ count }}</h4>
    <h4>double count computed: {{ doubleCountComputed }}</h4>
    <h4>double count computed: {{ doubleCountComputed }}</h4>
    <h4>double count method: {{ doubleCountMethod() }}</h4>
    <h4>double count method: {{ doubleCountMethod() }}</h4>
    <button @click="count++">Add One</button>
    <h2>To-Do List</h2>
    <TodoSimpleFormVue @add-todo="addTodo"/>

    <div v-if="!todos.length">
      추가된 Todo 가 없습니다
    </div>
    <TodoListVue :todos="todos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import TodoListVue from './components/TodoList.vue';
import TodoSimpleFormVue from './components/TodoSimpleForm.vue';

export default {
  components: {
    TodoSimpleFormVue,
    TodoListVue
  },
  setup() {
    const toggle = ref(false);
    const todos = ref([

    ]);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const addTodo = (todo) => {
      console.log(todo);
      todos.value.push(todo);
    };

    const toggleTodo = (index) => {
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    };

    const updateName = (e) => {
      name.value = e.target.value
    };

    const onToggle = () => {
      toggle.value = !toggle.value;
    }
    
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const count = ref(1);
    const doubleCountComputed = computed(() => {
      console.log('computed')
      return count.value * 2;
    });

    const doubleCountMethod = () => {
      console.log('method')
      return count.value * 2;
    }

    return {
      addTodo,
      toggleTodo,
      updateName,
      todos,
      toggle,
      onToggle,
      todoStyle,
      deleteTodo,
      count,
      doubleCountComputed,
      doubleCountMethod
    };
  }
}

</script>
<style scoped>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style> -->

// 검색기능
<template>
  <div class="container">
    <h2>To-Do List</h2>
    <input 
        class="form-control"
        type="text"
        v-model="searchText"
        placeholder="Search"
    >
    <hr/>


    <TodoSimpleFormVue @add-todo="addTodo"/>
    <div v-if="!filteredTodos.length">
      There is nothing to dislplay
    </div>

    <!-- <div v-if="!todos.length">
      추가된 Todo 가 없습니다
    </div> -->
    <TodoListVue :todos="filteredTodos" @toggle-todo="toggleTodo" @delete-todo="deleteTodo"/>
  </div>
</template>

<script>
import { computed, ref } from 'vue';
import TodoListVue from './components/TodoList.vue';
import TodoSimpleFormVue from './components/TodoSimpleForm.vue';

export default {
  components: {
    TodoSimpleFormVue,
    TodoListVue
  },
  setup() {
    const toggle = ref(false);
    const todos = ref([

    ]);
    const todoStyle = {
      textDecoration: 'line-through',
      color: 'gray'
    }

    const addTodo = (todo) => {
      console.log(todo);
      todos.value.push(todo);
    };

    const toggleTodo = (index) => {
      console.log(todos.value[index]);
      todos.value[index].completed = !todos.value[index].completed;
      console.log(todos.value[index]);
    };

    const updateName = (e) => {
      name.value = e.target.value
    };

    const onToggle = () => {
      toggle.value = !toggle.value;
    }
    
    const deleteTodo = (index) => {
      todos.value.splice(index, 1);
    };

    const searchText = ref('');
    const filteredTodos = computed(() => {
      if(searchText.value) {
        return todos.value.filter(todo => {
          return todo.subject.includes(searchText.value);
        });
      }

      return todos.value;
    });

    return {
      addTodo,
      toggleTodo,
      updateName,
      todos,
      toggle,
      onToggle,
      todoStyle,
      deleteTodo,
      searchText,
      filteredTodos
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