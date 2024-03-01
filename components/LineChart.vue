<template>

{{ name }}
    <div class="max-w-[600px]" :id="id" style="height: 300px; width: 100%;"></div>
</template>
<script setup>
import * as echarts from 'echarts/core';
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    MarkPointComponent
} from 'echarts/components';
import { LineChart } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    GridComponent,
    LegendComponent,
    LineChart,
    CanvasRenderer,
    UniversalTransition,
    MarkPointComponent
]);
const props = defineProps({
    selectedValues: Array,
    id: String,
    name: String,
})
const x = computed(() => props.selectedValues.map(i => i.date))
const y = computed(() => props.selectedValues.map(i => i.value))
const unit = computed(() => props.selectedValues.map(i => i.unit)[0])
let chartDom
let myChart
const showChart = () => {

    const option = {

        tooltip: {
            trigger: 'axis',
            // formatter: function (params) {
            // console.log(params)
            // return `2B: ${params[0].value * 100}%<br>2C: ${params[1].value*100}%`
            // }
            valueFormatter: (value) => {
                // console.log(value[0])
                return value
            }

        },
        grid: {
            left: '12%',
            right: '3%',
        },
        legend: {
            data: [props.name],
            bottom: 0,
        },

        xAxis: {
            type: 'category',
            data: x.value
        },
        yAxis: {
            type: 'value',
            name: unit.value,//selectedValues.value[0].unit,
            // axisLabel: {
            //     formatter: (value) => {
            //         return 100 * value + '%';
            //     }
            // }
        },
        series: [
            {
                name: props.name,
                data: y.value,
                type: 'line',
                smooth: true,
            },

        ]
    };
    option && myChart.setOption(option)
}

onMounted(() => {
    chartDom = document.getElementById(props.id)
    myChart = echarts.init(chartDom)
    showChart()
})
watch(y, () => {
    showChart()
})
</script>