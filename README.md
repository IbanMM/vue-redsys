# Redsys checkout with Vue JS

This is a very simple implementation of a checkout process to send the data encoded to the Redsys payment platform in Vue JS **no server needed all in the frontend**

Hope this can help anyone!!

Uses [vue-cryptojs](https://github.com/tpenaranda/vue-cryptojs).

I'm using [tailwind](https://tailwindcss.com/) to set a minimal CSS layout, colors, etc ...

## Project setup
```
npm install
```

## Instructions

For this to work properly must run under **https** mostly for the OK or OK urls, the first step (sending the data) works perfect in a local enviroment

Open **.env.development** and set your base url

Open **.env.production** and set your base url

Open **src/views/Redsys.vue** and set your **DS_MERCHANT_MERCHANTCODE**

Then run
```
npm run serve
```

Fill the form with the desired amount and order number and you are done

In a production enviroment ideally the **merchantcode** should come from the server (via REST API or something like that)

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
