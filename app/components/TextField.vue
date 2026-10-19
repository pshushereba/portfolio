<template>
  <label class="ds-field">
    <span :class="hideLabel ? 'sr-only' : 'ds-field-label'">{{ label }}</span>
    <input
      :id="id"
      class="ds-input"
      :type="type"
      :name="name"
      :value="modelValue"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :required="required"
      :aria-invalid="error ? 'true' : undefined"
      :aria-describedby="error || success ? messageId : undefined"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    />
    <span v-if="error" :id="messageId" class="ds-field-msg ds-field-msg--error" role="alert">
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
        <circle cx="8" cy="8" r="6.25" />
        <path d="M8 4.75v3.5M8 10.75v.5" />
      </svg>
      {{ error }}
    </span>
    <span v-else-if="success" :id="messageId" class="ds-field-msg ds-field-msg--success" role="status">
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="8" cy="8" r="6.25" />
        <path d="m5.5 8.25 1.75 1.75 3.25-3.75" />
      </svg>
      {{ success }}
    </span>
  </label>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    modelValue?: string;
    label: string;
    hideLabel?: boolean;
    type?: 'text' | 'email' | 'search' | 'url';
    name?: string;
    placeholder?: string;
    autocomplete?: string;
    required?: boolean;
    error?: string;
    success?: string;
  }>(),
  { type: 'text' },
);

const emit = defineEmits<{ 'update:modelValue': [value: string] }>();

const id = useId();
const messageId = `${id}-msg`;
</script>
