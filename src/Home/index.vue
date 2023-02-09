<template>
    <GMapMap :center="center" :zoom="zoom" style='height: 100vh'>
        <GMapMarker
            v-for="(marker, index) in markers"
            :key="index"
            :position="marker?.coordinates"
            @mouseover="showInfoById = index"
            @mouseout="showInfoById = false"
        >
            <!-- :icon="{
                url: marker.avatar_uri,
                scaledSize: { width: 40, height: 40 },
                labelOrigin: { x: 0, y: 12 },
                custom: 'px'
            }" -->
        <!-- @click="showInfoById = index" -->
        <GMapInfoWindow
            :opened="showInfoById === index"
            :closeclick="true"
            @closeclick="showInfoById = false"
        >
            <div class="info-popup">
                <div><img :src="marker.avatar_uri" /></div>
                <div class="detail">
                    <p class="basic">
                        <span class="name">{{ marker.name }}</span>
                        <span class="score">{{ marker.qualitySCore }}</span>
                    </p>
                    <p class="info">{{ marker.info }}</p>
                    <p class="slogan">{{ marker.slogan }}</p>
                </div>
            </div>
        </GMapInfoWindow>
      </GMapMarker>
    </GMapMap>
  </template>
  
<script>
import { getServiceNotice } from './helpers'
import "./style.scss"

export default {
    data() {
        return {
            loading: false,
            center: { lat: 45.4642035, lng: 9.189982 },
            zoom: 12,
            markers: [
                {
                    avatar_uri :  "https://vapor-eu-south-1-assets-1609175124.s3.eu-south-1.amazonaws.com/74/conversions/valerio-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmV1LXNvdXRoLTEiRjBEAiBjBjJyKq8Ym0JHc9IxwKGhw66rPqV8C1Flj40vrVoh5QIge8y3nyZIxYFo4tgmOYYOuXx7N2pNq85Bmux7donkMLIqkAMIgP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARACGgw4MTc5NzIzNDMxMDEiDIiTd9%2B8sOxgCJc%2FRCrkApYafrZugA4N1jUUrmRetmR4QED%2B2TBKJEIr%2B2So4by%2BgFpWlKIulR%2FhRETnVbDlFHJM0iOzjioRaYirpLiKZa%2FyoPa21Gbcw5RB2MTS%2FOXKkkXoYtbLr7TK5JaYlELa4K%2Br%2FYNGbnxqrVVp5xRlwoMgaEJVXXSQPlZK7LBt7BXvA3TLBXvujSpaGePeQEqL8dK%2B%2FAtXwnwAEvuGv5SK6Ho4o5R5QiM1TgZ2k5m1AYoZEE%2BTRMoRt%2B8jW6bamHcE3mO84dSCgW9aq%2BHT7H5iVDc9AB30N%2BAig0%2FifNTtl7o6tXi8XSYdtAlXcGIrB981xJWJx%2BKnYRc%2FN46jvQ5x10nsUsk9zil1l%2B1kQ2hh3d597tMjaGfp1PsoU01p32NHW5ku3bv3%2BRFtjJm06eGc7uPr3ga4oDkGqaPCx2BbPfk706mZ%2FE64JplK6c2bnYcPdIBKpNFs%2FEwbm4LIt5VVQoZ%2Fp5uSMLXTkJ8GOp8BNMJ9zQ1dSt9cYDljh28n%2BvQFiZNX2AqVAqw2JUclc8%2BkkKcAgmoeQxUkK5EpMJ23ZYEyf33BwKUcLOI1XtkKziicrav7d6RM6ad3AO8ZFU2DLRUpM9g2elRsENi7jJcZrCSOtseQrlzwqEFPLcE0cHI9AJhHiDyiHKupBjAzqnyhC77sHCvaNZChJhKlDQyZ0dvxXA%2BmoCm0%2FDUbSC2R&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA344XTOE6SZSCH7HJ%2F20230209%2Feu-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230209T004432Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=05f9dc1d9b486a4b66e94dc5b7a2d03f3bfed3afd50fe244ef6ce2011599028b",
                    coordinates : {
                        lat: 45.4642035,
                        lng: 9.189982,
                    },
                    flag_name: "gp.svg",
                    id: 19,
                    info: "46yrs Guadeloupe, lives in Milan, , Italy",
                    is_certified: false,
                    name: "Marco",
                    qualitySCore: 0,
                    slogan: "Test slogan hhkj jjj"
                },
                {
                    avatar_uri: "https://dzhwp9ifoefa5.cloudfront.net/2888b92c-235f-49ea-a030-a276b2005ac7/images/empty-photo.jpg",
                    coordinates: {lat: 45.4453035, lng: 9.199982},
                    flag_name: "",
                    id: 149,
                    info: "lives in Milan, , Italy",
                    is_certified: false,
                    name: "Baylee",
                    qualitySCore: 0,
                    slogan: null
                },
            ],
            showInfoById: false
        };
    },
    mounted() {
        this.loading = true
        getServiceNotice({})
            .then((data) => {
                this.loading = false
                console.log(data)
            })
            .catch(() => {
                this.loading = false
            })
    }
};
</script>

<style>
.gm-style div[role=button] img {
    border-radius: 50% !important;
}
</style>