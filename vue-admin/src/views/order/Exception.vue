<template>
  <div class="main">

    <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="ID：">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="订单ID：">
              <span>{{ props.row.oid }}</span>
            </el-form-item>
            <el-form-item label="异常原因：">
              <span>{{ props.row.reason }}</span>
            </el-form-item>
            <el-form-item label="上报人：">
              <span>{{ props.row.reviewer }}</span>
            </el-form-item>
            <el-form-item label="是否已处理完成：">
              <span>{{ props.row.status }}</span>
            </el-form-item>
            <el-form-item label="处理结果：">
              <span>{{ props.row.result }}</span>
            </el-form-item>
            <el-form-item label="上报时间：">
              <span>{{ props.row.createAt }}</span>
            </el-form-item>
            <el-form-item label="处理时间：">
              <span>{{ props.row.endAt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="订单 ID"
          width="400"
          prop="oid">
      </el-table-column>
      <el-table-column
          width="200"
          label="上报人"
          prop="reviewer">
      </el-table-column>
      <el-table-column label="异常处理状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success">处理成功</el-tag>
          <el-tag v-if="!scope.row.status" type="danger">等待处理</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handle(scope.$index)" size="small" type="primary"
                     icon="el-icon-s-check"
                     plain>处理异常
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="异常处理结果表单" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 400px">
        <el-form-item label="处理结果" label-width="120px">
          <el-input v-model="form.result" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" label-width="120px">
          <el-select v-model="form.status" placeholder="请选择处理状态">
            <el-option label="处理完成" value="true"></el-option>
            <el-option label="还未完成" value="false"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {CreateOrderException, HandleOrderException, ListOrderException, UpdateOrder} from "@/api/order";

export default {

  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      list: [],
      form: {
        status: '',
        result: '',
      },
    }
  },

  mounted() {
    this.loadList()
  },

  methods: {

    loadList() {
      this.loading = true
      ListOrderException().then(res => {
        if (res.success) {
          setTimeout(() => {
            this.list = res.data
            this.loading = false
          }, 700)
        }
      })
    },

    handle(index) {
      this.dialogFormVisible = true
      this.list[index].status = this.form.status
      this.list[index].result = this.form.result
      this.form = this.list[index]
    },

    submit() {
      HandleOrderException(this.form).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '订单处理成功!'
          });
          this.dialogFormVisible = false
          this.loadList()
        }
      })
    }

  }

}
</script>

<style scoped>
.main {
  padding: 30px;
}

.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 100%;
}
</style>