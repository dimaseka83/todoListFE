<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useDisplay } from 'vuetify'
import { useLoading } from '@/stores/loading'
import { useError } from '@/stores/myError'
import { useAxios } from '@/composables/useAxios'

const { mobile } = useDisplay()
const loadingStore = useLoading()
const errorStore = useError()
const { axiosPost } = useAxios()

interface Form {
  email: string
  password: string

}

const form: Form = reactive({
  email: '',
  password: ''
})

const showPassword = ref(false)

const rules = {
  required: (value: string) => !!value || 'Required.'
}

const getInformationUser = async () => {
  try {
    const getToken = localStorage.getItem('token')

    if (!getToken) {
      return
    }

    const response = await axiosPost('/auth/me')
    console.log(response)

  } catch (error) {
    console.log(error)
  }
}

const submitLogin = async () => {
  try {
    loadingStore.setLoading(true)
    const {success, data, message} = await axiosPost('/auth/login', form)
    if (!success) {
      errorStore.setError(message)
    } else {
      errorStore.clearError()
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
        <p class="text-center font-weight-bold text-h4 justify-center mt-8">Login</p>

        <v-sheet class="mx-auto" :style="mobile ? 'width: 100%' : 'width: 90%'">
          <v-form class="mx-auto" ref="formLogin" @keyup.enter="submitLogin">
            <v-text-field
              v-model="form.email"
              label="Email"
              outlined
              dense
              class="mt-8"
              :rules="[rules.required]"
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
                @click="submitLogin"
                block
              >
                Masuk
              </v-btn>
            </div>
          </v-form>
        </v-sheet>
      </v-container>
    </AuthLayout>
  </div>
</template>