<style lang="scss"  rel="stylesheet/scss" scoped>

  .head-box{
    height: 90px;
    border-bottom: 1px solid #eeeeee;
    margin-bottom: 10px;
    span{
      display: inline-block;
      font-size: 30px;
      padding: 10px 10px 10px;
    }
  }
</style>

<template>
  <div>
    <div class="head-box">
      <el-row>
        <el-col ><span>{{str}}</span></el-col>
      </el-row>
    </div>
    <br/>
    <router-view></router-view>
  </div>
</template>

<script>

  import Http from '../../api/CommonApi'

  export default {
    name: 'head',
    data() {
      return {
        str: 'H5活动页生成后台系统'
      }
    }
  }
</script>