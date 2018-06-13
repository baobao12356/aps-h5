<template>
  <div>
    <el-table v-loading="loading" :data="tableData" border style="width: 100%" size="medium" stripe>
      <el-table-column prop="activityName" label="活动名称">
      </el-table-column>
      <el-table-column prop="createUserName" label="创建人">
      </el-table-column>
      <el-table-column prop="id" label="活动 ID" width="70">
      </el-table-column>
      <el-table-column prop="createTime2" label="创建日期">
      </el-table-column>
      <el-table-column prop="activityStatus2" label="状态" width="80">
        <template slot-scope="scope">
          <span style="color: #3c3c3c;">{{ scope.row.activityStatus2 }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div v-if="propActiveName==2 && ownerType==1">
            <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
            <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="previewClick(scope.row)">预览</el-button>
            <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="linkClick(scope.row)">链接
            </el-button>
          </div>
          <div v-else>
            <!--1 草稿 -->
            <div v-if="scope.row.activityStatus==1">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
              <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="previewClick(scope.row)">预览</el-button>
              <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="linkClick(scope.row)">链接</el-button>
              <el-button type="text" size="small" @click="editClick(scope.row)" v-if="assessEntity.apsupactivityupdateActivity">编辑</el-button>
              <el-button type="text" size="small" @click="submitClick(scope.row)" v-if="assessEntity.apsupactivitysubmit">提交</el-button>

              <el-popover v-if="assessEntity.apsupactivitydeleteActivity" placement="top" width="150" trigger="click"
                          title="确认删除？">
                <el-button size="mini" @click="deleteClick(scope.row)">确定</el-button>
                <el-button style="margin-left: 10px" type="text" size="small" slot="reference">删除</el-button>
              </el-popover>
            </div>

            <!--  22 审核驳回-->
            <div v-if="scope.row.activityStatus==22">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
              <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="previewClick(scope.row)">预览</el-button>
              <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="linkClick(scope.row)">链接</el-button>
              <el-button type="text" size="small" @click="editClick(scope.row)"
                         v-if="assessEntity.apsupactivityupdateActivity">编辑
              </el-button>
              <!-- <el-button type="text" size="small" @click="submitClick(scope.row)" v-if="assessEntity.apsupactivitysubmit">提交</el-button> -->

              <el-popover v-if="assessEntity.apsupactivitydeleteActivity" placement="top" width="150" trigger="click"
                          title="确认删除？">
                <el-button size="mini" @click="deleteClick(scope.row)">确定</el-button>
                <!-- <el-button style="margin-left: 10px" type="text" size="small" slot="reference">删除</el-button> -->
              </el-popover>
            </div>

            <!--21 审核中-->
            <div v-if="scope.row.activityStatus==21">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
              <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="previewClick(scope.row)">预览</el-button>
              <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="linkClick(scope.row)">链接</el-button>
            </div>

            <!--2 未开始 3 进行中 4.已结束-->
            <div v-if="scope.row.activityStatus==2 || scope.row.activityStatus==3 || scope.row.activityStatus==4">
              <el-button type="text" size="small" @click="lookClick(scope.row)">查看</el-button>
              <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="previewClick(scope.row)">预览</el-button>
              <el-button v-if="scope.row.urlLink != ''" type="text" size="small" @click="linkClick(scope.row)">链接</el-button>
              <el-button type="text" size="small" @click="editClick(scope.row)"
                         v-if="scope.row.activityStatus==3 && assessEntity.apsupactivityupdateActivity">编辑
              </el-button>
            </div>

          </div>

        </template>
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

    <el-dialog key="url"
               title="预览"
               :visible.sync="dialogVisible"
               width="700px"
               top="3%">
      <div class="content-box">
        <iframe :src="iframeUrl" width="375px" height="567px" scrolling="yes"></iframe>
      </div>
      <div style="float: right;margin-right: 20px">
        <qrcode-vue :value="iframeUrl" :size="200" level="H" foreground="#365F06"></qrcode-vue>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">好的</el-button>
      </span>
    </el-dialog>

    <el-dialog key="link"
               title="查看链接"
               :visible.sync="dialogVisible2"
               width="420px">
      {{iframeUrl}}

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible2 = false">好的</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>

  import Http from '../api/CommonApi';
  import Util from '../utils/util';
  import QrcodeVue from 'qrcode.vue';

  export default {
    name: 'tabList',
    props: ['propActiveName', 'ownerType'],
    data() {
      return {
        str: 123,
        total: 0,//总条数
        pageNo: 1,//当前页数
        pageSize: 10,//每页显示条数
        currentPage4: 0,
        tableData: [],
        activityName: this.propActiveName,
        loading: false,
        visible5: false,
        dialogVisible: false,//预览
        dialogVisible2: false,//链接
        iframeUrl: '',//预览链接
        assessEntity: {},//权限
      }
    },
    created() {
      let t = this;
      console.log(t.activityName == 1 ? '平台' : '商场');
      t.assessEntity = Util.getUrmsButton('accessCodesEnty');
      t.queryActivity();
    },
    components: {
      "qrcode-vue": QrcodeVue
    },
    methods: {
      queryActivity(){
        let t = this;
        t.loading = true;
        let pa = {
          "pageNo": t.pageNo,
          "pageSize": t.pageSize,
          "ownerType": t.activityName
        }
        Http.queryActivity(pa).then(function (data) {
          console.log(data)
          if (data.code == 200) {
            let records2 = data.dataMap.records;
            if (!!records2 && records2.length > 0) {
              for (let i = 0; i < records2.length; i++) {
                records2[i].createTime2 = Util.transformTime(records2[i].createTime);
                records2[i].activityStatus2 = Util.getStatus(records2[i].activityStatus);
              }
            }
            t.tableData = records2;
            t.total = data.dataMap.totalRecords;//总条数
            t.loading = false;
          } else {
            t.$message.error(data.message);
            t.loading = false;
          }
        }).catch(function () {
        })
      },
      //切换标签页
      tabsClick(tab, event){
        this.activityName = tab.name;
        this.queryActivity();
      },
      //切换每页多少条
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.queryActivity();
      },
      //点击页
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNo = val;
        this.queryActivity();
      },
      //预览
      previewClick(val){
        console.log('预览', val)
        this.dialogVisible = true;
        this.iframeUrl = val.urlLink;
      },
      //链接
      linkClick(val){
        console.log('链接', val)
        this.dialogVisible2 = true;
        this.iframeUrl = val.urlLink;
      },
      //查看
      lookClick(val){
         console.log(val,'一行数据')
        this.$router.push({path: '/activityDetails', query: {id: val.id}});//到活动详情
      },
      //编辑
      editClick(val){
        this.$router.push({path: '/activityDefinition', query: {id: val.id}});//到活动详情
      },
      //删除
      deleteClick(val){
        const t = this;

        Http.deleteActivity(val.id).then((data) => {
          console.log(data)
          if (data.code == 200) {
            document.querySelector("#app").click()
            t.queryActivity();
            t.$message.success('删除成功');
          } else {
            t.$message.error('删除失败!' + data.message);
          }
        })
      },
      submitClick(val){
        const t = this;
        let param = {
          id: val.id,
          operating: 1
        }
        Http.submit(param).then((data) => {
          if (data.code == 200) {
            t.queryActivity();
            t.$message.success('提交审核中');
          } else {
            t.$message.error('提交失败!' + data.message);
          }
        })
      }

    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .content-box {
    border: 1px solid #4c4c4c;
    width: 403px;
    height: auto;
    min-height: 600px;
    display: inline-block;
    margin: 0 0 0 0;
    padding: 30px 10px;
    border-radius: 50px;
    box-sizing: border-box;
    background: #f8f8f8;
  }
</style>
