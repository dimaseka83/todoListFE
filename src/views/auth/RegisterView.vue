<script setup lang="ts">
import { ref, reactive } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useDisplay } from 'vuetify'
import { useLoading } from '@/stores/Loading'
import { createAxiosInstance, createSnackbarInstance } from '@/services/factory'
import { getInformationUser } from '@/services/auth'

const { mobile } = useDisplay()
const loadingStore = useLoading()
const { setError, clearError } = createSnackbarInstance()
const { axiosPost } = createAxiosInstance()

interface Form {
  name: string
  email: string
  password: string
}

interface formRegisterValue {
  validate: () => Promise<{ valid: boolean }>
}

const form: Form = reactive({
  name: '',
  email: '',
  password: ''
})
const formRegister = ref<formRegisterValue | null>(null)

const showPassword = ref(false)

const rules = {
  required: (value: string) => !!value || 'Required.',
  email: (value: string) => /.+@.+\..+/.test(value) || 'E-mail must be valid'
}

const submitRegister = async () => {
  // validate form
  const { valid } = formRegister.value ? await formRegister.value.validate() : { valid: false }

  if (!valid) {
    return
  }

  loadingStore.setLoading(true)
  try {
    const { success, data, message } = await axiosPost('/auth/register', form)
    if (!success) {
      setError(message)
    } else {
      clearError()
      // Do something after login
      localStorage.setItem('token', data.token)
      await getInformationUser()
    }
  } catch (error) {
    console.log(error)
  } finally {
    loadingStore.setLoading(false)
  }
}
</script>
<template>
  <div>
    <AuthLayout>
      <v-container>
        <p class="text-center font-weight-bold text-h4 justify-center mt-8">Register</p>

        <v-sheet class="mx-auto" :style="mobile ? 'width: 100%' : 'width: 90%'">
          <v-form class="mx-auto" ref="formRegister" @keyup.enter="submitRegister">
            <v-text-field
              v-model="form.name"
              label="Name"
              outlined
              dense
              class="mt-8"
              :rules="[rules.required]"
            />

            <v-text-field
              v-model="form.email"
              label="Email"
              outlined
              dense
              :rules="[rules.required, rules.email]"
            ></v-text-field>

            <v-text-field
              v-model="form.password"
              label="Password"
              outlined
              dense
              :rules="[rules.required]"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            >
            </v-text-field>

            <div class="text-center">
              <v-btn
                size="large"
                class="mt-8"
                color="blue"
                :loading="loadingStore.loading"
                :disabled="loadingStore.loading"
                @click="submitRegister"
                block
              >
                Daftar
              </v-btn>
            </div>
            <div class="text-center mt-4">
              <p>Already have an account? <router-link to="/">Login here</router-link></p>
            </div>
          </v-form>
        </v-sheet>
      </v-container>
    </AuthLayout>
  </div>
</template>
