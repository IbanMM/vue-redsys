<template>

    <LayoutDefault>

        <section v-if="Ds_MerchantParameters">

            <div class="flex flex-row">

                <div class="">

                    <h4 class="text-xl font-bold">Payment OK</h4>

                </div>

            </div>

            <div class="flex flex-row" v-if="Ds_MerchantParameters">

                <div>{{ Ds_MerchantParameters }}</div> 

                <div class="">

                    <p>Order number: {{ Ds_MerchantParameters.Ds_Order }}</p>
                    <p>Amount: {{amount}}</p>

                </div>
            
            </div>

        </section>

    </LayoutDefault>

</template>

<script>

    import LayoutDefault from '@/components/layouts/LayoutDefault'

    export default {

        data() {
            
            return {

                Ds_MerchantParameters: null

            }

        },

        computed: {

            amount: function() {
                
                let price = this.Ds_MerchantParameters.Ds_Amount
                let amount_main = price.substring(0, price.length - 2)
                let amount_dec = price.substring(price.length - 2, price.length)

                return `${amount_main}.${amount_dec}`

            }

        },

        components: {

            LayoutDefault

        },

        mounted() {

            this.$nextTick(async() => {

                if(this.$route.query.Ds_MerchantParameters) {

                    // Decode from the GET that is in Base64 
                    let merchant_base64 = this.$CryptoJS.enc.Base64.parse( this.$route.query.Ds_MerchantParameters )

                    // Convert the string in a object
                    this.Ds_MerchantParameters = JSON.parse( this.$CryptoJS.enc.Utf8.stringify( merchant_base64 ) )

                }

            })

        }
        
    }
    
</script>