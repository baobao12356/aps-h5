<style lang="scss" rel="stylesheet/scss" scoped>

  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }

  .el-col {
    border-radius: 4px;
  }

  .bg-purple-dark {
    background: #99a9bf;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .bg-purple-light {
    background: #e5e9f2;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }

  .operation-size {
    margin: 20px 0;

    button {
      background-color: #5BC0DE !important;
      border-color: snow;
      width: 90px;
      border-radius:6px;
    }
  }

  .search-btn {
    background-color: #5BC0DE !important;
    border-color: snow;
    border-radius:6px;
  }

  .search-form {
    margin-top: 10px;
    padding-top: 10px;
    background-color: #fafafa;
  }

  .block {
    margin-top:20px;
    margin-bottom: 50px;
  }

</style>

<template>

  <div class="main">
    <div class="search-form">
      <el-form :inline="true" ref="searchForm" label-width="100px" :model="searchForm" class="demo-form-inline">
        <el-form-item label="商场名称" prop="mallId">
          <el-select size="22" v-model="searchForm.mallId" placeholder="商场名称">
            <el-option v-for="market in marketData"
                       :label="market.marketName"
                       :value="market.id"
                       :key="market.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input size="25" v-model="searchForm.name" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="身份证号码" prop="identificationNo">
          <el-input size="25" v-model="searchForm.identificationNo" placeholder="身份证号码"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="telephone">
          <el-input size="25" v-model="searchForm.telephone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="送货安装类别" prop="workType">
          <el-select size="22" v-model="searchForm.workType" placeholder="送货安装类别">
            <el-option label="配送工" value="0"></el-option>
            <el-option label="安装工" value="1"></el-option>
            <el-option label="配送安装工" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安装能力" prop="workAbility">
          <el-select size="22" v-model="searchForm.workAbility" placeholder="安装能力">
            <el-option label="初级" value="0"></el-option>
            <el-option label="中级" value="1"></el-option>
            <el-option label="高级" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="search-btn" @click="onSubmit">查询</el-button>
          <el-button @click="resetForm('searchForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="operation-size">
      <el-button type="primary" @click="onSubmit">新增</el-button>
      <el-button type="primary" @click="onSubmit">删除</el-button>
      <el-button type="primary" @click="onSubmit">导入</el-button>
      <el-button type="primary" @click="onSubmit">下载模板</el-button>
      <el-button type="primary" @click="onSubmit">导出</el-button>
    </div>

    <div>
      <el-table
        border
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          prop="name"
          label="性别">
          <template slot-scope="scope">{{ scope.row.gender === 0 ? '男' : '女' }}</template>
        </el-table-column>
        <el-table-column
          label="出生年月日"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.birthdate }}</template>
        </el-table-column>
        <el-table-column
          prop="identificationNo"
          label="身份证号码"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="联系方式"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="workYear"
          label="工作年限"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="送货安装类别"
          width="140"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.workType === 0 ? '配送工' : scope.row.workType === 1 ? '安装工' : '配送安装工' }}</template>
        </el-table-column>
        <el-table-column
          label="安装能力"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.workAbility === 0 ? '初级' : scope.row.workAbility === 1 ? '中级' : '高级' }}</template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="服务订单数"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="satisfaction2Num"
          label="服务满意度"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block" style="float: right;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>


    <div>
      <el-dialog width="500px" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false" v-bind:title="operationTitle" :visible.sync="dialogFormVisible" size="tiny">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
          <el-form-item label="资源名称" :label-width="formLabelWidth" prop="name">
            <el-input v-model="ruleForm.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="资源描述" :label-width="formLabelWidth" prop="description">
            <el-input v-model="ruleForm.description" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="资源类型" :label-width="formLabelWidth" prop="sourceType">
            <el-select v-model="ruleForm.sourceType" placeholder="请选择">
              <el-option label="菜单资源" value="1"></el-option>
              <el-option label="关系型数据资源" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="项目ID" :label-width="formLabelWidth" prop="projectId">
            <el-input v-model="ruleForm.projectId" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="url特有资源数据" :label-width="formLabelWidth" prop="isUrl">
            <el-select v-model="ruleForm.isUrl" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="resetForm('ruleForm')">取 消</el-button>
          <el-button type="primary" @click="submitForm('ruleForm')">{{ operationBtnValue }}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>
<script>

  import Http from '../../api/CommonApi'

  export default {
    name: 'userManagement',
    data() {
      return {
        operationTitle: '添加',
        dialogFormVisible: false,
        operationBtnValue: '添 加',
        submitType: 'add',
        rules: {
          name: [
            { required: true, message: '请输入资源名称', trigger: 'blur' }
          ],
          sourceType: [
            { required: true, message: '请选择资源类型', trigger: 'change' }
          ],
          projectId: [
            { required: true, message: '请输入项目ID', trigger: 'change' }
          ],
          isUrl: [
            { required: true, message: '请选择url特有资源数据', trigger: 'change' }
          ]
        },
        ruleForm: {
          parentId: '',
          name: '',
          description: '',
          sourceType: '1',
          projectId: '',
          isUrl: '1'
        },
        formLabelWidth: '130px',


        searchForm: {
          mallId: '',
          name: '',
          identificationNo: '',
          telephone: '',
          workType: '',
          workAbility: ''
        },
        pageNum: 1,
        pageSize: 1,
        total: 1,
        marketData: [
          {
            id: '1',
            marketName: '真北商场'
          },
          {
            id: '2',
            marketName: '合肥商场'
          },
          {
            id: '3',
            marketName: '北京商场'
          }
        ],
        tableData: [],
        multipleSelection: []
      }
    },

    created() {
        var _this = this;

      Http.getWokerListByCondition(this.searchForm).then(function (data) {
        _this.tableData = data.dataMap.rows;
        _this.total = data.dataMap.total;
        _this.pageSize = data.dataMap.pageSize;
        _this.pageNum = data.dataMap.pageNum;
      }).catch(function () {

      })

    },

    methods: {

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },

      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },

      onSubmit() {
        console.log('submit!');
      },

      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>
