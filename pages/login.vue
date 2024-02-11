<template>
    <div v-if="!redirect" style="max-width: 300px; padding: 2rem; margin:auto">
        <div class="dflex flex-col flex-nowrap space-y-1 align-center justify-center">

            <v-btn class="text-none color-green" @click="signinRedirect()" style="margin-bottom: 1rem;">
                <img width="25px" height="25px" class="mr-3" src="/google.png" />Sign In with Google
            </v-btn>
            <v-divider class="my-3"></v-divider>

            <v-text-field variant="underlined" v-model="email" label="Email"></v-text-field>
            <v-text-field variant="underlined" v-model="password" label="password" type="password"></v-text-field>

            <v-btn :color="themeColor" @click="signUpWithPassword()" class="text-none w-100">Sign Up</v-btn>
            <v-btn :color="themeColor" @click="signInWithPassword()" class="text-none w-100">Sign In</v-btn>
            <v-btn :color="themeColor" @click="forgetPassword()" class="text-none w-100">Forget Passowrd</v-btn>

            <p v-if="error" style="color: red;">{{ error }}</p>
            <p v-if="info">{{ info }}</p>
        </div>
    </div>
    <div v-else>Redirecting</div>
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
definePageMeta({
    layout: 'login'
})
const appConfig = useAppConfig()
const themeColor = appConfig.theme.primaryColor
const auth = useFirebaseAuth() // only exists on client side
const error = ref(null)
const info = ref(null)
const email = ref('chaoran.liu@icloud.com')
const password = ref('Meinanzi110')
const redirect = ref(false)
const signinRedirect = () => {
    redirect.value = true
    signInWithRedirect(auth, googleAuthProvider).then((cred) => {
        if (cred) {
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
                if (user.emailVerified) {
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
            if (userCredential) {
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
if (cred) {
    navigateTo('/')
}

</script>