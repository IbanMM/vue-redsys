<template>
    <div>

    </div>
</template>

<script>
    export default {

        data() {    

            return {
                id: 6,
                data: null,
                loading: false,
                clicked: 0,
                modal: false,
                Ds_Merchant_MerchantCode: 999008881,
                matriculaIban: false,
                paymentData: {
                    DS_MERCHANT_AMOUNT: "",
                    DS_MERCHANT_CURRENCY: "978",
                    DS_MERCHANT_MERCHANTCODE: "059350272",
                    DS_MERCHANT_MERCHANTURL: "http://www.prueba.com/urlNotificacion.php",
                    DS_MERCHANT_ORDER: "",
                    DS_MERCHANT_TERMINAL: "1",
                    DS_MERCHANT_TRANSACTIONTYPE: "0",
                    DS_MERCHANT_URLKO: `${process.env.VUE_APP_BASE_URL}/tpv-pago-ko`,
                    DS_MERCHANT_URLOK: `${process.env.VUE_APP_BASE_URL}${this.$i18n.locale}/tpv-pago-ok`
                },
                Ds_MerchantParameters: null,
                Ds_Signature: null,
                Ds_SignatureVersion: null
            }

        },
        
    }
</script>

<style lang="scss" scoped>

</style>