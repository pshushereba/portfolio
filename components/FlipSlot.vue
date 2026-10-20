<template>
  <div class="flip" ref="flip">
    <!-- unfold top -->
    <div>B</div>
    <!-- unfold bottom -->
    <div>B</div>
    <!-- fold top -->
    <div>A</div>
    <!-- fold bottom -->
    <div>A</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import gsap from "gsap";

const flip = ref(null);

const chars = Array.from(" SHIP_IT ");

onMounted(async () => {
  const [foldTop, foldBottom, unfoldTop, unfoldBottom] = Array.from(
    flip.value.querySelectorAll(".flip > div")
  );
  await gsap
    .timeline({
      repeat: chars.length - 2,
      delay: 0.4,
      onRepeat: () => {
        gsap.set([unfoldTop, unfold], { innerText: "C" });
        gsap.set([foldBottom, fold], { innerText: "B" });
      },
    })
    .fromTo(
      unfold,
      { rotateX: 180 },
      { rotateX: 0, duration: 1, ease: "none" },
      0
    )
    .fromTo(
      fold,
      { rotateX: 0 },
      { rotateX: -180, duration: 1, ease: "none" },
      0
    );

  flip.value.style.setProperty("--flipped", 45); // Set to any value you want
});
</script>

<style scoped>
.flip div:nth-of-type(odd) {
  clip-path: polygon(
    0 0,
    100% 0,
    100% 40%,
    calc(90% + 0.025em) 40%,
    calc(90% + 0.025em) 48%,
    calc(10% - 0.025em) 48%,
    calc(10% - 0.025em) 40%,
    0 40%
  );
}

.flip div:nth-of-type(even) {
  clip-path: polygon(
    0 60%,
    calc(10% - 0.025em) 60%,
    calc(10% - 0.025em) 52%,
    calc(90% + 0.025em) 52%,
    calc(90% + 0.025em) 60%,
    100% 60%,
    100% 100%,
    0 100%
  );
}

@layer flip {
  /* map 0-180 against a brightness range */
  /* based on a --flipped value of 0-1 */
  .flip div:nth-of-type(1),
  .flip div:nth-of-type(2) {
    /* 0-90 will be 0-1 */
    filter: brightness(calc(1 / 90 * clamp(0, var(--flipped), 90)));
  }
  .flip div:nth-of-type(3),
  .flip div:nth-of-type(4) {
    /* 90-180 will be 1-0 */
    filter: brightness(calc(1 - (1 / 90 * clamp(0, var(--flipped) - 90, 180))));
  }
  .flip div:nth-of-type(2) {
    rotate: x calc(-180deg + (var(--flipped) * -1deg));
    z-index: 2;
  }
  .flip div:nth-of-type(3) {
    backface-visibility: hidden;
    rotate: x calc(var(--flipped) * -1deg);
    z-index: 3;
  }
}
</style>
