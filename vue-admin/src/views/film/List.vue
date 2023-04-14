<template>
  <div class="film-list">

    <el-dialog
        title="电影信息修改"
        :visible.sync="dialog1"
        width="60%">

      <el-form ref="form" style="padding: 20px" :model="form" label-width="80px">

        <el-form-item label="电影封面">
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

        <el-form-item label="电影名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="上映地区">
          <el-select v-model="form.region" placeholder="请选择上映区域">
            <el-option label="中国大陆" value="中国大陆"></el-option>
            <el-option label="中国香港" value="中国香港"></el-option>
            <el-option label="中国台湾" value="中国台湾"></el-option>
            <el-option label="日本" value="日本"></el-option>
            <el-option label="美国" value="美国"></el-option>
            <el-option label="韩国" value="韩国"></el-option>
            <el-option label="英国" value="英国"></el-option>
            <el-option label="法国" value="法国"></el-option>
            <el-option label="印度" value="印度"></el-option>
            <el-option label="其他" value="其他"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="全片时长">
          <el-input-number v-model="form.duration" :min="10" :max="550"></el-input-number>
        </el-form-item>

        <el-form-item label="上映时间">
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy年-MM月-dd日" placeholder="选择日期" v-model="form.releaseTime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="即时上架">
          <el-switch v-model="form.status"></el-switch>
        </el-form-item>

        <el-form-item label="电影类型">
          <el-radio-group v-model="form.type">
            <el-radio style="padding-bottom: 20px" label="爱情"></el-radio>
            <el-radio label="喜剧"></el-radio>
            <el-radio label="科幻"></el-radio>
            <el-radio label="动画"></el-radio>
            <el-radio style="padding-bottom: 20px" label="恐怖"></el-radio>
            <el-radio label="悬疑"></el-radio>
            <el-radio label="冒险"></el-radio>
            <el-radio label="动作"></el-radio>
            <el-radio style="padding-bottom: 20px" label="犯罪"></el-radio>
            <el-radio label="历史"></el-radio>
            <el-radio label="古装"></el-radio>
            <el-radio label="战争"></el-radio>
            <el-radio label="纪录片"></el-radio>
            <el-radio style="padding-bottom: 20px" label="家庭"></el-radio>
            <el-radio label="传记"></el-radio>
            <el-radio label="武侠"></el-radio>
            <el-radio label="儿童"></el-radio>
            <el-radio label="短片"></el-radio>
            <el-radio label="其他"></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="内容简介">
          <el-input rows="8" type="textarea" v-model="form.introduction"></el-input>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog1 = false">取 消</el-button>
        <el-button type="primary" @click="submitUpdate()">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
        title="新增电影排片"
        :visible.sync="dialog2"
        width="50%">

      <el-form ref="form" :model="arrangement" label-width="80px">

        <el-form-item label="电影名称">
          <el-input :disabled="true" v-model="arrangement.name"></el-input>
        </el-form-item>

        <el-form-item label="开放座位">
          <el-input-number v-model="arrangement.seatNumber" :min="10" :max="100"></el-input-number>
        </el-form-item>

        <el-form-item label="放映类型">
          <el-select v-model="arrangement.type" placeholder="请选择放映类型">
            <el-option label="2D 放映" value="2D放映"></el-option>
            <el-option label="3D 放映" value="3D放映"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item style="width: 500px" label="放映日期">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="arrangement.date"
                            value-format="yyyy-MM-dd" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>

        <el-form-item style="width: 500px" label="放映时间">
          <el-col :span="11">
            <el-time-picker placeholder="开始时间" value-format="HH:mm:ss" v-model="arrangement.startTime" style="width: 100%;"></el-time-picker>
          </el-col>
          <el-col style="text-align: center" class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker placeholder="结束时间" value-format="HH:mm:ss" v-model="arrangement.endTime" style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>

        <el-form-item label="电影票价">
          <el-input-number v-model="arrangement.price" :precision="2" :step="0.1" :max="999.99"></el-input-number>
        </el-form-item>

        <el-form-item label="排片人">
          <el-input type="textarea" v-model="arrangement.founder"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog2 = false">取 消</el-button>
        <el-button type="primary" @click="submitArrange()">确 定</el-button>
      </span>
    </el-dialog>

    <el-table
        v-loading="tableLoading"
        :data="filmList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
        style="width: 100%">

      <el-table-column label="电影名">
        <template slot-scope="scope">
          <el-image
              style="width: 100px; height: 145px"
              :src="scope.row.cover">
          </el-image>
          <div style="font-size: 10px;padding-top: 5px;padding-left: 3px">{{scope.row.name}}</div>
        </template>
      </el-table-column>

      <el-table-column
          label="上映时间"
          prop="releaseTime">
      </el-table-column>

      <el-table-column
          label="类型"
          prop="type">
      </el-table-column>

      <el-table-column label="上架状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === true" type="success" disable-transitions>上架</el-tag>
          <el-tag v-if="scope.row.status === false" type="warning" disable-transitions>下架</el-tag>
        </template>
      </el-table-column>

      <el-table-column
          label="地区"
          prop="region">
      </el-table-column>

      <el-table-column label="电影时长">
        <template slot-scope="scope">
          <el-tag size="medium" effect="plain">{{ scope.row.duration }} 分钟</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="260" align="right">
        <template slot="header" slot-scope="scope">
          <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"/>
        </template>
        <template style="white-space: nowrap" slot-scope="scope">
          <el-button
              size="mini"
              icon="el-icon-edit"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)">修改
          </el-button>
          <el-button
              size="mini"
              icon="el-icon-circle-plus"
              type="success"
              @click="handleArrange(scope.$index, scope.row)">排片
          </el-button>
          <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='不用了'
              icon="el-icon-info"
              icon-color="red"
              @confirm=handleDelete(scope.$index,scope.row)
              title=" 确定要删除此电影吗？ "
          >
            <el-button
                style="margin-left: 8px"
                size="mini"
                icon="el-icon-delete"
                type="danger"
                slot="reference">删除
            </el-button>
          </el-popconfirm>
        </template>
      </el-table-column>

    </el-table>

  </div>
