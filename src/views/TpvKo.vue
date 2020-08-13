<template>

    <LayoutDefault>

        <section>

            <b-row>

                <b-col cols="12" class="fuid-form-to-render">

                    <h4 class="fuid-resu-tit">{{ $t('paymentko.tit') }}</h4>

                </b-col>

                <b-col>

                    <errorFromServer
                        :id="id"
                    />

                </b-col>

                <b-col cols="12">

                    <p>{{ Ds_MerchantParameters }}</p>

                </b-col>
            
            </b-row>

        </section>

    </LayoutDefault>

</template>

<script>

    import { mapActions } from 'vuex'
    import errorFromServer from '@/components/errorFromServer'
    import LayoutDefault from '@/components/layouts/LayoutDefault'

    export default {

        data() {
            
            return {

                id: 11,
                Ds_MerchantParameters: false

            }

        },



        methods: {

            ...mapActions('Login', ['loginUser']),
            ...mapActions('Matricula', ['tpvBackPostData']),

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

            LayoutDefault,
            errorFromServer

        },

        mounted() {

            this.$nextTick(async() => {

                if(this.$route.query.Ds_MerchantParameters) {

                    // Decode from the GET that is in Base64 
                    let merchant_base64 = this.$CryptoJS.enc.Base64.parse( this.$route.query.Ds_MerchantParameters )

                    // Convert the string in a object
                    this.Ds_MerchantParameters = JSON.parse( this.$CryptoJS.enc.Utf8.stringify( merchant_base64 ) )

                    console.log( this.Ds_MerchantParameters )

                    // Send the data to the API bum bum
                    let logToken = await this.loginUser( { username: process.env.VUE_APP_API_USER, password: process.env.VUE_APP_API_PASSWORD, componentId: this.id } )

                    if( logToken ) {

                        let code = parseInt( this.Ds_MerchantParameters.Ds_Response )

                        let matriculaFinish = this.tpvBackPostData( {numeroPedido:this.Ds_MerchantParameters.Ds_Order, code:code, componentId: this.id} )

                        console.log( matriculaFinish )

                    }

                }

            })

        }
        
    }
    
</script>

<style lang="scss" scoped>

</style>