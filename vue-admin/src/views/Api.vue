<template>
  <div>
    <iframe class="iframe" width="100%" height="650" :src="url"></iframe>
  </div>
</template>

<script>
import config from "@/config";

export default {

  data(){
    return{
      url: config.SWAGGER_URL,
    }
  }

}
</script>

<style scoped>
.iframe {
  border: none;
}
</style>