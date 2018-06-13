<template>
  <div style="position: relative">
    <div class="one-btn-box" >
      <p class="sus-p" @click="showMe(assSort)" :style="showSort==assSort ? showSty : ''">{{showSort==assSort ? '正在编辑' : '点击编辑'}}</p>
      <img v-if="!!oneform.bannerImage" :src="oneform.bannerImage" width="100%" height="100%" border="0" class="banner-img" >
      <span v-if="isSave" class="is-save">已保存</span>

      <el-button v-if="oneform.btnShow=='是'" :class="'one-btn-cl1'+oneform.position" :style="{background:'url(\''+oneform.image1+'\')','background-size':'100% 100%'}">按钮1</el-button>
      <el-button v-if="oneform.btnShow=='是'" ="'one-btn-cl2'+oneform.position" :style="{background:'url(\''+oneform.image2+'\')','background-size':'100% 100%'}">按钮2</el-button>

      <el-popover
              placement="top"
              width="150"
              trigger="click"
              title="确认删除该组件？"
              v-model="visible">
        <el-button size="mini" type="text" @click="deleteAss(assSort)">确定</el-button>
        <el-button size="mini" type="text" @click="visible=false">取消</el-button>
        <span slot="reference" class="btn-delete" size="mini">删除</span>
      </el-popover>
      <!--<span slot="reference" class="btn-delete" size="mini" style="right: 41px;" @click="moveAss(assSort)">下移</span>-->

    </div>

    <div class="one-con" v-if="showSort==assSort">
      <p style="color: #ff4400;margin:0;font-size: 15px;"><i class="el-icon-warning"></i>   编辑完成之后请点击保存</p>
      <span class="title-sp">banner设置</span>
      <el-form size="mini" ref="form" :model="oneform" :rules="rules" label-width="80px">
        <div style="display: inline-block;margin-bottom: 10px">
          <span class="lab-sp">banner图</span>
          <div class="right-con">
            <elupload-ass assName="bannerImage"
                          actionUrl="/api-aps/up/file/uploadImage/0/750/750/100/1134"
                          title="750*(100-1134)"
                          :defaultUrl="oneform.bannerImage"
                          v-on:listShowChildVal="saveImgUrl"></elupload-ass>
          </div>
        </div>

        <!--<el-form-item label="点击触发">-->
          <!--<el-select v-model="oneform.banneTriggerType">-->
            <!--<el-option label="无点击" value="1"></el-option>-->
            <!--<el-option label="跳转链接" value="2"></el-option>-->
          <!--</el-select>-->
        <!--</el-form-item>-->

        <!--<el-form-item label="跳转链接" v-if="oneform.banneTriggerType==2" prop="bannerLink">-->
          <!--<el-input type="textarea" v-model="oneform.bannerLink"></el-input>-->
        <!--</el-form-item>-->

        <span class="title-sp">按钮设置</span>

        <el-form-item label="按钮显示">
          <el-radio-group v-model="oneform.btnShow">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-if="oneform.btnShow=='是'">
          <el-form-item label="按钮位置">
            <el-select v-model="oneform.position">
              <el-option label="位置一" value="1"></el-option>
              <el-option label="位置二" value="2"></el-option>
              <el-option label="位置三" value="3"></el-option>
            </el-select>
          </el-form-item>

          <div style="display: inline-block;margin-bottom: 10px">
            <span class="lab-sp">按钮1图片</span>
            <div class="right-con">
              <elupload-ass assName="image1"
                            actionUrl="/api-aps/up/file/uploadImage/0/150/150/60/60"
                            title="150*60"
                            :defaultUrl="oneform.image1"
                            v-on:listShowChildVal="saveImgUrl"></elupload-ass>
            </div>
          </div>

          <el-form-item label="按钮1点击触发">
            <el-select v-model="oneform.triggerType1">
              <el-option label="跳转链接" value="1"></el-option>
              <el-option label="弹框" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="按钮1跳转链接" v-if="oneform.triggerType1==1" prop="jumpAddress1">
            <el-input type="textarea" v-model="oneform.jumpAddress1"></el-input>
          </el-form-item>

          <el-form-item label="按钮1弹框标题" v-if="oneform.triggerType1==2" prop="alertTitle1">
            <el-input type="textarea" v-model="oneform.alertTitle1"></el-input>
          </el-form-item>

          <el-form-item label="按钮1弹框内容" v-if="oneform.triggerType1==2" prop="alertContent1">
            <el-input type="textarea" v-model="oneform.alertContent1"></el-input>
          </el-form-item>

          <hr/>

          <div style="display: inline-block;margin-bottom: 10px">
            <span class="lab-sp">按钮2图片</span>
            <div class="right-con">
              <elupload-ass assName="image2"
                            actionUrl="/api-aps/up/file/uploadImage/0/150/150/60/60"
                            title="150*60"
                            :defaultUrl="oneform.image2"
                            v-on:listShowChildVal="saveImgUrl"></elupload-ass>
            </div>
          </div>

          <el-form-item label="按钮2点击触发">
            <el-select v-model="oneform.triggerType2">
              <el-option label="跳转链接" value="1"></el-option>
              <el-option label="弹框" value="2"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="按钮2跳转链接" v-if="oneform.triggerType2==1" prop="jumpAddress2">
            <el-input type="textarea" v-model="oneform.jumpAddress2"></el-input>
          </el-form-item>

          <el-form-item label="按钮2弹框标题" v-if="oneform.triggerType2==2" prop="alertTitle2">
            <el-input type="textarea" v-model="oneform.alertTitle2"></el-input>
          </el-form-item>

          <el-form-item label="按钮2弹框内容" v-if="oneform.triggerType2==2" prop="alertContent2">
            <el-input type="textarea" v-model="oneform.alertContent2"></el-input>
          </el-form-item>
        </div>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">保存</el-button>
          <el-button @click="showMe('')">关闭窗口</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>

