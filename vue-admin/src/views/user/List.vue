<template>
  <div class="main">
    <el-table
        :data="userList"
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
            <el-form-item label="邮箱">
              <span>{{ props.row.email }}</span>
            </el-form-item>
            <el-form-item label="性别">
              <span>{{ props.row.gender }}</span>
            </el-form-item>
            <el-form-item label="生日">
              <span>{{ props.row.birthday }}</span>
            </el-form-item>
            <el-form-item label="个人简介">
              <span>{{ props.row.info }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.updateAt }}</span>
            </el-form-item>
            <el-form-item label="用户头像 URL">
              <a target="_blank" :href="props.row.avatar">{{ props.row.avatar }}</a>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
          label="用户 ID"
          width="430"
          prop="id">
      </el-table-column>
      <el-table-column
          label="用户名"
          width="200"
          prop="username">
      </el-table-column>
      <el-table-column
          label="昵称"
          width="200"
          prop="nickname">
      </el-table-column>
      <el-table-column
          label="注册时间"
          prop="createAt">
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import {FindAllUser, UpdateUser} from "@/api/user";

export default {


  data() {
    return {
      userList: [],
    }
  },

  mounted() {
    FindAllUser().then(res => {
      this.userList = res.data
    })
  },

  methods: {

    openUpdatePassword(user) {
      this.$prompt('请输入新的密码', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({value}) => {
        if (!value) {
          this.$message({
            type: 'danger',
            message: '密码不能为空'
          });
          return
        }
        if (value.length < 6) {
          this.$message({
            type: 'danger',
            message: '请输入不少于6位的密码'
          });
          return
        }
        user.password = value
        UpdateUser(user).then(res => {
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
    }

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