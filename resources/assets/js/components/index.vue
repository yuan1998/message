<template>
    <div class="page-container page-index">
        <el-row justify="center">
            <el-col :span="24" :md="{span:20,offset:2}">
                <el-card>
                    <div class="" slot="header">
                                <span>
                                    {{ $route.meta.title }}
                                </span>
                    </div>
                    <div class="">

                        <div class="">
                            <router-link to="test">
                                Go Test.
                            </router-link>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>


</template>

<script>
    import api from "../api"

    export default {
        data () {
            return {
                title: 'test' ,
            }
        } ,

        mounted () {
            console.log(this.$router);
            this.messages();

        },

        methods :
        {
             async messages ()
            {
                 let a = await api.getMessage();
                 console.log(a);
            }
        }
    }

</script>

<style>

</style>