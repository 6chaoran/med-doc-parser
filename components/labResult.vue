<template>
    <div v-if="results2">
        <div v-for="(result, idx) in results2" :key="idx">
            {{ idx }} <br> 
            {{ result }}
        </div>
        
        <v-form></v-form>
    </div>
</template>
<script setup>
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { useDatabaseList } from "vuefire";
const db = useDatabase()
const user = await getCurrentUser()

const resultsDefault = Array({date: "2019-01-01", results: [{name: "dummby", value: 18}]})
const results = ref(resultsDefault)
let results2 = null
if(user){
    const resultRef = dbRef(db, `lab_result/${user.uid}`)
    results2 =  useDatabaseList(resultRef)
    // console.log(results.value)
}

</script>