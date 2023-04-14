<template>
  <div class="main">

    <el-table
        :data="workerList"
        style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{ props.row.username }}</span>
            </el-form-item>
            <el-form-item label="昵称">
              <span>{{ props.row.nickname }}</span>
            </el-form-item>
            <el-form-item label="密码">
              <el-button type="text" @click="openUpdatePassword(props.row)">
                <i class="el-icon-edit"></i>编辑密码
              </el-button>
            </el-form-item>
            <el-form-item label="联系电话">
              <span>{{ props.row.phone }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="入职部门">
              <span>{{ props.row.department }}</span>
            </el-form-item>
            <el-form-item label="状态">
              <span v-if="props.row.entry">在职
              <el-button @click="changeEntry(props.$index, props.row)" type="text">员工已离职？</el-button></span>
              <span style="color: #f56c6c" v-else>离职</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.updateAt }}</span>
            </el-form-item>
            <el-form-item label="员工头像">
              <a v-if="props.row.avatar" target="_blank" :href="props.row.avatar">
                <i class="el-icon-view"></i>查看
              </a>
              <span v-else>他还没有上传头像</span>
            </el-form-item>
            <el-form-item>
              <el-button :disabled="!props.row.entry"
                         @click="handleListRole(props.row)"
                         type="info"
                         size="small"
                         plain>查看权限
              </el-button>
              <el-button :disabled="!props.row.entry"
                         type="primary"
                         @click="handleAddRole(props.row)"
                         size="small"
                         plain>添加权限
              </el-button>
              <el-button :disabled="props.row.entry"
                         @click="handleDeleteWork(props.$index, props.row.id)"
                         size="small"
                         type="danger"
                         plain>删除员工
              </el-button>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column
          label="员工 ID"
          width="430"
          prop="id">
      </el-table-column>
      <el-table-column
          label="用户名"
          width="200"
          prop="username">
      </el-table-column>
      <el-table-column
          label="所在部门"
          width="150">
        <template slot-scope="scope">
          <el-tag>{{ scope.row.department }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
          label="联系电话"
          width="240"
          prop="phone">
      </el-table-column>
      <el-table-column
          label="入职时间"
          prop="createAt">
      </el-table-column>

    </el-table>

    <el-dialog title="员工权限" :visible.sync="roleDialogVisible">
      <el-table v-loading="loading" :data="roleList">
        <el-table-column property="value" label="权限" width="300"></el-table-column>
        <el-table-column property="createAt" label="创建时间" width="300"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-popconfirm
                @confirm="handleDeleteRole(scope.$index, scope.row.id)"
                :title="'确定删除权限 < ' + scope.row.value +' > 吗？'"
            >
              <el-button slot="reference" size="small" type="danger" icon="el-icon-delete" plain>删除</el-button>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <el-dialog width="450px" title="新增权限" :visible.sync="dialogFormVisible">
      <el-form :model="addRoleForm">
        <el-form-item label="权限列表" label-width="120px">
          <el-select v-model="addRoleForm.value" placeholder="请选择新增的权限">
            <el-option v-for="(item, index) in systemRoles"
                       :key="index"
                       :label="item"
                       :value="item">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddRole">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  CreateWorkerRole,
  DeleteRoleByWorkerId,
  DeleteWorker,
  FindAllWorker,
  FindWorkerRoles,
  ListSystemRoles,
  UpdateWorker
} from "@/api/worker";

export default {


  data() {
    return {
      loading: false,
      addRoleForm: {
        wid: '',
        value: '',
      },
      workerList: [],
      systemRoles: [],
      roleDialogVisible: false,
      roleList: [],
      dialogFormVisible: false,
    }
  },

  mounted() {
    FindAllWorker().then(res => {
      this.workerList = res.data
    })
    ListSystemRoles().then(res => {
      this.systemRoles = res.data
    })
  },

  methods: {

    openUpdatePassword(worker) {
      this.$prompt('请输入新的密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        if (!value) {
          this.$message({
            message: '密码不能为空',
            type: 'danger',
          });
          return
        }
        if (value.length < 6) {
          this.$message({
            message: '请输入不少于6位的密码',
            type: 'danger',
          });
          return
        }
        worker.password = value
        UpdateWorker(worker).then(res => {
          this.$message({
            message: '账号密码修改成功',
            type: 'success',
          });
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消修改'
        });
      });
    },

    changeEntry(index, worker) {
      this.$confirm('此操作将该员工状态永久修改为离职, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        worker.entry = false
        UpdateWorker(worker).then(res => {
          this.$message({
            type: 'success',
            message: '员工离职成功!'
          });
        })
      })
    },

    handleDeleteWork(index, id) {
      DeleteWorker(id).then(res => {
        this.workerList.splice(index, 1)
        this.$message({
          type: 'success',
          message: '员工信息删除成功!'
        });
      })
    },

    handleListRole(worker) {
      this.roleDialogVisible = true;
      this.loading = true;
      FindWorkerRoles(worker.id).then(res => {
        setTimeout(() => {
          this.roleList = res.data
          this.loading = false;
        }, 700)
      })
    },

    handleDeleteRole(index, id) {
      DeleteRoleByWorkerId(id).then(res => {
        if (res.success === true) {
          this.roleList.splice(index, 1)
          this.$message({
            type: 'success',
            message: '员工权限删除成功!'
          });
        }
      })
    },

    handleAddRole(worker) {
      this.dialogFormVisible = true;
      this.addRoleForm.wid = worker.id;
    },

    submitAddRole() {
      CreateWorkerRole(this.addRoleForm).then(res => {
        if (res.success) {
          this.dialogFormVisible = false;
          this.addRoleForm.wid = '';
          this.addRoleForm.value = '';
          this.$message({
            type: 'success',
            message: '员工权限添加成功!'
          });
        }
      })
    },

  },

}
</script>

<style scoped>
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
  width: 50%;
}
</style>