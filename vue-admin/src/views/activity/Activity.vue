<template>
  <div style="padding: 40px">
    <el-button @click="dialogFormVisible = true" plain>添加影院活动</el-button>
    <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%;margin-top: 20px">
      <el-table-column
          prop="startTime"
          label="开始时间"
          width="220">
      </el-table-column>
      <el-table-column
          prop="endTime"
          label="结束时间"
          width="220">
      </el-table-column>
      <el-table-column
          prop="content"
          label="活动内容">
      </el-table-column>
      <el-table-column
          prop="number"
          label="参加人数">
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="props">
          <el-button @click="handleDelete(props.$index)" size="small" type="danger" plain>删 除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="新增活动表单" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item style="padding-right: 100px" label="开始日期" label-width="120px">
          <el-date-picker
              v-model="form.startTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="开始日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label="结束日期" label-width="120px">
          <el-date-picker
              v-model="form.endTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item style="padding-right: 100px" label="活动内容" label-width="120px">
          <el-input :rows="8" type="textarea" v-model="form.content"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitActivity">确 定 保 存</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {CreateActivity, DeleteActivityById, ListAllActivity} from "@/api/activity";

export default {

  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      loading: false,
      list: [],
      dialogFormVisible: false,
      form: {
        content: '',
        startTime: '',
        endTime: '',
      },
    }
  },

  mounted() {
    this.loadList();
  },

  methods: {

    loadList() {
      this.loading = true;
      ListAllActivity().then(res => {
        setTimeout(() => {
          this.list = res.data
          this.loading = false
        }, 700)
      })
    },

    submitActivity() {
      CreateActivity(this.form).then(res => {
        if (res.success) {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '保存成功!'
          });
          this.loadList()
        }
      })
    },

    handleDelete(index) {
      DeleteActivityById(this.list[index].id).then(res => {
        if (res.success) {
          this.list.slice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loadList()
        }
      })
    },

  },

}
</script>

<style scoped>

</style>