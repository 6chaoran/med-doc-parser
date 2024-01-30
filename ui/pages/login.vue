<template>
    <div style="margin: auto; width: 300px; padding: 2rem;" v-if="!redirect">
        <div style="display: flex; flex-direction: column; justify-content: center; max-width: 400px;">
            <button @click="signinRedirect()" style="margin-bottom: 1rem;">Sign In with Google</button>
            Email:<input type="text" v-model="email">
            Password:<input type="password" v-model="password">
            <button @click="signUpWithPassword()" style="margin-top: 1rem; margin-bottom: 0.5rem;">Sign Up</button>
            <button @click="signInWithPassword()" style="margin-bottom: 1rem;">Sign In</button>
            <button @click="forgetPassword()" style="margin-bottom: 1rem;">Forget Passowrd</button>
            <p v-if="error" style="color: red;">{{ error }}</p>
            <p v-if="info">{{ info }}</p>
        </div>
    </div>
    <div v-if="redirect">Redirecting</div>
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
const error = ref(null)
const info = ref(null)
const email = ref('chaoran.liu@icloud.com')
const password = ref('Meinanzi110')
const redirect = ref(false)
const signinRedirect = () => {
    redirect.value = true
    signInWithRedirect(auth, googleAuthProvider).then((cred) => {
        if(cred){
            console.log(cred)
            navigateTo('/')
        }
    }).catch((reason) => {
        console.error('Failed sign', reason)
        error.value = reason
    })
}

const signInWithPassword = () => {
    console.log('Sign In')
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)
            if (user) {
                if (user.emailVerified){
                    navigateTo('/')
                } else {
                    info.value = "Please check your inbox to verify your email."
                }
            }
            // ...
        })
        .catch((e) => {
            const errorCode = e.code;
            const errorMessage = e.message;
            error.value = errorMessage
        });
}

const signUpWithPassword = () => {
    createUserWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            // Signed up 
            if(userCredential){
                const user = userCredential.user;
                sendVerifyEmail(user)
                info.value = "Please check your inbox to verify your email before signing in."
            }

            // ...
        })
        .catch((e) => {
            error.value = e
        });

}

const forgetPassword = () => {
    sendUserPasswordResetEmail(auth, email.value)
}

const cred = await getRedirectResult(auth)
if(cred){
    navigateTo('/')
}

</script>