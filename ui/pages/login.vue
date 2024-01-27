<template>
    <div style="margin: auto; width: 300px; padding: 2rem;">
        <div style="display: flex; flex-direction: column; justify-content: center; max-width: 400px;">
            <button @click="signinRedirect()" style="margin-bottom: 1rem;">Sign In with Google</button>
            Email:<input type="text" v-model="email">
            Password:<input type="password" v-model="password">
            <button @click="signUpEmailPassword()" style="margin-top: 1rem; margin-bottom: 0.5rem;">Sign Up</button>
            <button @click="signinRedirectPassword()" style="margin-bottom: 1rem;">Sign In</button>
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
    signInWithPopup,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from 'firebase/auth'

const auth = useFirebaseAuth() // only exists on client side
const error = ref('')
const email = ref('chaoran.liu@icloud.com')
const password = ref('Meinanzi110')

const signinRedirect = () => {
    signInWithRedirect(auth, googleAuthProvider).then((cred) => {
        console.log(cred)
    }).catch((reason) => {
        console.error('Failed sign', reason)
        error.value = reason
    })
    // signInWithPopup(auth, googleAuthProvider).catch( (e) => {
    //     console.error('Fail sign', e)
    //     error.value = e
    // })
}

const signinRedirectPassword = () => {
    console.log('Sign In')
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            if (user) {
                navigateTo('/')
            }
            // ...
        })
        .catch((e) => {
            const errorCode = e.code;
            const errorMessage = e.message;
            error.value = errorMessage
        });
}

const signUpEmailPassword = async () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((e) => {
            const errorCode = e.code;
            const errorMessage = e.message;
            error.value = e.message
        });

}

onMounted(() => {
    getRedirectResult(auth).then((cred) => {
        console.log(cred)
        if (cred) {
            navigateTo('/')
        }
    }
    ).catch((reason) => {
        console.error('Failed redirect result', reason)
        error.value = reason
    })
})

</script>