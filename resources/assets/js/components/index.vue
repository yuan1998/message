<template>
    <div class="page-container page-index" style="padding-top: 50px;padding-bottom: 50px;"
         v-loading.fullscreen.lock="!loaded">
        <el-row justify="center">
            <el-col :span="24" :md="{span:20,offset:2}">
                <el-card v-if="loaded">
                    <div class="" slot="header">
                        <span class="text-monospace" style="font-size: 22px;">
                            什么鬼
                        </span>
                    </div>
                    <div v-if="!tableMessage">
                        <h1>
                            Call People.
                        </h1>
                    </div>
                    <div v-else v-loading="loading">
                        <div class="">
                            <el-table
                                    :data="tableMessage"
                                    stripe
                                    style="width: 100%"
                                    :row-class-name="tableRowClassName"
                                    @row-click="rowClick"
                                    max-height="700"
                            >
                                <el-table-column
                                        fixed
                                        prop="create_at"
                                        label="日期"
                                        width="180"
                                >
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
                                        label="类型"
                                        width="180"
                                >
                                    <span slot-scope="scope">
                                        {{ scope.row.type || '-' }}
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
                                        prop="ip"
                                        label="地区"
                                        width="180"
                                >
                                </el-table-column>
                                <el-table-column
                                        label="地区"
                                        width="180"
                                >
                                    <template slot-scope="scope">
                                        <span style="margin-left: 10px">{{ scope.row.info.country + ' ' + scope.row.info.state_name + ' ' + scope.row.info.city  }}</span>
                                    </template>
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
                        <div class="pagination-container" >
                            <div class="block center" style="text-align: center;margin-top: 25px;">
                                <el-pagination
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page.sync="page"
                                        :page-sizes="[1, 20, 30, 50, 100]"
                                        :page-size="paginate"
                                        layout="sizes, prev, pager, next, total"
                                        :total="pagination.total">
                                </el-pagination>
                            </div>
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
        data() {
            return {
                page        : 1,
                paginate    : 20,
                title       : 'test',
                firstLoading: false,
                loading    : false,
                tableMessage: null,
                pagination  : null,
                lastData    : null,
                interval    : null,
            }
        },

        async mounted() {
            this.firstLoading = true;
            this.lastData = (localStorage._last_date ? new Date(localStorage._last_date) : new Date()).getTime();

            if (!this.tableMessage) {
                await this.messages();
                (this.tableMessage.length > 0) && (localStorage._last_date = this.tableMessage[ 0 ].create_at);
            }
            this.firstLoading = false;
        },

        methods: {
            async messages() {
                this.loading = true;
                let a = await api.getMessage({ page: this.page, paginate: this.paginate });

                this.tableMessage = a.data.data;
                this.pagination   = a.data.meta.pagination;

                if (!this.interval) {
                    this.interval = setInterval(() => {
                        this.checkHasNewMessage();
                    }, 10000)
                }
                this.loading = false;
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
            },
            handleSizeChange(val) {
                this.paginate = val;
                this.messages();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.messages();
            }

        },
        computed: {
            loaded() {
                return ( !this.firstLoading || this.tableMessage);
            }
        }
    }

</script>

<style>

</style>
