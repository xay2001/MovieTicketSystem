<template>
  <div class="main">
    <div class="item2" v-for="(item, index) in leavingMessageList" :key="index">
      <div style="display: flex">
        <img class="av2" :src="item.user.avatar" alt="null">
        <div>
          <div class="d2">{{ item.user.nickname }}</div>
          <div v-if="!item.user.nickname" class="d2">匿名用户</div>
          <div class="d3">{{ item.leavingMessage.content }}</div>
          <div class="d2">Time: {{ item.leavingMessage.createAt }}</div>
        </div>
      </div>
      <div class="reply">
        <div class="d2">客服回复:</div>
        <div class="d3">{{ item.leavingMessage.reply }}</div>
      </div>
      <div class="reply">
        <el-button @click="handleReply(item, index)" type="text">回复留言Reply</el-button>
      </div>
    </div>

    <el-dialog title="回复留言" :visible.sync="dialogFormVisible">
      <el-input type="textarea" :rows="8" v-model="form.reply" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitReply">确 定 提 交</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  ListAllLeavingMessage, ReplyLeavingMessage,
} from "@/api/leaving";

export default {

  data() {
    return {
      workerList: [],
      leavingMessageList: [],
      form: {
        reply: ''
      },
      dialogFormVisible: false,
    }
  },

  mounted() {
    ListAllLeavingMessage().then(res => {
      this.leavingMessageList = res.data
    })
  },

  methods: {

    handleReply(item, index) {
      this.dialogFormVisible = true
      this.form = item
    },

    submitReply() {
      ReplyLeavingMessage(this.form).then(res => {
        if (res.success) {
          this.dialogFormVisible = false
          this.$message({
            type: 'success',
            message: '回复留言成功'
          });
        }
      })
    },

  },

}
</script>

<style scoped>

.main {
  color: #000000;
  padding: 40px;
}

.item2 {
  padding-bottom: 60px;
}

.av {
  width: 76px;
  height: 76px;
  border-radius: 38px;
  margin-right: 20px;
  float: left;
}

.av2 {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 20px;
  margin-top: 10px;
}

.d1 {
  letter-spacing: 2px;
  line-height: 30px;
  color: #afbac4;
  font-size: 14px;
}

.d2 {
  color: #afbac4;
  letter-spacing: 2px;
  font-size: 14px;
  line-height: 30px;
}

.d3 {
  letter-spacing: 2px;
  font-size: 15px;
  font-weight: 400;
  line-height: 30px;
  color: #000000;
}

.el-button--text {
  color: #57cc8a;
}

.btn {
  float: right;
  background: #57cc8a;
  letter-spacing: 1px;
}

.reply {
  padding-left: 75px;
  padding-top: 10px;
}

</style>