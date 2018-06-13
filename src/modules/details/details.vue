<style>
  .el-col {
    margin-bottom: 10px;
  }
</style>
<template>
  <div>
    <el-row class="row-bg">
      <el-col :span="22" :offset="1">
        <a href="javascript:history.back();"><i class="el-icon-arrow-left"></i>返回</a>
      </el-col>
      <el-col :span="22" :offset="1">
        <h3>活动详情</h3>
      </el-col>
      <el-col :span="22" :offset="1">
        活动名称：{{activityInfo.activityName}}
      </el-col>
      <el-col :span="22" :offset="1">
        活动时间：{{activityInfo.activityTime}}
      </el-col>
      <el-col :span="22" :offset="1">
        页面标题：{{activityInfo.pageTitle}}
      </el-col>
      <el-col :span="22" :offset="1">
        页面描述：{{activityInfo.pageDesc}}
      </el-col>
      <el-col :span="22" :offset="1">
        页面关键词：{{activityInfo.pageKey}}
      </el-col>
      <el-col :span="22" :offset="1">
        分享标题：{{activityInfo.shareTitle}}
      </el-col>
      <el-col :span="22" :offset="1">
        分享内容：{{activityInfo.shareContent}}
      </el-col>
      <el-col :span="22" :offset="1">
        分享图片：<img v-bind:src="shareImg" alt="分享图片" style="margin-bottom:-40px">
      </el-col>
    </el-row>

    <el-row class="row-bg">
      <el-col :span="22" :offset="1" style="border-top: 1px solid #cccccc;margin-top:50px"></el-col>
    </el-row>

    <el-row class="row-bg">
      <el-col :span="22" :offset="1">
        <h3>活动数据</h3>
        <el-button v-if="isExport" type="text" @click="downList">导出列表</el-button>
        <el-table
                :data="tableData"
                style="width: 100%">
          <el-table-column
                  prop="activityId"
                  label="活动ID"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="nickName"
                  label="姓名"
                  width="180">
          </el-table-column>
          <el-table-column
                  prop="mobile"
                  label="手机号">
          </el-table-column>
          <el-table-column
                  v-if="hasMall"
                  prop="mallName"
                  label="商场">
          </el-table-column>
          <el-table-column
                  v-if="hasCity"
                  prop="cityName"
                  label="城市">
          </el-table-column>
        </el-table>

        <p style="text-align: right">
          <el-pagination small
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pageNo"
                         :page-sizes="[10, 20, 30]"
                         :page-size="pageSize"
                         layout="total, sizes, prev, pager, next"
                         :total="total">
          </el-pagination>
        </p>
      </el-col>
    </el-row>

  </div>
</template>

<script>

  import Http from '../../api/CommonApi';
  import Util from '../../utils/util';
  //活动详情
  export default {
    name: 'activityDetails',
    data() {
      return {
        activityInfo: {},
        id: this.$route.query.id,
        shareImg: '',
        total: 0,//总条数
        pageNo: 1,//当前页数
        pageSize: 10,//每页显示条数
        tableData: [],
        hasMall: false,//是否显示商场
        hasCity: false,//是否显示城市
        isExport: false,//是否显示导出按钮
      }
    },
    created() {
      let t = this;
      if (!t.id) {
        t.$message.error('获取必要参数失败');
        return false;
      }
      Http.getActivity(t.id).then((data)=> {
        console.log(data)
        if (data.code == 200) {
          t.activityInfo = data.dataMap;
          t.activityInfo.activityTime = Util.transformTime(data.dataMap.startTime) + ' 至 ' + Util.transformTime(data.dataMap.endTime);
          t.shareImg = data.dataMap.shareImage
        } else {
          t.$message.error('获取活动详情失败');
        }
      });

      t.queryApplyInfoList();
    },
    methods: {
      nextStep(){
        this.$router.push('/selectTemplate');//到活动定义
      },
      //导出列表
      downList(){
        const t = this;
        window.location.href = '/api-aps/up/applyInfo/downloadApplyInfoList/' + t.id;
      },
      queryApplyInfoList(){
        let t = this;
        t.loading = true;
        let pa = {
          "pageNo": t.pageNo,
          "pageSize": t.pageSize,
          "ownerType": t.activityName,
          "activityId": t.id
        }
        Http.queryApplyInfoList(pa).then((data)=> {
          console.log(data)
          if (data.code == 200) {
            let records2 = data.dataMap.pageData.records;
            if (!!data.dataMap.pageData.records && data.dataMap.pageData.records.length > 0) {
              t.isExport = true;
            }
            t.tableData = records2;

            t.hasMall = data.dataMap.hasMall;
            t.hasCity = data.dataMap.hasCity;
            t.total = data.dataMap.pageData.totalRecords;//总条数
            t.loading = false;
          } else {
            t.$message.error(data.message);
            t.loading = false;
          }
        }).catch(function () {
        })
      },
      //切换每页多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.queryApplyInfoList();
      },
      //点击页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNo = val;
        this.queryApplyInfoList();
      },
    }
  }
</script>