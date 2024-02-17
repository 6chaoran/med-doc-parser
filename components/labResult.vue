<template>
    <div v-if="results2" class="my-3">
        <v-expansion-panels v-for="(result, idx) in results2" :key="idx">
            <v-expansion-panel>
                <v-expansion-panel-title>
                    {{ result.id }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <my-table :people="result" ></my-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
    </div>
</template>
<script setup>
import { getDatabase, ref as dbRef, onValue } from "firebase/database";
import { useDatabaseList } from "vuefire";
const db = useDatabase()
const user = await getCurrentUser()

const resultsDefault = Array({ date: "2019-01-01", results: [{ name: "dummby", value: 18 }] })
const results = ref(resultsDefault)
let results2 = null
if (user) {
    const resultRef = dbRef(db, `lab_result/${user.uid}`)
    results2 = useDatabaseList(resultRef)
    console.log(results2.value)
} else {
    results2 = null
}

</script>