</template>

<script>
import {ListAllFilm, DeleteById, UpdateFilm, AddArrangement} from "@/api/film";
import config from "@/config";

export default {
  data() {
    return {
      header:{
        "Authorization": localStorage.getItem("token")
      },
      uploadAction: config.API_URL + '/upload',
      url: '',
      tableLoading: false,
      form: {
        cover: 'null',
        name: '',
        region: '',
        releaseTime: '',
        duration: 120,
        introduction: '',
        type: '',
        status: true,
      },
      arrangement: {
        name: '',
        fid: '',
        seatNumber: 40,
        price: 30.50,
        date: '',
        startTime: '',
        endTime: '',
        founder: '',
        type: '2D放映',
      },
      filmList: [],
      search: '',
      dialog1: false,
      dialog2: false,
    }
  },

  mounted() {
    this.tableLoading = true;
    ListAllFilm().then(res=>{
      setTimeout(()=>{
        this.filmList = res.data;
        this.tableLoading = false;
      },700)
    })
  },

  methods: {

    submitUpdate() {
      this.form.cover = this.url;
      UpdateFilm(this.form).then(res=>{
        this.dialog1 = false;
      })
    },

    submitArrange() {
      AddArrangement(this.arrangement).then(res=>{
        this.dialog2 = false;
      })
    },

    handleEdit(index, row) {
      this.dialog1 = true;
      this.form = row;
    },

    handleArrange(index, row) {
      this.dialog2 = true;
      this.arrangement.name = row.name
      this.arrangement.fid = row.id
    },

    handleDelete(index, row) {
      DeleteById(row.id).then(res=>{
        this.filmList.splice(index, 1)
        this.$message({
          message: '电影《' + row.name + '》删除成功！',
          type: 'success'
        });
      })
    },

    handleUploadSuccess(res){
      this.url = res;
    },

  },
}
</script>

<style scoped>
.film-list {
  padding: 20px;
}
</style>
