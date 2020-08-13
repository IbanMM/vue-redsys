<template>

  <b-container id="app" class="container-fluid h-100">
    
    <b-row class="h-100 justify-content-center align-items-center">
      
      <b-col cols="12" xl="6" md="8">
        
        <div class="text-center">
          
          <FundacionLogo />
        
        </div>

        <slot/>
      
      </b-col>

    </b-row>
  
  </b-container>
  
</template>

<script>

  import FundacionLogo from '@/assets/svg/fundacion-idiomas-fundazioa.svg'

  export default {
    components: {
      FundacionLogo
    }
  }

</script>


<style lang="scss">

html, body {
  height: 100%;
}

</style>