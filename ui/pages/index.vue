<template>
    <div v-if="user" id="userPanel" style="display: flex; flex-direction: column; align-items: flex-end;">
        <img :src="user.photoURL ?? '/images.jfif'" alt="avatar" referrerpolicy="no-referrer" width="50px" height="50px"
            style="border-radius: 50%;">
        <p>{{ user.displayName ?? user.email }}</p>
        <button @click="signout">Sign Out</button>
    </div>
    Query: <input v-model="query"><button @click="chat">send</button><br>
    {{ resp }}

</template>
<script setup>
import { signOut } from "firebase/auth";

definePageMeta({
    middleware: ['auth'],
})
const router = useRouter()

const query = ref('')
const resp = ref('')
const chat = async () => {
    const gptResp = await useFetch(`/api/gpt?query=${query.value}`)
    console.log(gptResp.data.value)
    resp.value = gptResp.data.value.content
}
const auth = useFirebaseAuth()
const signout = () => {
    signOut(auth).then( () => {
        console.log('Signed Out')
        router.push({ name: 'login' })
    }).catch( (error) => {
        console.log(error)
    })
}

const user = await getCurrentUser()


</script>