<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { reactive, onMounted, ref } from 'vue'
import { createAxiosInstance } from '@/services/factory'
import dialogCreateEdit from './dialogCreateEdit.vue'

const { axiosGet } = createAxiosInstance()

interface Headers {
  title: string
  key: string
}

interface Tasks {
  no: number
  title: string
  due_date: string
  completed: boolean
  is_priority: boolean
  created_at: string
}

const headers: Headers[] = [
  { title: 'No.', key: 'no' },
  { title: 'Tugas', key: 'title' },
  { title: 'Tanggal Deadline', key: 'due_date' },
  { title: 'Selesai', key: 'completed' },
  { title: 'Prioritas', key: 'is_priority' },
  { title: 'Tanggal Dibuat', key: 'created_at' }
]

const tasks: Tasks[] = reactive([])

const tasksSelected: Tasks | null = null
const showDialog = ref(false)

const getData = async () => {
  try {
    const { success, data, message } = await axiosGet('/tasks')
    if (!success) {
      console.log(message)
    }

    tasks.length = 0
    data.forEach((task: any, index: number) => {
      tasks.push({
        no: index + 1,
        title: task.title,
        due_date: task.due_date,
        completed: task.completed,
        is_priority: task.is_priority,
        created_at: task.created_at
      })
    })
  } catch (error) {
    console.log(error)
  }
}

const addTask = () => {
  showDialog.value = true
}

onMounted(() => {
  getData()
})
</script>
<template>
  <DefaultLayout>
    <v-container>
      <p class="text-center font-weight-bold text-h4 justify-center mt-8">Tasks</p>
      <dialogCreateEdit :data="tasksSelected" :dialog="showDialog" @close="showDialog = false" />
      <v-data-table :headers="headers" :items="tasks" class="mt-5">
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-btn color="primary" @click="addTask">Add Task</v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field label="Search" single-line hide-details></v-text-field>
          </v-toolbar>
        </template>
      </v-data-table>
    </v-container>
  </DefaultLayout>
</template>
