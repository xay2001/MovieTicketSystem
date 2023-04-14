<template>
  <div class="main">
    <h3 style="letter-spacing: 1px;font-weight: 400;padding-bottom: 20px">基本设置</h3>

    <div>
      <el-form style="width: 350px;float: left" label-position="top" ref="form" :model="worker" label-width="80px">
        <el-form-item style="padding: 0" label="用户名">
          <el-input v-model="worker.username"></el-input>
        </el-form-item>
        <el-form-item style="padding: 0" label="昵称">
          <el-input v-model="worker.nickname"></el-input>
        </el-form-item>
        <el-form-item style="padding: 0" label="密码">
          <el-input type="password" v-model="worker.password"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="worker.gender">
            <el-radio label="男生"></el-radio>
            <el-radio label="女生"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="padding: 0" label="电话号码">
          <el-input v-model="worker.phone"></el-input>
        </el-form-item>
        <el-form-item label="*入职部门">
          <el-radio-group style="width: 600px" v-model="worker.department">
            <el-radio label="客服部"></el-radio>
            <el-radio label="运营部"></el-radio>
            <el-radio label="宣传部"></el-radio>
            <el-radio label="策划部"></el-radio>
            <el-radio label="人事部"></el-radio>
            <el-radio label="监管部"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item style="padding-top: 20px">
          <el-button type="primary" @click="onSubmit">更新基本信息</el-button>
        </el-form-item>
      </el-form>
      <div>
        <img style="padding-bottom: 10px;padding-left: 150px;width: 150px; height: 150px;" alt=""
             :src="worker.avatar">
        <el-upload
            style="padding-left: 500px;letter-spacing: 1px"
            class="upload-demo"
            accept=".png,.jpg"
            :headers="header"
            :action="uploadAction"
            :on-success="handleUploadSuccess"
            multiple
            :limit="1">
          <el-button style="width: 150px" size="small" type="primary">
            <i class="el-icon-upload2"></i> 点击上传
          </el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件</div>
        </el-upload>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/config";
import {FindWorkerById, UpdateWorker} from "@/api/worker";

export default {

  data() {
    return {
      header: {
        "Authorization": localStorage.getItem("token")
      },
      uploadAction: config.API_URL + '/upload',
      worker: {
        nickname: '',
        password: '',
        phone: '',
        gender: '',
        avatar: '',
        department: '',
      }
    }
  },

  mounted() {
    if (localStorage.getItem("role") === 'worker') {
      FindWorkerById(localStorage.getItem("wid")).then(res => {
        this.worker = res.data;
      })
    }
  },

  methods: {

    onSubmit() {
      UpdateWorker(this.worker).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '员工基本信息更新成功!'
          });
        }
      })
    },

    handleUploadSuccess(res) {
      this.worker.avatar = res;
      UpdateWorker(this.worker).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '头像上传成功!'
          });
        }
      })
    }

  },

}

</script>

<style scoped>

.main {
  padding: 50px;
  height: 800px;
}

>>> .el-form--label-top .el-form-item__label {
  padding: 0;
}

.el-form-item {
  margin-bottom: 5px;
}
</style>