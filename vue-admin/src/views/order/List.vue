<template>
  <div class="main">

    <el-table
        v-loading="loading"
        :data="orders"
        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单ID：">
              <span>{{ props.row.order.id }}</span>
            </el-form-item>
            <el-form-item label="用户ID：">
              <span>{{ props.row.user.id }}</span>
            </el-form-item>
            <el-form-item label="电影ID：">
              <span>{{ props.row.film.id }}</span>
            </el-form-item>
            <el-form-item label="场次ID：">
              <span>{{ props.row.arrangement.id }}</span>
            </el-form-item>
            <el-form-item label="电影名：">
              <span>《 {{ props.row.film.name }} 》</span>
            </el-form-item>
            <el-form-item label="座位号：">
              <span>{{ props.row.order.seats }}</span>
            </el-form-item>
            <el-form-item label="订单金额：">
              <span>{{ props.row.order.price }}</span>
            </el-form-item>
            <el-form-item label="下单时间：">
              <span>{{ props.row.order.createAt }}</span>
            </el-form-item>
            <el-form-item label="支付时间：">
              <span>{{ props.row.order.payAt }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="订单 ID"
          width="400"
          prop="order.id">
      </el-table-column>
      <el-table-column
          width="200"
          label="订单金额"
          prop="order.price">
      </el-table-column>
      <el-table-column label="订单状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.order.status === 2" type="success">支付成功</el-tag>
          <el-tag v-if="scope.row.order.status === 0" type="info">等待支付</el-tag>
          <el-tag v-if="scope.row.order.status === 3" type="warning">已被撤销</el-tag>
          <el-tag v-if="scope.row.order.status === 1" type="danger">支付失败</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template slot-scope="scope">
          <el-button @click="handle1(scope.$index, scope.row.order)" size="small" type="warning"
                     icon="el-icon-refresh-right"
                     :disabled="scope.row.order.status === 3"
                     plain>撤销订单
          </el-button>
          <el-button @click="handle2(scope.$index, scope.row.order)" size="small" type="danger"
                     icon="el-icon-circle-close"
                     plain>上报异常
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="上报异常表单" :visible.sync="dialogFormVisible">
      <el-form :model="form" style="width: 400px">
        <el-form-item style="width: 100%" label="上报人" label-width="120px">
          <el-input v-model="form.reason" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="width: 100%" label="上报原因" label-width="120px">
          <el-input v-model="form.reviewer" autocomplete="off"></el-input>
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
import {CreateOrderException, FindAllOrder, UpdateOrder} from "@/api/order";

export default {

  data() {
    return {
      loading: false,
      dialogFormVisible: false,
      orders: [],
      form: {
        oid: '',
        reason: '',
        reviewer: '',
      },
    }
  },

  mounted() {
    this.loadOrderList()
  },

  methods: {

    loadOrderList() {
      this.loading = true
      FindAllOrder().then(res => {
        if (res.success) {
          setTimeout(() => {
            this.orders = res.data
            this.loading = false
          }, 700)
        }
      })
    },

    handle1(index, order) {
      this.orders[index].order.status = 3
      UpdateOrder(this.orders[index].order).then(res => {
        console.log(res)
        this.loadOrderList();
        this.$message({
          type: 'success',
          message: '订单撤销成功!'
        });
      })
    },

    handle2(index, order) {
      this.form.oid = order.id
      this.dialogFormVisible = true
    },

    submit() {
      CreateOrderException(this.form).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '订单异常上报成功!'
          });
          this.dialogFormVisible = false
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