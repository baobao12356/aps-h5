<template>
  <div>
    <span class="sub_title">待审核</span>
    <br/>
    <br/>
    <el-table v-if="assessEntity.apsupactivityqueryAuditActivity"
              v-loading="loading1"
              :data="auditList"
              border
              stripe
              style="width: 100%">

      <el-table-column prop="id" label="活动ID">
      </el-table-column>

      <el-table-column prop="activityName" label="活动名称">
        <template slot-scope="scope">
          <el-button @click="lookClick(scope.row)" type="text" size="small">{{scope.row.activityName}}</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="createTime2" label="活动创建时间">
      </el-table-column>

      <el-table-column prop="createUserName" label="创建人">
      </el-table-column>

      <el-table-column prop="updateTime2" label="提交审核时间">
      </el-table-column>

      <el-table-column prop="updateUserName" label="提交审核人">
      </el-table-column>

      <el-table-column
        label="审核人操作">
        <template slot-scope="scope">
          <el-button @click="auditPass(scope.row)" type="text" size="small">通过</el-button>
          <el-button @click="dialogVisible = true , activityId = scope.row.id" type="text" size="small">驳回</el-button>
        </template>
      </el-table-column>
    </el-table>

    <br/>
    <br/>
    <span class="sub_title">已审核</span>
    <br/>
    <br/>
    <div v-if="assessEntity.apsupactivityAuditLogqueryActivityAuditLog">
      <el-table v-loading="loading2"
                :data="auditLogList"
                border
                stripe
                style="width: 100%">
        <el-table-column type="index" label="序号" width="60">
        </el-table-column>

        <el-table-column prop="activityName" label="活动名称">
          <template slot-scope="scope">
            <el-button @click="lookClick(scope.row)" type="text" size="small">{{scope.row.activityName}}</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="activityCreaterName" label="创建人">
        </el-table-column>

        <el-table-column prop="activityId" label="活动ID">
        </el-table-column>

        <el-table-column prop="activityCreateTime2" label="活动时间">
        </el-table-column>

        <el-table-column prop="requestTime2" label="提交审核时间">
        </el-table-column>

        <el-table-column prop="auditUserName" label="审核人">
        </el-table-column>

        <el-table-column prop="auditResult2" label="审核结果">
        </el-table-column>

        <el-table-column prop="auditTime2" label="审核时间">
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <p style="text-align: right" >
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
    </div>


    <!-- 审核驳回填写备注 -->
    <el-dialog title="备注" :visible.sync="dialogVisible">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入驳回理由"
        v-model="comments">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="auditReject">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Http from '../../api/CommonApi'
  import Util from '../../utils/util'

  export default {
    name: 'activityAuditList',
    data () {
      return {
        auditList: [],
        auditLogList: [],
        loading1: false,
        loading2: false,
        comments: '',
        dialogVisible: false,
        activityId: null,
        pageSize: 10,
        pageNo: 1,
        total: 0,
        assessEntity: {},//权限
      }
    },
    created () {
      let t = this
      t.assessEntity = Util.getUrmsButton('accessCodesEnty');
      t.loadData()
    },
    methods: {
      //审核通过
      auditPass (val) {
        let t = this
        t.$confirm('确认审核通过?')
          .then(_ => {
            let param = {
              id: val.id,
              operating: 2
            }
            Http.submit(param).then(data => {
              if (data.code == 200) {
                t.loadData()
                t.$message({
                  'message': '操作成功',
                  'center': true,
                  'type': 'success',
                  'showClose': true
                })
              } else {
                t.$message({
                  'message': data.message,
                  'center': true,
                  'type': 'error'
                })
              }
            })
          })
      },
      //驳回
      auditReject (val) {
        let t = this
        t.dialogVisible = false
        let param = {
          id: t.activityId,
          operating: 3,
          comments: t.comments
        }
        Http.submit(param).then(data => {
          t.activityId = null
          if (data.code == 200) {
            t.loadData()
            t.$message({
              'message': '操作成功',
              'center': true,
              'type': 'success',
              'showClose': true
            })
          } else {
            t.$message({
              'message': data.message,
              'center': true,
              'type': 'error'
            })
          }
        })
      },
      //加载数据
      loadData () {
        let t = this
        t.loadActivityAuditList()
        t.loadActivityAuditLogList()
      },

      loadActivityAuditList () {
        let t = this
        t.loading1 = true
        let param = {}
        Http.queryActivityAuditList(param).then((data) => {
          if (data.code == 200) {
            let records2 = data.dataMap.records
            if (!!records2 && records2.length > 0) {
              for (let i = 0; i < records2.length; i++) {
                records2[i].createTime2 = Util.transformTime(records2[i].createTime)
                records2[i].updateTime2 = Util.transformTime(records2[i].updateTime)
              }
            }
            t.auditList = records2
            t.loading1 = false
          } else {
            t.$message({
              'message': data.message,
              'center': true,
              'type': 'error'
            })
            t.loading1 = false
          }
        })
      },

      loadActivityAuditLogList () {
        let t = this
        t.loading2 = true
        let param = {pageNo: t.pageNo, pageSize: t.pageSize}
        Http.queryActivityAuditLogList(param).then((data) => {
          if (data.code == 200) {
            let records2 = data.dataMap.records
            if (!!records2 && records2.length > 0) {
              for (let i = 0; i < records2.length; i++) {
                records2[i].requestTime2 = Util.transformTime(records2[i].requestTime)
                records2[i].auditTime2 = Util.transformTime(records2[i].auditTime)
                records2[i].activityCreateTime2 = Util.transformTime(records2[i].activityCreateTime)
                records2[i].auditResult2 = records2[i].auditResult == 1 ? '通过' : '驳回'
              }
            }
            t.auditLogList = records2
            t.total = data.dataMap.totalRecords//总条数
            t.loading2 = false
          } else {
            t.$message({
              'message': data.message,
              'center': true,
              'type': 'error'
            })
            t.loading2 = false
          }
        })
      },

      //切换pageSize
      handleSizeChange (val) {
        this.pageSize = val
        this.loadActivityAuditLogList()
      },
      //切换pageNo
      handleCurrentChange (val) {
        this.pageNo = val
        this.loadActivityAuditLogList()
      },
      //查看
      lookClick(val){
        this.$router.push({path: '/activityDetails', query: {id: val.activityId}});//到活动详情
      }
    }
  }
</script>
<style>
  .sub_title {
    font: 16px Medium;
  }
</style>
