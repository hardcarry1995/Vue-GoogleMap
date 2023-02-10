<template>
    <GMapMap ref="map" :center="center" :zoom="zoom" style='height: 100vh' @idle="handleMove" @zoom_changed="updateZoomLevel">
        <GMapCluster>
            <GMapMarker
                v-for="(marker, index) in data"
                :key="index"
                :position="marker?.coordinates"
                @click="showInfoById = index"
                :label="{
                    text: index + 1 + '',
                    fontSize: '16px',
                    className: 'map-label',
                }"
            >
                <!-- :icon="{
                    url: marker.avatar_uri,
                    scaledSize: { width: 30, height: 30 },
                    labelOrigin: { x: 0, y: 12 },
                    custom: 'px'
                }" -->
                <!-- @mouseover="showInfoById = index"
                @mouseout="showInfoById = false" -->
            <GMapInfoWindow
                :opened="showInfoById === index"
                :closeclick="true"
                @closeclick="showInfoById = false"
            >
                <div class="info-popup">
                    <div>
                        <img :src="marker.avatar_uri" />
                    </div>
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
        </GMapCluster>
    </GMapMap>
  </template>
  
<script>
import { getServiceNotice } from './helpers'
import "./style.scss"

export default {
    data() {
        return {
            loading: false,
            viewport: null,
            center: { lat: 45.4642035, lng: 9.189982 }, //  
            zoom: 12,
            markers: [ ],
            showInfoById: false
        };
    },
    methods: {
        handleMove() {
            const map = this.$refs.map.$mapObject;
            const bounds = map.getBounds()
            this.viewport = bounds
        },
        updateZoomLevel() {
            const map = this.$refs.map.$mapObject;
            this.zoom = map.getZoom();

            getServiceNotice({zoom: this.zoom})
            .then((data) => {
                this.loading = false
                console.log("second data", data)

                this.markers.delete();
                for (let i = 0; i < data.length; i++) {
                    for (let index = 0; index < data[i].users.length; index++) {
                        let lat = 0;
                        let lng = 0;
                        switch(index % 4){
                            case 0:
                                lat = data[i].users[index].coordinates.lat + Math.random()/13;
                                lng = data[i].users[index].coordinates.lng + Math.random()/13;
                                break;
                            case 1:
                                lat = data[i].users[index].coordinates.lat - Math.random()/13;
                                lng = data[i].users[index].coordinates.lng + Math.random()/13;
                                break;
                            case 2:
                                lat = data[i].users[index].coordinates.lat + Math.random()/13;
                                lng = data[i].users[index].coordinates.lng - Math.random()/13;
                                break;
                            case 3:
                                lat = data[i].users[index].coordinates.lat - Math.random()/13;
                                lng = data[i].users[index].coordinates.lng - Math.random()/13;
                                break;
                            default:
                        }
                        
                        const userdata = {
                            avatar_uri :  data[i].users[index].avatar_uri,
                            coordinates : {
                                lat: lat,
                                lng: lng,
                            },
                            flag_name: data[i].users[index].flag_name,
                            id: data[i].users[index].id,
                            info: data[i].users[index].info,
                            is_certified: data[i].users[index].is_certified,
                            name: data[i].users[index].name,
                            qualitySCore: data[i].users[index].qualitySCore,
                            slogan: data[i].users[index].slogan
                        }
                        this.markers.push(userdata)
                    }
                }
            })
            .catch(() => {
                this.loading = false
            })
        }
    },
    computed: {
        data(){
            return this.markers.filter(item => this.viewport.contains(item.coordinates))
        }
    },
    mounted() {
        setTimeout(()=>{
            this.handleMove()
        }, 1000)
        
        this.loading = true
        getServiceNotice({})
            .then((data) => {
                this.loading = false
                console.log("initial data", data)
                this.center = data[1].coordinates;
                for (let i = 0; i < data.length; i++) {
                    for (let index = 0; index < data[i].users.length; index++) {
                        let lat = 0;
                        let lng = 0;
                        switch(index % 4){
                            case 0:
                                lat = data[i].users[index].coordinates.lat + Math.random()/13;
                                lng = data[i].users[index].coordinates.lng + Math.random()/13;
                                break;
                            case 1:
                                lat = data[i].users[index].coordinates.lat - Math.random()/13;
                                lng = data[i].users[index].coordinates.lng + Math.random()/13;
                                break;
                            case 2:
                                lat = data[i].users[index].coordinates.lat + Math.random()/13;
                                lng = data[i].users[index].coordinates.lng - Math.random()/13;
                                break;
                            case 3:
                                lat = data[i].users[index].coordinates.lat - Math.random()/13;
                                lng = data[i].users[index].coordinates.lng - Math.random()/13;
                                break;
                            default:
                        }
                        
                        const userdata = {
                            avatar_uri :  data[i].users[index].avatar_uri,
                            coordinates : {
                                lat: lat,
                                lng: lng,
                            },
                            flag_name: data[i].users[index].flag_name,
                            id: data[i].users[index].id,
                            info: data[i].users[index].info,
                            is_certified: data[i].users[index].is_certified,
                            name: data[i].users[index].name,
                            qualitySCore: data[i].users[index].qualitySCore,
                            slogan: data[i].users[index].slogan
                        }
                        this.markers.push(userdata)
                    }
                }
                
            })
            .catch(() => {
                this.loading = false
            })
    },
};
</script>

<style>
.gm-style div[role=button] img {
    border-radius: 50% !important;
}
</style>