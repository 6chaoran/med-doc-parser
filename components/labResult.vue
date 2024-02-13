<template>
    <div v-if="results2">
        <div v-for="(result, idx) in results2" :key="idx">
            <my-table :people="result" :title="result.id" class="mt-6"></my-table>
        </div>
    </div>
    <div v-else>
        Sign In to view your parsed results
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
    console.log(results2.value)
} else {
    results2 = null
}

</script>