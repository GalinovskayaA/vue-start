<template>
  <div class="cssload-container">
    <div class="cssload-circle-1">
      <div class="cssload-circle-2">
        <div class="cssload-circle-3">
          <div class="cssload-circle-4">
            <div class="cssload-circle-5">
              <div class="cssload-circle-6">
                <div class="cssload-circle-7">
                  <div class="cssload-circle-8">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Krutilka"
}
</script>

<style scoped>
.cssload-container {
  width: 72px;
  margin: 0 auto;
}

.cssload-circle-1 {
  height: 72px;
  width: 72px;
  background: rgb(97,46,141);
}

.cssload-circle-2 {
  height: 60px;
  width: 60px;
  background: rgb(194,34,134);
}

.cssload-circle-3 {
  height: 48px;
  width: 48px;
  background: rgb(234,34,94);
}

.cssload-circle-4 {
  height: 36px;
  width: 36px;
  background: rgb(237,91,53);
}

.cssload-circle-5 {
  height: 24px;
  width: 24px;
  background: rgb(245,181,46);
}

.cssload-circle-6 {
  height: 12px;
  width: 12px;
  background: rgb(129,197,64);
}

.cssload-circle-7 {
  height: 6px;
  width: 6px;
  background: rgb(0,163,150);
}

.cssload-circle-8 {
  height: 3px;
  width: 3px;
  background: rgb(22,116,188);
}

.cssload-circle-1,
.cssload-circle-2,
.cssload-circle-3,
.cssload-circle-4,
.cssload-circle-5,
.cssload-circle-6,
.cssload-circle-7,
.cssload-circle-8 {
  border-bottom: none;
  border-radius: 50%;
  -o-border-radius: 50%;
  -ms-border-radius: 50%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  -o-box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  -ms-box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  -webkit-box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  -moz-box-shadow: 1px 1px 1px rgba(0,0,0,0.1);
  animation-name: cssload-spin;
  -o-animation-name: cssload-spin;
  -ms-animation-name: cssload-spin;
  -webkit-animation-name: cssload-spin;
  -moz-animation-name: cssload-spin;
  animation-duration: 3800ms;
  -o-animation-duration: 3800ms;
  -ms-animation-duration: 3800ms;
  -webkit-animation-duration: 3800ms;
  -moz-animation-duration: 3800ms;
  animation-iteration-count: infinite;
  -o-animation-iteration-count: infinite;
  -ms-animation-iteration-count: infinite;
  -webkit-animation-iteration-count: infinite;
  -moz-animation-iteration-count: infinite;
  animation-timing-function: linear;
  -o-animation-timing-function: linear;
  -ms-animation-timing-function: linear;
  -webkit-animation-timing-function: linear;
  -moz-animation-timing-function: linear;
}



@keyframes cssload-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@-o-keyframes cssload-spin {
  from {
    -o-transform: rotate(0deg);
  }
  to {
    -o-transform: rotate(360deg);
  }
}

@-ms-keyframes cssload-spin {
  from {
    -ms-transform: rotate(0deg);
  }
  to {
    -ms-transform: rotate(360deg);
  }
}

@-webkit-keyframes cssload-spin {
  from {
    -webkit-transform: rotate(0deg);
  }
  to {
    -webkit-transform: rotate(360deg);
  }
}

@-moz-keyframes cssload-spin {
  from {
    -moz-transform: rotate(0deg);
  }
  to {
    -moz-transform: rotate(360deg);
  }
}
</style>