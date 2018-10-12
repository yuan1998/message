<template>
    <div class="page-container page-test">
        <el-row justify="center">
            <el-col :span="24" :md="{span:20,offset:2}">
                <el-card>
                    <div class="" slot="header">
                        <a href="javascript:history.go(-1)">
                            <span>
                                <i class="el-icon-back"></i>
                            </span>
                            <span>
                                {{ $route.meta.title }}
                            </span>
                        </a>
                    </div>
                    <div>
                        {{title}}
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>


</template>

<script>
    export default {
        data () {
            return {
                title : ' :lg="20" :xl="20"'
            }
        },
        mounted ()
        {
            console.log(this.$router);
        }
    }
</script>