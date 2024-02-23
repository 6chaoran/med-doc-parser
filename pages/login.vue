<template>
  <!--
      This example requires updating your template:
  
      ```
      <html class="h-full bg-gray-50">
      <body class="h-full">
      ```
    -->
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class=" sm:mx-auto sm:w-full sm:max-w-md">
      <!-- <img class="mx-auto h-14 w-auto rounded-full" src="/logo.jfif" alt="Your Company" /> -->
      <h2 class="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <!-- <form class="space-y-6" action="#" method="POST"> -->
        <div class="space-y-1">
          <div>
            <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
            <div class="mt-2">
              <!-- <input id="email" name="email" type="email" autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
              <v-text-field id="email" variant="outlined" density="compact" v-model="email"></v-text-field>
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-2">
              <!-- <input id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" /> -->
              <v-text-field id="password" variant="outlined" density="compact" v-model="password"
                type="password"></v-text-field>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox"
                class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              <label for="remember-me" class="ml-3 block text-sm leading-6 text-gray-900">Remember me</label>
            </div>

            <div class="text-sm leading-6">
              <button @click="forgetPassword" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot
                password?</button>
            </div>
          </div>

          <div>
            <button @click="signInWithPassword"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign
              in</button>
          </div>
          <div v-if="info">
            {{ info }}
          </div>
          <div v-if="error">
            {{ error }}
          </div>
        </div>
        <!-- </form> -->

        <div>
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200" />
            </div>
            <div class="relative flex justify-center text-sm font-medium leading-6">
              <span class="bg-white px-6 text-gray-900">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <a @click="signInWithGoogle" type="button"
              class="flex items-center justify-center gap-3 rounded-md border-[1px] border-gray-500 py-1.5 px-3">
              <img src="/google.png" class="h-5 w-5">
              <span class="text-sm font-semibold leading-6">Google</span>
          </a>


            <a @click="signInWithGitHub" type="button"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]">
              <svg class="h-5 w-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clip-rule="evenodd" />
              </svg>
              <span class="text-sm font-semibold leading-6">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Not a member?
        {{ ' ' }}
        <a href="/signup" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Sign up from here</a>
      </p>
    </div>
  </div>
</template>
  


<script>

import { GoogleAuthProvider, GithubAuthProvider } from 'firebase/auth'
export const googleAuthProvider = new GoogleAuthProvider()
export const githubAuthProvider = new GithubAuthProvider()
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
  layout: 'blank'
})
const appConfig = useAppConfig()
const themeColor = appConfig.theme.primaryColor
const auth = useFirebaseAuth() // only exists on client side
const error = ref(null)
const info = ref(null)
const email = ref('chaoran.liu@icloud.com')
const password = ref('Meinanzi110')
const redirect = ref(false)
const signInWithGoogle = () => {
  redirect.value = true
  signInWithRedirect(auth, googleAuthProvider).then((cred) => {
    if (cred) {
      console.log(cred)
      navigateTo('/result')
    }
  }).catch((reason) => {
    console.error('Failed sign', reason)
    error.value = reason
  })
}

const signInWithGitHub = () => {
  redirect.value = true
  signInWithRedirect(auth, githubAuthProvider).then((cred) => {
    if (cred) {
      console.log(cred)
      navigateTo('/result')
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
          navigateTo('/result')
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
  info.value = null
  sendUserPasswordResetEmail(auth, email.value)
  info.value = 'An E-mail is sent to you to reset the password'
}

const cred = await getRedirectResult(auth)
if (cred) {
  navigateTo('/result')
}

</script>