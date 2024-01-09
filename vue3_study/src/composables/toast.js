import { onUnmounted, ref } from 'vue';

export const userToast = () => {
    const toastMessage = ref('');
    const toastAlertType = ref('');
    const showToast = ref(false);
    const timeout = ref(null);

    const triggerToast = (message, type = 'success') => {
        toastMessage.value = message;
        toastAlertType.value = type;
        showToast.value = true;
        timeout.value = setTimeout(() => {
            console.log('hello');
            toastMessage.value = '';
            toastAlertType.value = '';
            showToast.value = false;
        }, 5000)
    };

    onUnmounted(() => {
        console.log('unmounted');
        clearTimeout(timeout.value);
    });

    return {
        toastMessage,
        toastAlertType,
        showToast,
        triggerToast
    }
}