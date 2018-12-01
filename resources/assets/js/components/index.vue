<template>
    <div class="page-container page-index">
        <el-row justify="center">
            <el-col :span="24" :md="{span:20,offset:2}">
                <el-card v-loading="tableMessage === null">
                    <div class="" slot="header">
                        <span class="text-monospace" style="font-size: 22px;">
                            什么鬼
                        </span>
                    </div>
                    <div class="">
                        <el-table
                                :data="(tableMessage || [])"
                                stripe
                                style="width: 100%"
                                :row-class-name="tableRowClassName"
                                :default-sort="{prop: 'create_at', order: 'descending'}"
                                @row-click="rowClick"
                        >
                            <el-table-column
                                    fixed
                                    sortable
                                    label="日期"
                                    width="180"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.create_at || '-' }}
                                </span>
                            </el-table-column>
                            <el-table-column
                                    label="姓名"
                                    width="180"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.name || '-' }}
                                </span>
                            </el-table-column>
                            <el-table-column
                                    label="电话"
                                    width="180"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.phone || '-' }}
                                </span>
                            </el-table-column>
                            <el-table-column
                                    label="性别"
                                    width="180"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.gender || '-' }}
                                </span>
                            </el-table-column>
                            <el-table-column
                                    label="年龄"
                                    width="180"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.age || '-' }}
                                </span>
                            </el-table-column>
                            <el-table-column
                                    label="项目"
                                    width="180"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.project || '-' }}
                                </span>
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
                                    label="类型"
                                    width="180"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.type || '-' }}
                                </span>
                            </el-table-column>
                            <el-table-column
                                    label="留言"
                                    width="180"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.comment || '-' }}
                                </span>
                            </el-table-column>
                            <el-table-column
                                    label="来源链接"
                                    width="450"
                            >
                                <span slot-scope="scope">
                                    {{ scope.row.url || '-' }}
                                </span>
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
        data() {
            return {
                title       : 'test',
                tableMessage: null,
                lastData    : null,
                interval    : null,
            }
        },

        mounted() {
            this.lastData = (localStorage._last_date ? new Date(localStorage._last_date) : new Date()).getTime();
            console.log(this.tableMessage);
            if (!this.tableMessage)
                this.messages();
        },

        methods: {
            async messages() {
                let a = await api.getMessage();

                this.tableMessage       = a.data.data;
                localStorage._last_date = this.tableMessage[ (this.tableMessage.length - 1) ].create_at;

                this.interval = setInterval(() => {
                    this.checkHasNewMessage();
                }, 10000)

            },

            async checkHasNewMessage() {
                let res = await api.checkNew();
                if (res.status == 201) {
                    this.$notify({
                        duration : 0,
                        message  : '有新的留言,请刷新.',
                        title    : '提示',
                        type     : 'info',
                        showClose: false,
                    });
                    this.interval && clearInterval(this.interval);
                }
            },
            rowClick(row, column, cell, evt) {
                this.$router.push({ name: 'info', params: { id: row.id } });
            },
            tableRowClassName({ row, rowIndex }) {
                let name = '';

                if (this.lastData && (new Date(row.create_at).getTime() > this.lastData)) {
                    name = 'success-row'
                }

                return name;
            }
        }
    }

</script>

<style>

</style>
