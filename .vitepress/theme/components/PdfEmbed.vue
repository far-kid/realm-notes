<script setup>
import { ref, onMounted, watch, nextTick } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  file: {
    type: String,
    required: true
  },
  height: {
    type: String,
    default: '85vh'
  }
})

const containerRef = ref(null)
const loading = ref(true)
const supported = ref(true)

async function renderPdf() {
  if (typeof window === 'undefined') return // SSR guard, belt-and-braces with ClientOnly

  loading.value = true
  supported.value = true

  // Dynamic import keeps pdfobject out of the SSR/build step entirely
  const { default: PDFObject } = await import('pdfobject')
  await nextTick()

  if (!containerRef.value) return

  // Clear any previous embed before re-rendering (e.g. if `file` prop changes)
  containerRef.value.innerHTML = ''

  const url = withBase(props.file)

  const result = PDFObject.embed(url, containerRef.value, {
    height: '100%',
    width: '100%',
    fallbackLink: false, // we render our own fallback UI below
    pdfOpenParams: {
      view: 'FitH',
      page: 1
    }
  })

  supported.value = !!result
  loading.value = false
}

onMounted(renderPdf)
watch(() => props.file, renderPdf)
</script>

<template>
  <div class="pdf-wrapper" :style="{ height }">
    <div v-if="loading" class="pdf-status">
      <span>Loading PDF…</span>
    </div>

    <div
      ref="containerRef"
      class="pdf-embed"
      v-show="!loading && supported"
    />

    <div v-if="!loading && !supported" class="pdf-fallback">
      <p>This browser can't display the PDF inline.</p>
      <div class="pdf-fallback-links">
        <a :href="withBase(file)" target="_blank" rel="noopener">Open in new tab</a>
        <a :href="withBase(file)" download>Download PDF</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pdf-wrapper {
  width: 125vh;
  max-width: 100vw;          /* never overflow on any screen */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  box-sizing: border-box;
  margin: 0 auto;            /* center on wide screens */
  position: relative;
}

.pdf-embed {
  width: 100%;
  height: 100%;
}

.pdf-status,
.pdf-fallback {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 0.95rem;
}

.pdf-fallback-links {
  display: flex;
  gap: 1rem;
}

.pdf-fallback a {
  color: var(--vp-c-brand-1);
  text-decoration: underline;
}

/* Phones (portrait + landscape) */
@media (max-width: 768px) {
  .pdf-wrapper {
    width: 100vw;
    height: 100svh !important; /* svh respects mobile browser chrome */
    padding: 0;
  }
}

/* Tablets */
@media (min-width: 769px) and (max-width: 1024px) {
  .pdf-wrapper {
    width: 95vw;
  }
}
</style>