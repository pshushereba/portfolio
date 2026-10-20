<!--
  Replaces Headless UI's Popover + Transition. Dependency-free.
  - trigger slot gets { open, toggle, triggerAttrs } — bind triggerAttrs for aria-expanded / aria-controls
  - default slot gets { close }
  - Escape, backdrop click, any link click, or a route change closes it; focus is trapped while open
    and returned to the trigger on close.
-->
<template>
  <div class="ds-popover" :data-state="open ? 'open' : 'closed'">
    <slot name="trigger" :open="open" :toggle="toggle" :trigger-attrs="triggerAttrs" />
    <Teleport to="body">
      <div class="ds-root ds-popover" data-state="open">
        <Transition name="ds-fade">
          <div v-if="open" class="ds-popover-overlay" @click="close()" />
        </Transition>
        <Transition name="ds-pop" @after-enter="focusFirst">
          <div
            v-if="open"
            :id="panelId"
            ref="panel"
            class="ds-popover-panel"
            role="dialog"
            aria-modal="true"
            :aria-label="label"
            tabindex="-1"
            @keydown="onKeydown"
            @click="onPanelClick"
          >
            <slot :close="close" />
          </div>
        </Transition>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ label: string }>();

const open = ref(false);
const panel = ref<HTMLElement | null>(null);
const panelId = `${useId()}-panel`;
let lastTrigger: HTMLElement | null = null;

const triggerAttrs = computed(() => ({
  'aria-expanded': open.value,
  'aria-controls': panelId,
  'aria-haspopup': 'dialog' as const,
}));

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select,textarea,[tabindex]:not([tabindex="-1"])';

function focusables(): HTMLElement[] {
  return panel.value ? Array.from(panel.value.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];
}

function toggle(event?: Event) {
  if (open.value) return close();
  lastTrigger = (event?.currentTarget as HTMLElement | null) ?? (document.activeElement as HTMLElement | null);
  open.value = true;
}

function close(returnFocus = true) {
  if (!open.value) return;
  open.value = false;
  if (returnFocus) nextTick(() => lastTrigger?.focus());
}

function focusFirst() {
  (focusables()[0] ?? panel.value)?.focus();
}

function onKeydown(e: KeyboardEvent) {
  if (e.key !== 'Tab') return;
  const items = focusables();
  const first = items[0];
  const last = items[items.length - 1];
  if (!first || !last) return;
  if (e.shiftKey && document.activeElement === first) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && document.activeElement === last) {
    e.preventDefault();
    first.focus();
  }
}

function onPanelClick(e: MouseEvent) {
  const target = e.target as HTMLElement;
  if (target.closest('a[href]')) close(false);
  else if (target.closest('[data-popover-close]')) close();
}

function onDocumentKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    e.preventDefault();
    close();
  }
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('keydown', onDocumentKeydown);
  else document.removeEventListener('keydown', onDocumentKeydown);
});

const route = useRoute();
watch(() => route.fullPath, () => close(false));

onBeforeUnmount(() => document.removeEventListener('keydown', onDocumentKeydown));

defineExpose({ close, toggle, open, label: props.label });
</script>

<style>
.ds-fade-enter-active,
.ds-pop-enter-active {
  transition: opacity 150ms ease-out, transform 150ms ease-out;
}
.ds-fade-leave-active,
.ds-pop-leave-active {
  transition: opacity 150ms ease-in, transform 150ms ease-in;
}
.ds-fade-enter-from,
.ds-fade-leave-to {
  opacity: 0 !important;
}
.ds-pop-enter-from,
.ds-pop-leave-to {
  opacity: 0 !important;
  transform: scale(0.95) !important;
}
@media (prefers-reduced-motion: reduce) {
  .ds-fade-enter-active,
  .ds-fade-leave-active,
  .ds-pop-enter-active,
  .ds-pop-leave-active {
    transition: none;
  }
}
</style>
