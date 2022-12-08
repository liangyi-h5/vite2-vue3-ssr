<template>
  <div class="json-to-excel">
    <textarea
      v-model="text"
      class="textarea"
    /><br>
    <button @click="onJsonToExcel">
      json to excel
    </button><br>
    <input
      id="ipt"
      accept=".json"
      type="file"
      @change="onExcelToJson"
    >excel to json<br>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { writeFileXLSX, utils } from 'xlsx'
import { checkIsJson, checkIsArray, checkIsObject, checkIsString } from '../../utils'
// console.log('json-to-excel', read, writeFileXLSX)
import { useTest } from '../../hook/useTest'
useTest()
const text = ref('')
const onJsonToExcel = () => {
  console.log(text.value)
  const str = text.value
  if (!str) {
    return
  }
  if (checkIsJson(str)) {
    const list = JSON.parse(str)
    if (checkIsArray(list)) {
      for (let i = 0; i < list.length; i++) {
        if (checkIsObject(list[i])) {
          for (const key in list[i]) {
            if (!checkIsString(list[i][key])) {
              alert('错误，必须是[{ "en": "Daily check-in", "zh": "中文"}, { "en": "1st", "zh": "中文3"}] 类型json字符串')
              return
            }
          }
        } else {
          alert('错误，必须是[{ "en": "Daily check-in", "zh": "中文"}, { "en": "1st", "zh": "中文3"}] 类型json字符串')
          return
        }
      }
      const ws = utils.json_to_sheet(list)
      const workbook = {
        SheetNames: ['sheet'],
        Sheets: {
          sheet: ws
        }
      }
      writeFileXLSX(workbook, 't.excel')
    } else {
      alert('错误，不是一个规范的json字符串')
    }
  } else {
    alert('错误，不是一个规范的json字符串')
  }
}
const onExcelToJson = (e:any) => {
  console.log('change', e)
}
onMounted(() => {
  const ipt = document.querySelector('#ipt')
  if (ipt) {
    ipt.addEventListener('change', (e:any) => {
      const reader = new FileReader()
      reader.readAsText(e.target.files[0], 'UTF-8')
      reader.onload = (e:any) => {
        const fileContent = e.target.result
        console.log(fileContent, 'fileContent')
        // 拿到文件文本内容
      }
    })
  }
})
</script>

<style scoped>
.textarea{
  width: 400px;
  height: 400px;
}
</style>
