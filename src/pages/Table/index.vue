<template>
    <el-table
        :stripe="true"
        :border="true"
        height="100vh"
        :row-class-name="tableRowClassName"
        :data="tableData"
        style="width: 100%"
    >
        <el-table-column fixed="left" prop="cid" label="编号">
        </el-table-column>
        <el-table-column prop="cname" label="名称"> </el-table-column>
        <el-table-column prop="caddr" label="地址"> </el-table-column>
        <el-table-column prop="cposi" label="坐标"> </el-table-column>
        <el-table-column fixed="right" prop="cres" label="余量">
            <template v-slot="scope">
                <i class="el-icon-first-aid-kit"></i>
                <span class="cres-table" style="margin-left: 10px">
                    {{ scope.row.cres }}
                </span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { $hPost } from '../../../server/global';
export default {
    data () {
        return {
            tableData: undefined
        }
    },
    created () {
        this.getWareHousePoi();
    },
    methods: {
        tableRowClassName ({ rowIndex }) {
            if (rowIndex === 1) {
                return 'warning-row';
            } else if (rowIndex === 3) {
                return 'success-row';
            }
            return '';
        },
        getWareHousePoi () {
            $hPost('getWareHousePoi', { customerID: '19980914' }).then(res => {
                this.tableData = res.data;
            });
        },
    },
}
</script>

<style scoped>
el-table {
    background-color: #bdc9d6;
    font-weight: 900;
}
.warning-row {
    background: rgb(223, 198, 152);
}
.cres-table {
    font-weight: 900;
    color: #f56c6c;
}
.success-row {
    background: #c3dab7;
}
</style>