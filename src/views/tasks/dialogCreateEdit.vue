<script setup lang="ts">
import { computed, defineProps, reactive, toRefs, defineEmits } from 'vue'
const props = defineProps<{
    dialog: boolean
    data: any
}>()

const emit = defineEmits(['close'])

interface Form {
    title: string
    description: string
    due_date: string
    is_priority: boolean
}

const { dialog, data } = toRefs(props)

const title: string = computed(() => data?.value?.title ? 'Edit Task' : 'Create Task').value

const form: Form = reactive({
    title: '',
    description: '',
    due_date: '',
    is_priority: false
})

</script>
<template>
    <v-dialog v-model="dialog" persistent max-width="500">
        <v-card
        :title="title"
        >
        <v-card-text>
            <v-form>
            <v-text-field
                v-model="form.title"
                label="Title"
                required
            ></v-text-field>
            <v-textarea
                v-model="form.description"
                label="Description"
                required
            ></v-textarea>
            <v-text-field
                v-model="form.due_date"
                label="Due Date"
                required
            ></v-text-field>
            <v-checkbox
                v-model="form.is_priority"
                label="Priority"
            ></v-checkbox>
            </v-form>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
            color="blue darken-1"
            @click="emit('close')"
            >
            Cancel
            </v-btn>
            <v-btn
            color="blue darken-1"
            @click="emit('close')"
            >
            Save
            </v-btn>
        </v-card-actions>

    </v-card>
    </v-dialog>
</template>