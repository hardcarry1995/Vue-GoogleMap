<script>
import { ref } from 'vue'
import { getServiceNotice } from './helpers'

export default {
    setup() {
        const center = ref({ lat: 45.464664, lng: 9.18854 })
        const markers = ref([{ position: { lat: 45.464664, lng: 9.18854 } }])
        const loading = ref(true)

        const guide = {
            'avatar_uri':
                'https://vapor-eu-south-1-assets-1609175124.s3.eu-south-1.amazonaws.com/74/conversions/valerio-thumb.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCmV1LXNvdXRoLTEiRjBEAiB29cM%2FBCAjgkLQ%2FV9wEzcaF3mNI%2BKlPAp7g43TkDyzNwIgE7l8PwGKA3Jdm0ZdNcjn2QoCtQnx99NR0qe41IPLfT8qkAMIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARACGgw4MTc5NzIzNDMxMDEiDKspEEJnokkba%2Bxr1yrkAhBxtA83ISkGmF9QmNZwkB5joBFwMJOUcAcX9ZLxx02GMEQyzaZjhhYz1vJfBYPi9R2yM2SySWzhUK40igSAH%2B8onEAZ0vs4S%2BolpwsUaWFwf%2Bw4C6T1jDZJOIHk91yEPMw2%2B1pGdnGpKxJqmWNWpUYtcbQesCwVejv54m7PvkHaHplmZx97WK5dLBOmbkZiEhESw6gkb%2FwGO2MmSk%2Bq6TfU9p2bzrZD1IS6vSUnadi6PW4aesKYdRdM2QHCgUUrPXQvhqGCb%2FQwQR7zlEPkbZ9EjVwkMuFoUBdmJdDVTZ1docK913b8AJfksOR6kq1yfQK%2FRAHdfZHdWE6LRDXWxMAb7q96CzLF4xx1dByex40QwaVI1wPJcQY6iF3zz5x02P5MCFIKUJL2BQ3NHjYBbdCwA5zA5PQCesoxHLL%2BzjEjUFxm2ziEzJu%2F%2FmE5Sc1OJTRYrFwE4R4KjeN4fMUf7EMxB%2F4rMO%2B7tZ4GOp8BRRqR9ASZQ9vnBajllq4n7fFTBUZGzFeMoJN9GFpqop%2BpzJQgALsrrov3ywMMHpcxWoQt7CPdT1VL1TaD%2BDXifZw92Dx7Y9qSzCHxfKRNBzF2ClLKcnuabrM8rWcPAQjXXpt2kQzvDj6iolOD2LcolRBTZJ9yVhZA0VnUFgSz8TL00Gnm3XV5ssRWNMXvtZMbFZu8sbKb%2FQOpKsN5ft2D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA344XTOE6WUI444NW%2F20230122%2Feu-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230122T172733Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=ed3d495c79424dc50d4a865546ebc400dbec9937deda3787234bf0d808de2d9c',
            'flag_name': 'gp.svg',
            'id': 19,
            'info': '45yrs Guadeloupe, lives in Milan, Metropolitan City of Milan, Italy',
            'is_certified': false,
            'name': 'Marco',
            'qualitySCore': 0,
            'slogan': 'Test slogan hhkj jjj',
            'private_guide': { 'title': null },
            'photo_uri':
                'https://vapor-eu-south-1-assets-1609175124.s3.eu-south-1.amazonaws.com/74/conversions/valerio-thumb-cropped.jpg?X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCmV1LXNvdXRoLTEiRjBEAiB29cM%2FBCAjgkLQ%2FV9wEzcaF3mNI%2BKlPAp7g43TkDyzNwIgE7l8PwGKA3Jdm0ZdNcjn2QoCtQnx99NR0qe41IPLfT8qkAMIwf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARACGgw4MTc5NzIzNDMxMDEiDKspEEJnokkba%2Bxr1yrkAhBxtA83ISkGmF9QmNZwkB5joBFwMJOUcAcX9ZLxx02GMEQyzaZjhhYz1vJfBYPi9R2yM2SySWzhUK40igSAH%2B8onEAZ0vs4S%2BolpwsUaWFwf%2Bw4C6T1jDZJOIHk91yEPMw2%2B1pGdnGpKxJqmWNWpUYtcbQesCwVejv54m7PvkHaHplmZx97WK5dLBOmbkZiEhESw6gkb%2FwGO2MmSk%2Bq6TfU9p2bzrZD1IS6vSUnadi6PW4aesKYdRdM2QHCgUUrPXQvhqGCb%2FQwQR7zlEPkbZ9EjVwkMuFoUBdmJdDVTZ1docK913b8AJfksOR6kq1yfQK%2FRAHdfZHdWE6LRDXWxMAb7q96CzLF4xx1dByex40QwaVI1wPJcQY6iF3zz5x02P5MCFIKUJL2BQ3NHjYBbdCwA5zA5PQCesoxHLL%2BzjEjUFxm2ziEzJu%2F%2FmE5Sc1OJTRYrFwE4R4KjeN4fMUf7EMxB%2F4rMO%2B7tZ4GOp8BRRqR9ASZQ9vnBajllq4n7fFTBUZGzFeMoJN9GFpqop%2BpzJQgALsrrov3ywMMHpcxWoQt7CPdT1VL1TaD%2BDXifZw92Dx7Y9qSzCHxfKRNBzF2ClLKcnuabrM8rWcPAQjXXpt2kQzvDj6iolOD2LcolRBTZJ9yVhZA0VnUFgSz8TL00Gnm3XV5ssRWNMXvtZMbFZu8sbKb%2FQOpKsN5ft2D&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA344XTOE6WUI444NW%2F20230122%2Feu-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230122T172733Z&X-Amz-SignedHeaders=host&X-Amz-Expires=300&X-Amz-Signature=bec18dca1dbae0213de618351c83f9f134036f10b98dd8101c37d87f31130edd',
        }

        return { center, markers, loading, guide }
    },

    mounted() {
        getServiceNotice({})
            .then((data) => {
                this.loading = false
                console.log(data)
                this.guides = data
            })
            .catch(() => {
                this.loading = false
            })
    },
}
</script>

<template>
    <section>
        <div class="loading" v-if="loading">Loading</div>
        <GMapMap v-if="!loading" :center="center" :zoom="7" map-type-id="terrain" style="width: 100%; height: 100vh">
            <GMapCluster>
                <GMapMarker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    :clickable="true"
                    :draggable="true"
                    :label="{
                        text: guide.name,
                        fontSize: '16px',
                        className: 'map-label',
                    }"
                    :icon="{
                        url: '',
                        scaledSize: { width: 0, height: 10 },
                        labelOrigin: { x: 0, y: 12 },
                    }"
                >
                    <!-- @click="showByIndex = indexLocation" -->
                    <!-- @closeclick="showByIndex = null" -->
                    <!-- :opened="showByIndex === indexLocation" -->
                    <GMapInfoWindow>
                        <div class="info-popup">
                            <div><img :src="guide.avatar_uri" /></div>
                            <div class="detail">
                                <p class="basic">
                                    <span class="name">{{ guide.name }}</span>
                                    <span class="score">{{ guide.qualitySCore }}</span>
                                </p>
                                <p class="info">{{ guide.info }}</p>
                                <p class="slogan">{{ guide.slogan }}</p>
                            </div>
                        </div>
                    </GMapInfoWindow>
                </GMapMarker>
            </GMapCluster>
        </GMapMap>
    </section>
</template>

<style src="./style.scss" lang="scss"></style>
