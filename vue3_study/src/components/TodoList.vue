<template>
    <div class="card mt-2" v-for="(todo, index) in todos" :key="todo.id">
      <div 
        class="card-body p-2 d-flex alingn-items-center" 
        @click="movetoPage(todo.id)"
        style="cursor: pointer;"  
      >
        <div class="form-check flex-grow-1">
          <input 
            class="form-check-input" 
            type="checkbox" 
            :checked="todo.completed"
            @change="toggleTodo(index, $event)"
            @click.stop  
          >
          <label class="form-check-label" :class="{ todo: todo.completed }">{{ todo.subject }}</label>
        </div>
        <div>
          <button class="btn btn-danger btn-sm"
            @click.stop="deleteTodo(index)">
            Delete
          </button>
        </div>
      </div>
    </div>    
</template>

<script>
import { useRouter } from 'vue-router';
export default {
  emits: ['toggle-todo', 'delete-todo'],
  props: {
      todos: {
          type: Array,
          required: true
      }
  },
  setup(props, { emit }) {
    const router = useRouter();
    const toggleTodo = (index, event) => {
      emit('toggle-todo', index, event.target.checked);
    };

    const deleteTodo = (index) => {
      emit('delete-todo', index);
    };

    const movetoPage = (todoId) => {
      console.log(todoId);
      // router.push('/todos/' + todoId);
      router.push({
        name: 'Todo',
        params: {
          id: todoId
        }
      });
    };

    return {
        toggleTodo,
        deleteTodo,
        movetoPage
    }
  }
}
</script>

<style scoped>
  .todo {
    color: gray;
    text-decoration: line-through;
  }
</style>