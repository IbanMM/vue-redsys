<template>

    <div class="">

        <div id="layout-default" class="container mx-auto">

            <Header />

            <slot/>

        </div>

    </div>
  
</template>

<script>

    import Header from '@/components/Header'

    export default {
        
        components: {

            Header

        }

    }

</script>