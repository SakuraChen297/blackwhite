<template>
  <div class="Main">
    <span class="start-taste-line">
      <hr class="hr hr1" />
      <hr class="hr hr2" />
      <hr class="hr hr3" />
      <hr class="hr hr4" />
      <hr class="hr hr5" />
      <hr class="hr hr6" />
      <hr class="hr hr7" />
      <hr class="hr hr8" />
      <hr class="hr hr9" />
      <hr class="hr hr10" />
    </span>
  </div>
</template>

<script>
export default {
  name: "recordingicon",
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.Main {
  .start-taste-line {
    margin-top: 50%;
    margin: 20vw;
    display: inline-block;
    hr {
      background-color: #187cff;
      width: 3px;
      height: 10px;
      margin: 0 5px;
      display: inline-block;
      border: none;
    }
    .hr {
      animation: note 0.2s ease-in-out;
      animation-iteration-count: infinite;
      animation-direction: alternate;
    }

    .hr1 {
      animation-delay: -1s;
    }

    .hr2 {
      animation-delay: -0.9s;
    }

    .hr3 {
      animation-delay: -0.8s;
    }

    .hr4 {
      animation-delay: -0.7s;
    }

    .hr5 {
      animation-delay: -0.6s;
    }

    .hr6 {
      animation-delay: -0.5s;
    }

    .hr7 {
      animation-delay: -0.4s;
    }

    .hr8 {
      animation-delay: -0.3s;
    }

    .hr9 {
      animation-delay: -0.2s;
    }

    .hr10 {
      animation-delay: -0.1s;
    }

    @keyframes note {
      from {
        transform: scaleY(1);
      }
      to {
        transform: scaleY(4);
      }
    }
  }
}
</style>