</template>

<script>

  import Http from '../api/CommonApi';
  import Util from '../utils/util';
  import EluploadAssembly from './eluploadAssembly';

  export default {
    name: 'twoButton',
    props: ['assSort','showSort','oneform2','ownerType'],
    data() {
      //验证跳转链接
      let valBannerLink=(rule, value, callback) =>{
        if(this.oneform.banneTriggerType==2 && !!this.oneform.bannerLink){
          if(Util.regUrl(this.oneform.bannerLink)){
            if(this.oneform.bannerLink.length>500){
              callback(new Error('最多500个字符'));
            }else{
              callback();
            }
          }else{
            callback(new Error('请输入正确的url'));
          }
        }else{
          callback(new Error('请输入跳转链接'));
        }
      };
      //按钮跳转链接验证
      let valJumpAddress1=(rule, value, callback) =>{
        console.log(rule)
        if(this.oneform.triggerType1==1 && !!this.oneform.jumpAddress1){
          if(Util.regUrl(this.oneform.jumpAddress1)){
            if(this.oneform.jumpAddress1.length>500){
              callback(new Error('最多500个字符'));
            }else{
              callback();
            }
          }else{
            callback(new Error('请输入正确的url'));
          }
        }else{
          callback(new Error('请输入跳转链接'));
        }
      };
      //按钮弹出层判断
      let valAlertTitle1=(rule, value, callback) =>{
        if(this.oneform.triggerType1==2 && !!this.oneform.alertTitle1){
          if(this.oneform.alertTitle1.length>20){
            callback(new Error('最多20个字符'));
          }else{
            callback();
          }
        }else{
          callback(new Error('请输入'));
        }
      };
      let valAlertContent1=(rule, value, callback) =>{
        if(this.oneform.triggerType1==2 && !!this.oneform.alertContent1){
          if(this.oneform.alertContent1.length>800){
            callback(new Error('最多800个字符'));
          }else{
            callback();
          }
        }else{
          callback(new Error('请输入'));
        }
      };
      //按钮跳转链接验证
      let valJumpAddress2=(rule, value, callback) =>{
        console.log(rule)
        if(this.oneform.triggerType2==1 && !!this.oneform.jumpAddress2){
          if(Util.regUrl(this.oneform.jumpAddress2)){
            if(this.oneform.jumpAddress2.length>500){
              callback(new Error('最多500个字符'));
            }else{
              callback();
            }
          }else{
            callback(new Error('请输入正确的url'));
          }
        }else{
          callback(new Error('请输入跳转链接'));
        }
      };
      //按钮弹出层判断
      let valAlertTitle2=(rule, value, callback) =>{
        if(this.oneform.triggerType2==2 && !!this.oneform.alertTitle2){
          if(this.oneform.alertTitle2.length>20){
            callback(new Error('最多20个字符'));
          }else{
            callback();
          }
        }else{
          callback(new Error('请输入'));
        }
      };
      let valAlertContent2=(rule, value, callback) =>{
        if(this.oneform.triggerType2==2 && !!this.oneform.alertContent2){
          if(this.oneform.alertContent2.length>800){
            callback(new Error('最多800个字符'));
          }else{
            callback();
          }
        }else{
          callback(new Error('请输入'));
        }
      };
      return {
        msg: '双按钮',
        visible: false,
        isSave: false,
        bannerList: [],//banner图list
        oneform: {},
        btnList:[],//单按钮组件
        showSty:{
          background:'#409EFF',
          color:'#fff'
        },
        rules: {
          bannerLink: [
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: valBannerLink, trigger: 'blur' }
          ],
          jumpAddress1: [
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: valJumpAddress1, trigger: 'blur' }
          ],
          alertTitle1:[
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: valAlertTitle1, trigger: 'blur' }
          ],
          alertContent1:[
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: valAlertContent1, trigger: 'blur' }
          ],
          jumpAddress2: [
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: valJumpAddress2, trigger: 'blur' }
          ],
          alertTitle2:[
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: valAlertTitle2, trigger: 'blur' }
          ],
          alertContent2:[
            { required: true, message: '请输入', trigger: 'blur' },
            { validator: valAlertContent2, trigger: 'blur' }
          ]
        }
      };
    },
    created(){
      const t = this;
//      console.log('数据',t.oneform2)

      const newOneForm = Util.cloneFun(t.oneform2);
      if(!!newOneForm){
        newOneForm.banneTriggerType = !!newOneForm.banneTriggerType ? newOneForm.banneTriggerType.toString() : '1';
        newOneForm.bannerImage = newOneForm.bannerImage || '';

        let elementConfigList = [];
        if(!!newOneForm.activityElementConfigVOList && newOneForm.activityElementConfigVOList.length > 0){
          elementConfigList = newOneForm.activityElementConfigVOList;
        }else if(!!newOneForm.activityElementConfigODTOList && newOneForm.activityElementConfigODTOList.length > 0){
          elementConfigList = newOneForm.activityElementConfigODTOList;
        }

        if(!!elementConfigList && elementConfigList.length>0){
          newOneForm.btnShow='是';
          newOneForm.image1 = elementConfigList[0].image;
          newOneForm.position = elementConfigList[0].position.toString();
          newOneForm.triggerType1 = elementConfigList[0].triggerType.toString();
          newOneForm.jumpAddress1 = elementConfigList[0].jumpAddress;
          newOneForm.alertTitle1 = elementConfigList[0].alertTitle;
          newOneForm.alertContent1 = elementConfigList[0].alertContent;

          newOneForm.image2 = elementConfigList[1].image;
          newOneForm.triggerType2 = elementConfigList[1].triggerType.toString();
          newOneForm.jumpAddress2 = elementConfigList[1].jumpAddress;
          newOneForm.alertTitle2 = elementConfigList[1].alertTitle;
          newOneForm.alertContent2 = elementConfigList[1].alertContent;
        }else{
          newOneForm.btnShow = '否';
          newOneForm.image1 = '';
          newOneForm.image2 = '';
          newOneForm.position = '1';
          newOneForm.triggerType1 = '1';
          newOneForm.jumpAddress1 = '';
          newOneForm.alertTitle1 = '';
          newOneForm.alertContent1 = '';
          newOneForm.triggerType2 = '1';
          newOneForm.jumpAddress2 = '';
          newOneForm.alertTitle2 = '';
          newOneForm.alertContent2 = '';
          if(!newOneForm.bannerImage){
            newOneForm.btnShow = '是';
          }
        }
        if(!!newOneForm.bannerImage){
          t.isSave = true;
        }
        t.oneform = newOneForm
        console.log(t.oneform)
      }

    },
    components:{
      "elupload-ass": EluploadAssembly
    },
    methods: {
      //显示/隐藏组件编辑栏
      showMe(val){
        this.$emit('listShowAss',val);//保存url
        event.cancelBubble = true;//阻止事件冒泡
      },
      //删除该组件
      deleteAss(val){
        this.$emit('listDeleteAss',val);
        event.cancelBubble = true;//阻止事件冒泡
      },
      //下移组件
      moveAss(val){
        this.$emit('listMoveAss',val);
        event.cancelBubble = true;//阻止事件冒泡
      },
      submitForm(formName){
        const t = this;
        t.$refs[formName].validate((valid) => {

          if(valid){
            if(!t.oneform.bannerImage){
              t.$message.error('请先上传banner图');
              return false;
            }
            if(t.oneform.btnShow=='是' && !t.oneform.image1){
              t.$message.error('请先上传按钮1的图片');
              return false;
            }
            if(t.oneform.btnShow=='是' && !t.oneform.image2){
              t.$message.error('请先上传按钮2的图片');
              return false;
            }
            console.log('oneform',t.oneform)

            const afferentParam={};
            afferentParam.sort = t.assSort;//排序号
            afferentParam.elementType = 2;//双按钮组件
            afferentParam.bannerImage = t.oneform.bannerImage;//banner图
            afferentParam.banneTriggerType = t.oneform.banneTriggerType;//banne触发类型 1.无点击 2.跳转链接,
            afferentParam.bannerLink = t.oneform.banneTriggerType==2 ? t.oneform.bannerLink : '';//banne跳转地址
            afferentParam.activityElementConfigVOList = [];

            //有按钮时
            if(t.oneform.btnShow == '是'){
              for(let i=1;i<3;i++){
                const btnParam={};//按钮信息
                btnParam.sort = i;
                btnParam.configType = 1;//类型  1 按钮
                btnParam.image = t.oneform['image'+i];//img
                btnParam.position = t.oneform.position;//按钮位置
                btnParam.triggerType = t.oneform['triggerType'+i];//按钮 1.跳转链接 2.弹框
                if(btnParam.triggerType == 1){
                  btnParam.jumpAddress = t.oneform['jumpAddress'+i];
                }else{
                  btnParam.alertTitle = t.oneform['alertTitle'+i];
                  btnParam.alertContent = t.oneform['alertContent'+i];
                }
                afferentParam.activityElementConfigVOList.push(btnParam);
              }
            }

            afferentParam.id = t.oneform2.id;
            console.log('数据',afferentParam)
            t.isSave = true;
            t.$emit('listSaveAss',afferentParam);
            t.$emit('listShowAss','');
            event.cancelBubble = true;//阻止事件冒泡
          }

        })
      },
      //保存图片路径
      saveImgUrl(res){
        const t = this;
        console.log('获取上传的图片信息',res)
        if(res.name == "bannerImage"){
          t.oneform.bannerImage = res.url;
        }else if(res.name == "image1"){
          t.oneform.image1 = res.url;
        }else if(res.name == "image2"){
          t.oneform.image2 = res.url;
        }
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .banner-img {
    float: left;
    border: none;
  }

  .one-con {
    position: absolute;
    width: 340px;
    height: 690px;
    top: 0px;
    right: -355px;
    border: 1px solid #bbbbbb;
    overflow: scroll;
    border-radius: 2px;
    padding: 10px 10px;
    box-sizing: border-box;

    .con-th {
      width: 100%;
      margin-bottom: 10px;
    }
    .title-sp {
      display: inline-block;
      width: 100%;
      height: 25px;
      line-height: 25px;
      padding-left: 10px;
      box-sizing: border-box;
      background: #eeeeee;
      margin-bottom: 10px;
    }

    .lab-sp {
      width: 80px;
      box-sizing: border-box;
      text-align: right;
      float: left;
      padding-right: 12px;
      color:#5a5e66
    }
    .right-con{
      float: left;
      width: 200px;
    }
  }

  .one-btn-box {
    width: 100%;
    height: auto;
    margin: 0px 0; //后面删掉
    position: relative;
    background: #f7f7f7;
    min-height: 140px;
    box-sizing: border-box;
    .is-save{
      position: absolute;
      color: #fff;
      display: block;
      padding: 6px 10px;
      background: #67c23a;
      top: 8px;
      left: 0px;
    }
    //按钮 1的位置一
    .one-btn-cl11 {
      position: absolute;
      bottom: 20px;
      left: 97px;
      width: 75px;
      height: 30px;
    }
    //按钮 2的位置一
    .one-btn-cl21 {
      position: absolute;
      bottom: 20px;
      right: 25px;
      width: 75px;
      height: 30px;
    }

    //按钮 1的位置二
    .one-btn-cl12 {
      position: absolute;
      bottom: 20px;
      left: 61px;
      width: 75px;
      height: 30px;
    }
    //按钮 2的位置二
    .one-btn-cl22 {
      position: absolute;
      bottom: 20px;
      right: 61px;
      width: 75px;
      height: 30px;
    }

    //按钮 1的位置三
    .one-btn-cl13 {
      position: absolute;
      bottom: 65px;
      left: 50%;
      margin-left: -37px;
      width: 75px;
      height: 30px;
    }
    //按钮 2的位置三
    .one-btn-cl23 {
      position: absolute;
      bottom: 25px;
      left: 50%;
      margin-left: -37px;
      width: 75px;
      height: 30px;
    }

    //删除按钮
    .btn-delete{
      position: absolute;
      bottom: 0px;
      right: 0px;
      width: 40px;
      background: #3c3c3c;
      color: #fff;
      font-size: 12px;
      text-align: center;
      cursor: pointer;
    }

    .sus-p{
      position: absolute;
      top: 0px;
      width: 100%;
      text-align: center;
      background: #eeeeee;
      color: #3c3c3c;
      cursor: pointer;
    }

  }

  .one-btn-box::before {
    content: "";
    display: block;
    clear: both;
  }

  .one-btn-box::after {
    content: "";
    display: block;
    clear: both;
  }

</style>
