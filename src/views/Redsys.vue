<template>

    <LayoutDefault>

        <div class="mb-4 pt-4 pb-2">

            <label class="block text-gray-700 text-sm font-bold mb-2" for="amount">Amount</label>

            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="amount" type="text" placeholder="Amount">

        </div>

        <div class="mb-4 py-2">

            <label class="block text-gray-700 text-sm font-bold mb-2" for="order">Order Number</label>

            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="order" type="text" placeholder="Order">

        </div>

        <div class="py-4">

            <form ref="redsys_form" action="https://sis-t.redsys.es:25443/sis/realizarPago" method="post" id="redsys_form" name="redsys_form">

                <input type="text" name="Ds_SignatureVersion" v-model="Ds_SignatureVersion" hidden />
                <input type="text" name="Ds_MerchantParameters" v-model="Ds_MerchantParameters" hidden />
                <input type="text" name="Ds_Signature" v-model="Ds_Signature" hidden />

                <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" @click.prevent="checkPayment()">
                        
                    <span v-if="loading" label="Loading...">Loading ...</span>
                    <span v-else>Go to Redsys</span> 
                
                </button>

            </form>

        </div>

    </LayoutDefault>

</template>

<script>

    import LayoutDefault from '@/components/layouts/LayoutDefault'

    export default {

        data() {    

            return {
                data: null,
                loading: false,
                Ds_Merchant_MerchantCode: 999008881,
                paymentData: {
                    DS_MERCHANT_AMOUNT: "",
                    DS_MERCHANT_CURRENCY: "978",
                    DS_MERCHANT_MERCHANTCODE: "059350272",
                    DS_MERCHANT_MERCHANTURL: "http://www.prueba.com/urlNotificacion.php",
                    DS_MERCHANT_ORDER: "",
                    DS_MERCHANT_TERMINAL: "1",
                    DS_MERCHANT_TRANSACTIONTYPE: "0",
                    DS_MERCHANT_URLKO: `${process.env.VUE_APP_BASE_URL}/tpv-pago-ko`,
                    DS_MERCHANT_URLOK: `${process.env.VUE_APP_BASE_URL}/tpv-pago-ok`
                },
                Ds_MerchantParameters: null,
                Ds_Signature: null,
                Ds_SignatureVersion: null
            }

        },

        components: {

            LayoutDefault

        },

        methods: {

            async checkPayment() {
                
                let encodeData = await this.encodePayment()

                if ( encodeData ) this.$refs.redsys_form.submit()

            },

            /**
             * Encode all the data for the post to redsys
             * 
             */
            async encodePayment() {

                try {

                    this.priceForRedsys()
                    
                    // Uses --> https://cryptojs.gitbook.io/docs/

                    // Lets make a string encoded in Base64 with the object width the data
                    let merchant = this.$CryptoJS.enc.Utf8.parse(JSON.stringify(this.paymentData))

                    this.Ds_MerchantParameters = merchant.toString(this.$CryptoJS.enc.Base64)

                    // Decode from Base 64 the secret key of the commerce from Redsys

                    let key = this.$CryptoJS.enc.Base64.parse('sq7HjrUOBfKmC576ILgskD5srU870gJ7')

                    // Encrypt the key diversified with the order number in TripleDes
                    
                    let iv = this.$CryptoJS.enc.Hex.parse("0000000000000000");
                    let cipher = this.$CryptoJS.TripleDES.encrypt(this.paymentData.DS_MERCHANT_ORDER, key, {
                        iv:iv,
                        mode: this.$CryptoJS.mode.CBC,
                        padding: this.$CryptoJS.pad.ZeroPadding // Redsys dont like padding
                    })

                    // Signature HASH width de merchant parameters in Base 64 and the TripleDes

                    let signature = this.$CryptoJS.HmacSHA256(this.Ds_MerchantParameters, cipher.ciphertext);
                    
                    this.Ds_Signature = signature.toString(this.$CryptoJS.enc.Base64)

                    this.Ds_SignatureVersion = "HMAC_SHA256_V1"

                    return true

                } catch (error) {

                    console.log(error)

                    return false

                } 
                
            },

            /**
             * Set the amount in the correct format for Redsys (the last two characters are the decimals)
             * 
             */
            priceForRedsys() {

                let priceN = parseFloat( this.amount )

                if( Number.isInteger(priceN) ){

                    this.paymentData.DS_MERCHANT_AMOUNT = priceN.toString() + '00'

                } else {

                    let price_fixed = priceN.toFixed(2).toString()

                    let price_string = price_fixed.replace('.','')

                    this.paymentData.DS_MERCHANT_AMOUNT = price_string

                }

            }

        }
        
    }

</script>