<template>
    <div v-if="loading">
    Loading...
    </div>
    <form 
        v-else
        @submit.prevent="onSave"
    >
        <div class="row">
            <div class="col-6">
                <div class="form-group">
                    <label>Subject</label>
                    <input 
                        v-model="todo.subject" 
                        type="text" 
                        class="form-control"
                    >
                </div>
            </div>
            <div class="col-12">
                <div class="form-group">
                    <label>Body</label>
                    <textarea v-model="todo.body" class="form-control" name="" id="" cols="30" rows="10">

                    </textarea>
                </div>
            </div>
        </div>
        <button 
            type="submit" 
            class="btn btn-primary"
            :disabled="!todoUpdated"
        >
            {{ editing ? 'Update' : 'Create' }}
        </button>
        <button 
            class="btn btn-outline-dark ml-2"
            @click="mopeToTodoListPage"
        >
            Cancel
        </button>
    </form>
    <Toast 
        v-if="showToast"
        :message="toastMessage"
        :type="toastAlertType"
    />
</template>

<script>
import Toast from '@/components/Toast.vue';
import { userToast } from '@/composables/toast.js';
import { computed, ref } from '@vue/reactivity';
import axios from 'axios';
import _ from 'lodash';
import { useRoute, useRouter } from 'vue-router';

export default {
    components :{
        Toast
    },
    props: {
        editing: {
            type: Boolean,
            default: false
        }
    },  
    setup(props) {
        // onBeforeMount(() => {
        //     console.log(document.querySelector('#kossie')); 
        // });
        // onMounted(() => {
        //     console.log(document.querySelector('#kossie')); 
        // });
        // onBeforeUpdate(() => {
        //    console.log('beforeUpdated'); 
        // });
        // onUpdated(() => {
        //     console.log('updated');
        // }),
        // onBeforeUnmount(() => {
        //    console.log('before unmount'); 
        // });
        const route = useRoute();
        const router = useRouter();
        const todo = ref({
            subject: '',
            completed: false,
            body: ''
        });
        const subjectError = ref('');
        const originalTodo = ref(null);
        const loading = ref(false);
        const todoId = route.params.id


        const {
            toastMessage,
            toastAlertType ,
            showToast,
            triggerToast
        } = userToast();

        const getTodo = async () => {
            loading.value = true;
            try {
                const res = await axios.get(`http://localhost:3001/todos/${todoId}`)

                todo.value = { ...res.data};
                originalTodo.value = { ...res.data};
                loading.value = false;
            } catch (error) {
                loading.value = false;
                console.log(error);
                triggerToast('Something went wrong', 'danger');
            }

        }

        const todoUpdated = computed(() => {
            return !_.isEqual(todo.value, originalTodo.value)
        });

        const toggleTodoStatus = () => {
            todo.value.completed = !todo.value.completed;
        };

        const mopeToTodoListPage = () => {
            router.push({
                name: 'Todos'
            })
        };

        if(props.editing) {
            getTodo();
        }


        const onSave = async () => {
            if(!todo.value.subject) {
                subjectError.value = 'Subject is required';
                return;
            }
            try {
                let res;
                const data = {
                    subject: todo.value.subject,
                    completed: todo.value.completed,
                    body: todo.value.body
                };
                if(props.editing) {
                    res = await axios.put(`http://localhost:3001/todos/${todoId}`, {
                        data
                    });
                    originalTodo.value = {...res.data};
                } else {
                    res = await axios.post(`http://localhost:3001/todos`, {
                        data
                    });
                    todo.value.subject = '';
                    todo.value.body = '';
                }
                
                triggerToast('Sucessfully saved!');   
                const message = 'Successfully ' + (props.editing ? 'Updated' : 'Created');  
                triggerToast(message)              
            } catch (error) {
                console.log(error);
                triggerToast('Something went wrong', 'danger')
            }
       
        };

        return {
            todo,
            loading,
            toggleTodoStatus,
            mopeToTodoListPage,
            onSave,
            originalTodo,
            todoUpdated,
            showToast,
            toastMessage,
            toastAlertType
        };
    }
}
</script>

<style>

</style>