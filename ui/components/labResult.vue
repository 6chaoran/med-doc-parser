<template>
    <div v-if="results">
        <div v-for="(result, idx) in results" :key="idx">
           {{ result.date }}
           <div id="results">
            {{ result.results }}
            </div>
        </div>
        
        <v-form></v-form>
    </div>
</template>
<script setup>
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { useDatabaseList } from "vuefire";
const db = useDatabase()
const user = getCurrentUser()

const resultsDefault = Array({date: "2019-01-01", results: [{name: "dummby", value: 18}]})
const results = ref(resultsDefault)
// if(user){
//     const resultRef = dbRef(db, `lab_result/${user.uid}`)
//     const a =  useDatabaseList(resultRef)
//     console.log(a)
// }

</script>