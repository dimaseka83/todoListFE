<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, toRefs } from 'vue'
import { createAxiosInstance, createSnackbarInstance } from '@/services/factory'
import { useLoading } from '@/stores/Loading'

const { axiosPost } = createAxiosInstance()
const { setError, setSuccess } = createSnackbarInstance()
const loadingValue = useLoading()

const props = defineProps({
  dialog: Boolean
})

const { dialog } = toRefs(props)

const emit = defineEmits(['refresh', 'close'])

interface Form {
  title: string
  description: string
  due_date: Date | null
  is_priority: boolean,
  [key: string]: any
}

interface formRefValue {
  validate: () => Promise<{ valid: boolean }>
}

const form: Form = reactive({
  title: '',
  description: '',
  due_date: null,
  is_priority: false,
})

const formRef = ref<formRefValue | null>(null)

const rules = {
  required: (value: string) => !!value || 'Required.'
}

const saveForm = async () => {
  const { valid } = formRef.value ? await formRef.value.validate() : { valid: false }

  if (!valid) {
    return
  }
  loadingValue.setLoading(true)
  try {
    // change date format
    const newForm = {
      ...form,
      due_date: form.due_date?.toISOString().substr(0, 10)
    }

    const { success, message } = await axiosPost('/tasks', newForm)
    if (!success) {
      setError(message)
      return
    }

    setSuccess('Task saved successfully')
    emit('refresh')
    emit('close')

    // reset form
    const keys = Object.keys(form)
    keys.forEach((key) => {
      form[key] = null
      if (key === 'is_priority') {
        form[key] = false
      }
    })
  } catch (error) {
    console.log(error)
  } finally {
    loadingValue.setLoading(false)
  }
}

const closeDialog = () => {
  emit('close')
}
</script>
<template>
  <v-dialog v-model="dialog" persistent max-width="500">
    <v-card>
      <v-card-title>Create Tasks</v-card-title>
      <v-card-text>
        <v-form ref="formRef">
          <v-text-field
            v-model="form.title"
            label="Title"
            :rules="[rules.required]"
            required
          ></v-text-field>
          <v-textarea
            v-model="form.description"
            label="Description"
            :rules="[rules.required]"
            required
          ></v-textarea>
          <v-date-input
            :rules="[rules.required]"
            v-model="form.due_date"
            label="Due Date"
            :min="new Date().toISOString().substr(0, 10)"
          ></v-date-input>
          <v-checkbox v-model="form.is_priority" label="Priority"></v-checkbox>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" @click="closeDialog">Cancel</v-btn>
        <v-btn
          color="blue darken-1"
          :loading="loadingValue.loading"
          :disabled="loadingValue.loading"
          @click="saveForm"
          >Save</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
