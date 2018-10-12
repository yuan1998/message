<template>
    <div class="page-container page-index" >
        <el-row justify="center">
            <el-col :span="24" :md="{span:20,offset:2}">
                <el-card v-loading="tableMessage === null">
                    <div class="" slot="header">
                        <span class="text-monospace" style="font-size: 22px;">
                            壹頁單章
                        </span>
                    </div>
                    <div class="">
                        <el-table
                                :data="(tableMessage || [])"
                                stripe
                                style="width: 100%"
                                :row-class-name="tableRowClassName"
                                :default-sort = "{prop: 'create_at', order: 'descending'}"
                                @row-click="rowClick"
                        >
                            <el-table-column
                                    fixed
                                    sortable
                                    prop="create_at"
                                    label="日期"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="姓名"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="phone"
                                    label="电话"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="gender"
                                    label="性别"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="age"
                                    label="年龄"
                                    width="180"
                            >
                            </el-table-column>
                            <el-table-column
                                    prop="project"
                                    label="项目"
                                    width="180"
                            >
                            </el-table-column>

                            <el-table-column
                                    prop="info"
                                    label="地区"
                                    width="180"
                            >
                                <template slot-scope="scope">
                                    <span style="margin-left: 10px">{{ scope.row.info.country + ' ' + scope.row.info.state_name + ' ' + scope.row.info.city  }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                    prop="type"
                                    label="类型"
                                    width="180"
                            >
                            </el-table-column>


                            <el-table-column
                                    prop="comment"
                                    label="留言"
                                    width="180"
                            >
                            </el-table-column>
                        </el-table>
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
                tableMessage : null,
                lastData : null,
            }
        } ,

        mounted () {
            this.lastData = (localStorage._last_date ? new Date(localStorage._last_date) : new Date()).getTime();
            console.log(this.tableMessage);
            if(!this.tableMessage)
                this.messages();
        },

        methods :
        {
            async messages ()
            {
                 let a = await api.getMessage();
                 this.tableMessage = a.data.data;
                 localStorage._last_date = this.tableMessage[ (this.tableMessage.length - 1) ].create_at;
                 console.log(this.tableMessage);
            },

            rowClick (row,column , cell , evt)
            {
                console.log(row.id);
                this.$router.push({name:'info' , params :{id : row.id }});
            },
            tableRowClassName ({row , rowIndex})
            {
                let name = '';

                if(this.lastData && (new Date(row.create_at).getTime() > this.lastData )) {
                    name = 'success-row'
                }

                return name;

            }
        }
    }

</script>

<style>

</style>