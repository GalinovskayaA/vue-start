<template>
  <div class="cssload-wrap">
    <div class="cssload-cssload-spinner"></div>
  </div>
</template>

<script>
export default {
  name: "Hoop"
}
</script>

<style scoped>

.cssload-wrap {
  display: flex;
  display: -o-flex;
  display: -ms-flex;
  display: -webkit-flex;
  display: -moz-flex;
  box-pack: center;
  -o-box-pack: center;
  -ms-box-pack: center;
  -webkit-box-pack: center;
  -moz-box-pack: center;
  justify-content: center;
  -o-justify-content: center;
  -ms-justify-content: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  box-align: center;
  -o-box-align: center;
  -ms-box-align: center;
  -webkit-box-align: center;
  -moz-box-align: center;
  align-items: center;
  -o-align-items: center;
  -ms-align-items: center;
  -webkit-align-items: center;
  -moz-align-items: center;
  perspective: 130px;
  -o-perspective: 130px;
  -ms-perspective: 130px;
  -webkit-perspective: 130px;
  -moz-perspective: 130px;
  height: 100%;
  overflow: hidden;
}

.cssload-cssload-spinner {
  position: relative;
  transform-style: preserve-3d;
  -o-transform-style: preserve-3d;
  -ms-transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  -moz-transform-style: preserve-3d;
  animation: cssload-wobble 4.59s ease-in-out infinite;
  -o-animation: cssload-wobble 4.59s ease-in-out infinite;
  -ms-animation: cssload-wobble 4.59s ease-in-out infinite;
  -webkit-animation: cssload-wobble 4.59s ease-in-out infinite;
  -moz-animation: cssload-wobble 4.59s ease-in-out infinite;
}
.cssload-cssload-spinner:before, .cssload-cssload-spinner:after {
  display: block;
  content: "";
  width: 29px;
  height: 29px;
  border: 15px solid;
  border-radius: 50%;
  animation: cssload-spin 1.73s ease-in-out infinite both reverse;
  -o-animation: cssload-spin 1.73s ease-in-out infinite both reverse;
  -ms-animation: cssload-spin 1.73s ease-in-out infinite both reverse;
  -webkit-animation: cssload-spin 1.73s ease-in-out infinite both reverse;
  -moz-animation: cssload-spin 1.73s ease-in-out infinite both reverse;
}
.cssload-cssload-spinner:before {
  border-color: rgb(0,176,111);
  position: absolute;
}
.cssload-cssload-spinner:after {
  border-color: black;
  animation-delay: -0.86s;
  -o-animation-delay: -0.86s;
  -ms-animation-delay: -0.86s;
  -webkit-animation-delay: -0.86s;
  -moz-animation-delay: -0.86s;
}





@keyframes cssload-wobble {
  0%, 100% {
    transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@-o-keyframes cssload-wobble {
  0%, 100% {
    -o-transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    -o-transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@-ms-keyframes cssload-wobble {
  0%, 100% {
    -ms-transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    -ms-transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@-webkit-keyframes cssload-wobble {
  0%, 100% {
    -webkit-transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    -webkit-transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@-moz-keyframes cssload-wobble {
  0%, 100% {
    -moz-transform: rotateX(8.75deg) rotateY(35deg);
  }
  50% {
    -moz-transform: rotateX(35deg) rotateY(-35deg) rotate(180deg);
  }
}

@keyframes cssload-spin {
  0%, 100% {
    transform: translateZ(16px) rotateX(14deg);
  }
  33% {
    transform: translateZ(-16px) scale(0.4);
  }
  66% {
    transform: translateZ(-16px);
  }
}

@-o-keyframes cssload-spin {
  0%, 100% {
    -o-transform: translateZ(16px) rotateX(14deg);
  }
  33% {
    -o-transform: translateZ(-16px) scale(0.4);
  }
  66% {
    -o-transform: translateZ(-16px);
  }
}

@-ms-keyframes cssload-spin {
  0%, 100% {
    -ms-transform: translateZ(16px) rotateX(14deg);
  }
  33% {
    -ms-transform: translateZ(-16px) scale(0.4);
  }
  66% {
    -ms-transform: translateZ(-16px);
  }
}

@-webkit-keyframes cssload-spin {
  0%, 100% {
    -webkit-transform: translateZ(16px) rotateX(14deg);
  }
  33% {
    -webkit-transform: translateZ(-16px) scale(0.4);
  }
  66% {
    -webkit-transform: translateZ(-16px);
  }
}

@-moz-keyframes cssload-spin {
  0%, 100% {
    -moz-transform: translateZ(16px) rotateX(14deg);
  }
  33% {
    -moz-transform: translateZ(-16px) scale(0.4);
  }
  66% {
    -moz-transform: translateZ(-16px);
  }
}
</style>