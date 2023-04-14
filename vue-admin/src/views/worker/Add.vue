<template>
  <div v-loading="loading" style="padding: 50px">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="*用户名">
        <el-input style="width: 300px" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="*密码">
        <el-input style="width: 300px" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item label="*昵称">
        <el-input style="width: 300px" v-model="form.nickname"></el-input>
      </el-form-item>
      <el-form-item label="*性别">
        <el-select style="width: 200px" v-model="form.gender" placeholder="请选择性别">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item style="width: 300px" label="*联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="*入职部门">
        <el-radio-group v-model="form.department">
          <el-radio label="客服部"></el-radio>
          <el-radio label="运营部"></el-radio>
          <el-radio label="宣传部"></el-radio>
          <el-radio label="策划部"></el-radio>
          <el-radio label="人事部"></el-radio>
          <el-radio label="监管部"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="员工头像">
        <el-upload
            class="upload-demo"
            drag
            accept=".png,.jpg"
            :headers="header"
            :action="uploadAction"
            :on-success="handleUploadSuccess"
            multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过50mb</div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {CreateWorker} from "@/api/worker";
import config from "@/config";

export default {
  data() {
    return {
      header: {
        "Authorization": localStorage.getItem("token")
      },
      uploadAction: config.API_URL + '/upload',
      url: '',
      loading: false,
      form: {
        username: '',
        nickname: '',
        password: '',
        gender: '',
        avatar: '',
        phone: '',
        department: '',
      }
    }
  },
  methods: {

    onSubmit() {
      this.loading = true;
      CreateWorker(this.form).then(res => {
        setTimeout(() => {
          this.$message({
            message: '成功消息：添加员工成功',
            type: 'success'
          });
          this.loading = false
        }, 700)
      })
    },

    handleUploadSuccess(res) {
      this.form.avatar = res;
    },

  }
}
</script>

<style scoped>

</style>