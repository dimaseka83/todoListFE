<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { onMounted, ref } from 'vue'
import { createAxiosInstance } from '@/services/factory'
import dialogCreateEdit from './dialogCreateEdit.vue'
import { useLoading } from '@/stores/Loading'
import { useDate } from 'vuetify'
import { createSnackbarInstance } from '@/services/factory'


const { axiosGet, axiosPost } = createAxiosInstance()
const setLoading = useLoading()
const { setError, setSuccess } = createSnackbarInstance()

interface Headers {
  title: string
  key: string
}

interface Tasks {
  no: number
  title: string
  due_date: string
  completed: boolean | number
  is_priority: boolean
  created_at: string
}

const headers: Headers[] = [
  { title: 'No.', key: 'no' },
  { title: 'Task', key: 'title' },
  { title: 'Description', key: 'description' },
  { title: 'Date Created', key: 'dateMake' },
  { title: 'Due Date', key: 'deadline' },
  { title: 'Priority', key: 'priority' },
  { title: 'Completed', key: 'completed' }
]


const tasks = ref<Tasks[]>([])
const search = ref('')

const showDialog = ref(false)
const dateFormat = useDate()

const getData = async () => {
  try {
    setLoading.setLoading(true)
    const { success, data, message } = await axiosGet('/tasks')
    if (!success) {
      console.log(message)
    }

    // change tasks to array null
    tasks.value = data.map((task: Tasks, index: number) => {
      return {
        ...task,
        no: index + 1,
        deadline: dateFormat.format(task.due_date, 'fullDateWithWeekday'),
        dateMake: dateFormat.format(task.created_at, 'fullDateWithWeekday'),
        priority: task.is_priority ? 'Yes' : 'No',
        completed: task.completed === 1 ? true : false
      }
    })
    setLoading.setLoading(false)
  } catch (error) {
    console.log(error)
  }
}

const addTask = () => {
  showDialog.value = true
}

const makeStatusWithDeadline = (due_date: string) => {
  const date = new Date(due_date)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const diffTime = date.getTime() - today.getTime()

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  // Return status based on the difference in days
  if (diffDays < 0) {
    return {
      status: 'error',
      text: `Late by ${Math.abs(diffDays)} days`
    }
  } else if (diffDays === 0) {
    return {
      status: 'warning',
      text: 'Today'
    }
  } else {
    return {
      status: 'success',
      text: `${diffDays} days remaining`
    }
  }
}

const isSelesai = async (task: Tasks) => {
  try {

    const newTask = {
      ...task,
      completed: task.completed ? 1 : 0
    }

    const { success, message } = await axiosPost(`/tasks`, newTask)
    if (!success) {
      setError(message)
      return
    }
    setSuccess('Task updated successfully')
  } catch (error) {
    console.log(error)
  }
}

onMounted(() => {
  getData()
})
</script>
<template>
  <DefaultLayout>
    <v-container>
      <p class="text-center font-weight-bold text-h4 justify-center mt-8">Tasks</p>
      <dialogCreateEdit :dialog="showDialog" @refresh="getData()" @close="showDialog = false" />
      <v-data-table
        :loading="setLoading.loading"
        :headers="headers"
        :search="search"
        :items="tasks"
        :sort-by="[
          { key: 'deadline', order: 'asc' },
          { key: 'priority', order: 'desc' }
        ]"
        multi-sort
        class="mt-5"
      >
        <template #top>
          <v-toolbar flat>
            <v-toolbar-title>
              <v-btn color="primary" @click="addTask">Add Task</v-btn>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field label="Search" single-line hide-details v-model="search"></v-text-field>
          </v-toolbar>
        </template>

        <template #item.deadline="{ item }">
          <div>
            {{ (item as any).deadline }} <br />
            <v-chip :color="makeStatusWithDeadline((item as any).due_date).status" small>{{
                makeStatusWithDeadline((item as any).due_date).text
            }}</v-chip>
          </div>
        </template>

        <template #item.completed="{ item }">
          <div>
            <v-checkbox @change="isSelesai(item)" v-model="item.completed"></v-checkbox>
          </div>
        </template>
      </v-data-table>
    </v-container>
  </DefaultLayout>
</template>
