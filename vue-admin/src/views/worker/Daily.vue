<template>
  <div style="padding: 40px">
    <el-button @click="dialogFormVisible = true" plain>添加今日工作</el-button>
    <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%;margin-top: 20px">
      <el-table-column
          prop="createAt"
          label="添加时间"
          width="220">
      </el-table-column>
      <el-table-column label="级别" width="150">
        <template slot-scope="props">
          <el-tag type="info" v-if="props.row.type === 1" effect="dark">
            普通
          </el-tag>
          <el-tag type="success" v-if="props.row.type === 2" effect="dark">
            重要
          </el-tag>
          <el-tag type="danger" v-if="props.row.type === 3" effect="dark">
            非常重要
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
          prop="content"
          label="主要内容">
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="props">
          <el-button @click="handleDelete(props.$index)" size="small" type="danger" plain>删 除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="工作级别" label-width="120px">
          <el-select v-model="form.type" placeholder="请选择活动区域">
            <el-option label="普通" value="1"></el-option>
            <el-option label="重要" value="2"></el-option>
            <el-option label="非常重要" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label="主要内容" label-width="120px">
          <el-input :rows="8" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveDailyWork">确 定 保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {AddDailyWork, DeleteDailyWork, ListDailyWork} from "@/api/worker";

export default {

  data() {
    return {
      loading: false,
      list: [],
      dialogFormVisible: false,
      form: {
        type: '',
        content: '',
      },
    }
  },

  mounted() {
    this.loadList();
  },

  methods: {

    loadList() {
      this.loading = true;
      ListDailyWork().then(res => {
        setTimeout(() => {
          this.list = res.data
          this.loading = false
        }, 700)
      })
    },

    saveDailyWork() {
      AddDailyWork(this.form).then(res => {
        this.dialogFormVisible = false
        this.loadList()
        this.$message({
          type: 'success',
          message: '保存成功!'
        });
      })
    },

    handleDelete(index) {
      DeleteDailyWork(this.list[index].id).then(res => {
        this.list.slice(index, 1)
        this.loadList()
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      })
    },

  },

}
</script>

<style scoped>

</style>