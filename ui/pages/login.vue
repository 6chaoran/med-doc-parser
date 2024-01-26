<template>
    <div style="display: flex; flex-direction: row; justify-content: center; ">
        <div style="display: flex; flex-direction: column; justify-content: center; max-width: 400px;">
        <button @click="signinRedirect()">SignIn with Google</button>
        <p v-if="error">{{ error }}</p>
    </div>
    </div>

</template>

<script>
import { GoogleAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
</script>

<script setup>
import {
    getRedirectResult,
    signInWithRedirect,
    signOut,
    signInWithPopup,

} from 'firebase/auth'

const auth = useFirebaseAuth() // only exists on client side
const error = ref('')

const signinRedirect = () => {
    error.value = null
    signInWithRedirect(auth, googleAuthProvider).catch((reason) => {
        console.error('Failed sign', reason)
        error.value = reason
    })
}

onMounted(() => {
    getRedirectResult(auth).catch((reason) => {
        console.error('Failed redirect result', reason)
        error.value = reason
    }).finally(() => {
        const user = getCurrentUser()
        if (user) {
            navigateTo('/')
        }
    })
})

</script>