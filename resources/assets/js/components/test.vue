<template>
    <div class="page-container page-test">
        <el-row justify="center">
            <el-col :span="24" :md="{span:20,offset:2}">
                <el-card v-loading="data === null">
                    <div class="" slot="header">
                        <el-button type="text" @click="()=>{$router.go(-1)}">
                            <span>
                                <i class="el-icon-back"></i>
                            </span>
                            <span>
                                {{ title }}
                            </span>
                        </el-button>
                    </div>
                    <div v-if="data !== null">
                        <div class="y-map-container">
                            <div class="y-map-wrap">
                                <div class="y-map">
                                    <el-amap v-if="center != null" :zoom="zooms" ref="map" :center="center">
                                        <el-amap-circle fillColor="#A3CCFF" strokeColor="#549FE3" strokeWeight="3" :center="center" :radius="radius" :fill-opacity="fillOpacity" ></el-amap-circle>

                                    </el-amap>
                                </div>
                            </div>
                        </div>
                        <div class="y-info-container">
                            <el-row>
                                <el-col :sm="12">
                                    <p class="text-monospace">

                                        <span >
                                            姓名
                                        </span>
                                        {{data.name}}
                                    </p>
                                </el-col>
                                <el-col :sm="12">
                                    <p class="text-monospace">

                                        <span >
                                            电话
                                        </span>
                                        {{data.phone}}
                                    </p>
                                </el-col>
                                <el-col :sm="12">
                                    <p class="text-monospace">
                                        <span >
                                            性别
                                        </span>
                                        {{data.gender}}
                                    </p>
                                </el-col>
                                <el-col :sm="12">
                                    <p class="text-monospace">

                                        <span >
                                            年龄
                                        </span>
                                        {{data.age}}
                                    </p>
                                </el-col>

                                <el-col :sm="12">
                                    <p class="text-monospace">

                                        <span >
                                            类型
                                        </span>
                                        {{data.type}}
                                    </p>
                                </el-col>
                                <el-col :sm="12">
                                    <p class="text-monospace">

                                        <span >
                                            项目
                                        </span>
                                        {{data.project}}
                                    </p>
                                </el-col>





                            </el-row>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>


</template>

<script>
    import api from '../api';
    export default {
        data () {
            return {
                title : 'loading...',
                id : null,
                data : null,
                center : null,
                zooms: 12,
                radius: 4800,
                fillOpacity: 0.5,
            }
        },
        mounted ()
        {
            this.id = this.$route.params.id;
            this.getMessage(this.id);

        },

        methods : {
            async getMessage(id)
            {
                let res = await api.message(id);
                this.data = res.data;
                this.title = this.data.name + "" +this.data.phone;
                this.center = [this.data.info.lon , this.data.info.lat];
            }
        }
    }
</script>