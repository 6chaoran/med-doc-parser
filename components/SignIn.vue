<!-- 交流QQ群:七5457三7七8 -->
<!--
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
-->
<template>
    <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-white">
      <body class="h-full">
      ```
    -->
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
        <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
                <v-text-field id="email" density="compact" variant="outlined" v-model="email"></v-text-field>
            </div>
          </div>
  
          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
              <div class="text-sm">
                <v-btn @click="forgetPassword" variant="text" class="text-none"><a  class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a></v-btn>
                
              </div>
            </div>
            <div class="mt-2">
                <v-text-field id="password" density="compact" variant="outlined" type="password" v-model="password"></v-text-field>
            </div>
          </div>
  
          <div>
            <button @click="signInWithPassword" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          {{ ' ' }}
          <a href="#" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        </p>
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
            // if (user) {
            //     if (user.emailVerified) {
            //         navigateTo('/')
            //     } else {
            //         info.value = "Please check your inbox to verify your email."
            //     }
            // }
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