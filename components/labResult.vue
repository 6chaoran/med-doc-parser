<template>
    <div v-if="results2" class="my-3 space-y-1">
        <p class="font-semibold mb-3 text-gray-500">Selected a test variable to view the trend</p>
        <MyChart :testResult="results2" /> 
        <hr class="my-3">
        <p class="font-semibold mb-3 text-gray-500">Historical health records</p>
        <v-expansion-panels v-for="(result, idx) in sortArray(results2)" :key="idx">
            <v-expansion-panel>
                <v-expansion-panel-title>{{ result.id }}    
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                    <div class="flex justify-end">
                        <a class="bg-red px-3 py-1.5 rounded-xl text-sm font-semibold " type="button" @click="del(result.id)">Delete</a>
                    </div>
                    <my-table v-for="(res, category) in convertResult(result)" :people="res" :title="category" ></my-table>
                </v-expansion-panel-text>
            </v-expansion-panel>
        </v-expansion-panels>
           
    </div>
    
</template>
<script setup>
import { getDatabase, ref as dbRef, onValue, remove, update} from "firebase/database";
import { useDatabaseList } from "vuefire";
const db = useDatabase()
const user = await getCurrentUser()

// const x = [{a: 1, b:1}, {a: 1, b: 2}, {a: 2, b: 3}]
const groupBy = (x, key)=>{
    let out = Object()
    for(const elm of x){
        const k = elm[key]
        if (out[k]) {
            out[k].push(elm)
        } else {
            out[k] = [elm]
        }
    }
    return out
}

const convertResult = ( result ) => {
    const resultArray = Object.keys(result).map( i => result[i])
    return groupBy(resultArray, 'category')
}

const del = (test_date) => {
    const loc = dbRef(db,`lab_result/${user.uid}/${test_date}`)
    remove(loc).then( () => {
        console.log('deleted')
    })
}

const resultsDefault = Array({ date: "2019-01-01", results: [{ name: "dummby", value: 18 }] })
const results = ref(resultsDefault)
let results2 = null
if (user) {
    const resultRef = dbRef(db, `lab_result/${user.uid}`)
    results2 = useDatabaseList(resultRef)
    console.log(results2)
} else {
    results2 = null
}

const sortArray = (arr) =>{
    return arr.sort((a,b) => a.id > b.id ? -1 : 1)
}

</script>