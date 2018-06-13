<template>
  <div style="position: relative">
    <div class="one-btn-box">
      <p class="sus-p" @click="showMe(assSort)" :style="showSort==assSort ? showSty : ''">{{showSort==assSort ? '正在编辑' : '点击编辑'}}</p>
      <img v-if="!!oneform.bannerImage" :src="oneform.bannerImage" width="100%" height="100%" border="0" class="banner-img">
      <span v-if="isSave" class="is-save">已保存</span>

      <el-button v-if="oneform.btnShow=='是'" :class="'one-btn-cl'+oneform.position"
                 :style="{background:'url(\''+oneform.image+'\')','background-size':'100% 100%'}">按钮</el-button>

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
      <p style="color: #ff4400;margin:0;font-size: 15px;"><i class="el-icon-warning"></i> 编辑完成之后请点击保存</p>
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

        <el-form-item label="点击触发">
          <el-select v-model="oneform.banneTriggerType">
            <el-option label="无点击" value="1"></el-option>
            <el-option label="跳转链接" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="跳转链接" v-if="oneform.banneTriggerType==2" prop="bannerLink">
          <el-input type="textarea" v-model="oneform.bannerLink"></el-input>
        </el-form-item>

        <span class="title-sp">按钮设置</span>

        <el-form-item label="按钮显示">
          <el-radio-group v-model="oneform.btnShow">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>

        <div v-if="oneform.btnShow=='是'">
          <div style="display: inline-block;margin-bottom: 10px">
            <span class="lab-sp">按钮图片</span>
            <div class="right-con">
              <elupload-ass assName="oneBtn"
                            actionUrl="/api-aps/up/file/uploadImage/0/150/150/60/60"
                            title="150*60"
                            :defaultUrl="oneform.image"
                            v-on:listShowChildVal="saveImgUrl"></elupload-ass>
            </div>
          </div>

          <el-form-item label="按钮位置">
            <el-select v-model="oneform.position">
              <el-option label="位置一" value="1"></el-option>
              <el-option label="位置二" value="2"></el-option>
              <el-option label="位置三" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="点击触发">
            <el-select v-model="oneform.triggerType">
              <el-option label="跳转链接" value="1"></el-option>
              <el-option label="弹框" value="2"></el-option>
              <el-option label="报名弹层" value="3"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="跳转链接" v-if="oneform.triggerType==1" prop="jumpAddress">
            <el-input type="textarea" v-model="oneform.jumpAddress"></el-input>
          </el-form-item>

          <el-form-item label="弹框标题" v-if="oneform.triggerType==2" prop="alertTitle">
            <el-input type="textarea" v-model="oneform.alertTitle"></el-input>
          </el-form-item>

          <el-form-item label="弹框内容" v-if="oneform.triggerType==2" prop="alertContent">
            <el-input type="textarea" v-model="oneform.alertContent"></el-input>
          </el-form-item>
        </div>

        <div v-if="oneform.btnShow=='是' && oneform.triggerType==3">
          <div class="tip-box" :style="{'background-image':'url(\''+oneform.applyBanner+'\')','background-size': 'cover'}">
            <div v-if="ownerType==1 && !!radioField">
              <span class="sign-tit">{{radioField=='1' ? '城市' : '商场'}}：</span>
              <el-input size="small"
                        placeholder="请选择"
                        suffix-icon="el-icon-arrow-down"
                        v-model="value2">
              </el-input>
            </div>

            <div v-if="checkedname">
              <span class="sign-tit">您的姓名：</span>
              <el-input size="small" placeholder="请输入您的姓名"></el-input>
            </div>
            <div v-if="checkedphone">
              <span class="sign-tit">您的号码：</span>
              <el-input size="small" placeholder="请输入手机号码"></el-input>
            </div>

            <el-button size="small"
                       :style="{'width': '100%','margin-top':'20px','background-image':'url(\''+oneform.applyButtonImage+'\')','background-size':'cover'}">按钮</el-button>
          </div>

          <span class="title-sp">报名弹层设置</span>
          <div style="display: inline-block;margin-bottom: 10px">
            <span class="lab-sp">弹层banner图</span>
            <div class="right-con">
              <elupload-ass assName="applyBanner"
                            actionUrl="/api-aps/up/file/uploadImage/0/630/630/350/640"
                            title="630*(350-640)"
                            :defaultUrl="oneform.applyBanner"
                            v-on:listShowChildVal="saveImgUrl"></elupload-ass>
            </div>
          </div>

          <div style="display: inline-block;margin-bottom: 10px">
            <span class="lab-sp">弹层按钮图片</span>
            <div class="right-con">
              <elupload-ass assName="applyButtonImage"
                            actionUrl="/api-aps/up/file/uploadImage/0/600/600/84/84"
                            title="600*84"
                            :defaultUrl="oneform.applyButtonImage"
                            v-on:listShowChildVal="saveImgUrl"></elupload-ass>
            </div>
          </div>

          <span class="title-sp">字段设置</span>

          <div v-if="ownerType==1">
            <el-radio style="margin-left: 20px" v-model="radioField" label="1">城市</el-radio>
            <el-radio style="margin-left: 20px" v-model="radioField" label="2">商场</el-radio>
            <div v-if="!!radioField" style="margin: 10px 0;">
              <el-tag :key="tag"
                      v-for="tag in (radioField==1 ? oneform.dynamicTags : oneform.dynamicTags2)"
                      closable
                      :disable-transitions="false"
                      @close="handleClose(tag)">
                {{tag}}
              </el-tag>
              <el-input
                      class="input-new-tag"
                      v-if="inputVisible"
                      v-model="inputValue"
                      ref="saveTagInput"
                      size="small"
                      @keyup.enter.native="handleInputConfirm"
                      @blur="handleInputConfirm"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+{{radioField==1 ? '城市' : '商场'}}</el-button>
            </div>
          </div>

          <el-checkbox style="margin-left: 20px" v-model="checkedname">姓名</el-checkbox>
          <el-checkbox style="margin-left: 20px" v-model="checkedphone">手机号</el-checkbox>

          <span class="title-sp">弹层按钮设置</span>

          <el-form-item label="提示内容" prop="alertContent2">
            <el-input type="textarea" v-model="oneform.alertContent2"></el-input>
          </el-form-item>

          <el-form-item label="跳转链接" prop="jumpAddress2">
            <el-input type="textarea" v-model="oneform.jumpAddress"></el-input>
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
    name: 'oneButton',
    props: ['assSort', 'showSort', 'oneform2','ownerType'],
    data() {
      //验证跳转链接
      let valBannerLink = (rule, value, callback) => {
        if (this.oneform.banneTriggerType == 2 && !!this.oneform.bannerLink) {
          if(Util.regUrl(this.oneform.bannerLink)){
            if(this.oneform.bannerLink.length>500){
              callback(new Error('最多500个字符'));
            }else{
              callback();
            }
          }else{
            callback(new Error('请输入正确的url'));
          }
        } else {
          callback(new Error('请输入跳转链接'));
        }
      };
      //按钮跳转链接验证
      let valJumpAddress = (rule, value, callback) => {
        if (this.oneform.triggerType == 1 && !!this.oneform.jumpAddress) {
          if(Util.regUrl(this.oneform.jumpAddress)){
            if(this.oneform.jumpAddress.length>500){
              callback(new Error('最多500个字符'));
            }else{
              callback();
            }
          }else{
            callback(new Error('请输入正确的url'));
          }
        } else {
          callback(new Error('请输入跳转链接'));
        }
      };
      //按钮跳转链接验证
      let valJumpAddress2 = (rule, value, callback) => {
        if (!!this.oneform.jumpAddress) {
          if(Util.regUrl(this.oneform.jumpAddress)){
            if(this.oneform.jumpAddress.length>500){
              callback(new Error('最多500个字符'));
            }else{
              callback();
            }
          }else{
            callback(new Error('请输入正确的url'));
          }
        } else {
          callback();
        }
      };
      //按钮弹出层判断
      let valAlertTitle = (rule, value, callback) => {
        if (this.oneform.triggerType == 2 && !!this.oneform.alertTitle) {
          if(this.oneform.alertTitle.length>20){
            callback(new Error('最多20个字符'));
          }else{
            callback();
          }
        } else {
          callback(new Error('请输入'));
        }
      };
      //按钮弹出层内容
      let valAlertContent = (rule, value, callback) => {
        if (this.oneform.triggerType == 2 && !!this.oneform.alertContent) {
          if(this.oneform.alertContent.length>800){
            callback(new Error('最多800个字符'));
          }else{
            callback();
          }
        } else {
          callback(new Error('请输入'));
        }
      };
      let valAlertContent2 = (rule, value, callback) => {
        if (!!this.oneform.alertContent2) {
          if(this.oneform.alertContent2.length>800){
            callback(new Error('最多800个字符'));
          }else{
            callback();
          }
        } else {
          callback(new Error('请输入'));
        }
      };
      return {
        msg: '单按钮',
        visible: false,
        isSave: false,
        bannerList: [],//banner图list
//        oneform: {},
//        assSort: this.assSort2,//排序 唯一
        oneform: {
          sort: '1',//排序
          banneTriggerType: '1',//banner点击事件 1 无点击  2 跳转链接
          bannerLink: '',
          bannerImage: '',//banner图片
          btnShow: '是',//按钮是否显示  1 是  2 否
          position: '1',//按钮位置
          triggerType: '1',//按钮 1.跳转链接 2.弹框, 3.报名弹层
          jumpAddress: '',//按钮跳转地址
          alertTitle: '',//按钮弹框标题
          alertContent: '',//按钮弹框内容
          image: '',//按钮图
          applyBanner:'',//弹层banner图
          applyButtonImage: '',//弹层按钮图
        },
        btnInfo: {
          image: '',
        },//单按钮组件参数
        btnList: [],//单按钮组件
        showSty:{
          background:'#409EFF',
          color:'#fff'
        },
        cityOptions: [],
        value2: '',
        checkedname: false,//姓名
        checkedphone: false,//手机
        radioField: '',//1城市  2商场
        inputVisible: false,
        inputValue: '',
        rules: {
          bannerLink: [
            { required: true, message: '请输入', trigger: 'blur' },
            {validator: valBannerLink, trigger: 'blur'}
          ],
          jumpAddress: [
            { required: true, message: '请输入', trigger: 'blur' },
            {validator: valJumpAddress, trigger: 'blur'}
          ],
          alertTitle: [
            { required: true, message: '请输入', trigger: 'blur' },
            {validator: valAlertTitle, trigger: 'blur'}
          ],
          alertContent: [
            { required: true, message: '请输入', trigger: 'blur' },
            {validator: valAlertContent, trigger: 'blur'}
          ],
          alertContent2:[
            { required: true, message: '请输入', trigger: 'blur' },
            {validator: valAlertContent2, trigger: 'blur'}
          ],
          jumpAddress2:[
            {validator: valJumpAddress2, trigger: 'blur'}
          ]
        }
      };
    },
    created(){
      const t = this;
//      console.log('数据',t.oneform2)

      const newOneForm = Util.cloneFun(t.oneform2);
      if (!!newOneForm) {
        newOneForm.banneTriggerType = !!newOneForm.banneTriggerType ? newOneForm.banneTriggerType.toString() : '1';
        newOneForm.bannerImage = newOneForm.bannerImage || '';

        let elementConfigList = [];
        if(!!newOneForm.activityElementConfigVOList && newOneForm.activityElementConfigVOList.length > 0){
          elementConfigList = newOneForm.activityElementConfigVOList;
        }else if(!!newOneForm.activityElementConfigODTOList && newOneForm.activityElementConfigODTOList.length > 0){
          elementConfigList = newOneForm.activityElementConfigODTOList;
        }

        if (!!elementConfigList && elementConfigList.length > 0) {
          newOneForm.btnShow = '是';
          newOneForm.image = elementConfigList[0].image;
          newOneForm.position = elementConfigList[0].position.toString();
          newOneForm.triggerType = elementConfigList[0].triggerType.toString();
          newOneForm.jumpAddress = elementConfigList[0].jumpAddress;
          newOneForm.alertTitle = elementConfigList[0].alertTitle;
          newOneForm.alertContent = elementConfigList[0].alertContent;
          newOneForm.alertContent2 = elementConfigList[0].alertContent;
          newOneForm.applyBanner = elementConfigList[0].applyBanner;//弹层banner图
          newOneForm.applyButtonImage = elementConfigList[0].applyButtonImage;//弹层按钮

          let isCity = false;
          let isMall = false;
          if(!!elementConfigList[0].activityExtendFieldList && elementConfigList[0].activityExtendFieldList.length>0){
            //fieldType 1.城市 2.商场 3.姓名 4.手机号,
            elementConfigList[0].activityExtendFieldList.forEach((data)=>{
              if(data.fieldType==1){
                //城市
                t.radioField = '1';
                !!data.fieldValue ? (newOneForm.dynamicTags = data.fieldValue.split('|')) : null;
                newOneForm.dynamicTags2=[];
                isCity=true;
              }
              if(data.fieldType==2){
                //商场
                t.radioField = '2';
                !!data.fieldValue ? (newOneForm.dynamicTags2 = data.fieldValue.split('|')) : null;
                newOneForm.dynamicTags=[];
                isMall=true;
              }
              if(data.fieldType==3){
                //姓名
                t.checkedname = true;
              }
              if(data.fieldType==4){
                //手机号
                t.checkedphone = true;
              }
            });
          }
          if(t.ownerType==2){
            t.radioField='';
            newOneForm.dynamicTags = [];
            newOneForm.dynamicTags2 = [];
          }else if(t.ownerType==1){
            if(!t.radioField){
              //集团
              if(!isCity){
                t.radioField='';
                newOneForm.dynamicTags = [];
              }
              if(!isMall){
                t.radioField='';
                newOneForm.dynamicTags2 = [];
              }
            }
          }

        } else {
          newOneForm.btnShow = '否';
          newOneForm.image = '';
          newOneForm.position = '1';
          newOneForm.triggerType = '1';
          newOneForm.jumpAddress = '';
          newOneForm.alertTitle = '';
          newOneForm.alertContent = '';
          newOneForm.applyBanner = '';//弹层banner图
          newOneForm.applyButtonImage = '';
          newOneForm.dynamicTags = [];
          newOneForm.dynamicTags2 = [];
          t.checkedname = false;
          t.checkedphone = false;
          t.radioField='';
          if(!newOneForm.bannerImage){
            newOneForm.btnShow = '是';
          }
        }
        if(!!newOneForm.bannerImage){
          t.isSave = true;
        }

        t.oneform = newOneForm;

        console.log(t.oneform)
      }

    },
    components: {
      "elupload-ass": EluploadAssembly
    },
    methods: {
      //显示/隐藏组件编辑栏
      showMe(val){
        this.$emit('listShowAss', val);//保存url
        event.cancelBubble = true;//阻止事件冒泡
      },
      //删除该组件
      deleteAss(val){
        this.$emit('listDeleteAss', val);
        event.cancelBubble = true;//阻止事件冒泡
      },
      submitForm(formName){
        const t = this;
        t.$refs[formName].validate((valid) => {

          if (valid) {
            if (!t.oneform.bannerImage) {
              t.$message.error('请先上传banner图');
              return false;
            }
            if (t.oneform.btnShow == '是' && !t.oneform.image) {
              t.$message.error('请先上传按钮图');
              return false;
            }
            if (t.oneform.btnShow == '是' && t.oneform.triggerType==3 && !t.oneform.applyBanner) {
              t.$message.error('请先上传弹层banner图');
              return false;
            }

            if (t.oneform.btnShow == '是' && t.oneform.triggerType==3 && !t.oneform.applyButtonImage) {
              t.$message.error('请先上传弹层按钮图');
              return false;
            }

            if(t.oneform.btnShow == '是' && t.oneform.triggerType==3){
              if(t.ownerType==1 && t.radioField==1){
                if(!t.oneform.dynamicTags || t.oneform.dynamicTags.length==0){
                  t.$message.error('请先添加城市');
                  return false;
                }
              }else if(t.ownerType==1 && t.radioField==2){
                if(!t.oneform.dynamicTags2 || t.oneform.dynamicTags2.length==0){
                  t.$message.error('请先添加商场');
                  return false;
                }
              }
            }

            /**
             * 弹层字段设置
             * fieldType 1.城市 2.商场 3.姓名 4.手机号,
             */
            let activityExtendFieldList=[];//弹层字段list

            if(t.checkedname){
              activityExtendFieldList.push({fieldType:'3'});
            }
            if(t.checkedphone){
              activityExtendFieldList.push({fieldType:'4'});
            }
            if(t.radioField==1){
              let fieldEn={
                fieldType:'1',
                fieldValue: t.oneform.dynamicTags.join('|')
              }
              activityExtendFieldList.push(fieldEn);
            }else if(t.radioField==2){
              let fieldEn={
                fieldType:'2',
                fieldValue: t.oneform.dynamicTags2.join('|')
              }
              activityExtendFieldList.push(fieldEn);
            }

            if(t.oneform.btnShow == '是' && t.oneform.triggerType==3 && activityExtendFieldList.length==0){
              t.$message.error('请至少选择一个弹层字段');
              return false;
            }

            console.log(t)
            console.log('oneform', t.oneform)


            const afferentParam = {};
            afferentParam.sort = t.assSort;//排序号
            afferentParam.elementType = 1;//单按钮组件
            afferentParam.bannerImage = t.oneform.bannerImage;//banner图
            afferentParam.banneTriggerType = t.oneform.banneTriggerType;//banne触发类型 1.无点击 2.跳转链接,
            afferentParam.bannerLink = t.oneform.banneTriggerType == 2 ? t.oneform.bannerLink : '';//banne跳转地址
            afferentParam.activityElementConfigVOList = [];
            afferentParam.styleType = "1";//样式1

            //有按钮时
            if (t.oneform.btnShow == '是') {
              const btnParam = {};//按钮信息
              btnParam.sort = 1;
              btnParam.configType = 1;//类型  1 按钮
              btnParam.image = t.oneform.image;//img
              btnParam.position = t.oneform.position;//按钮位置
              btnParam.triggerType = t.oneform.triggerType;//按钮 1.跳转链接 2.弹框
              if (btnParam.triggerType == 1) {
                btnParam.jumpAddress = t.oneform.jumpAddress;
              } else if(btnParam.triggerType == 2){
                btnParam.alertTitle = t.oneform.alertTitle;
                btnParam.alertContent = t.oneform.alertContent;
              }


              //选择报名弹层
              if(btnParam.triggerType==3){
                btnParam.applyBanner = t.oneform.applyBanner;//弹层banner图
                btnParam.applyButtonImage = t.oneform.applyButtonImage;//弹层按钮图
                btnParam.alertContent = t.oneform.alertContent2;//报名弹层弹框内容
                btnParam.jumpAddress = t.oneform.jumpAddress;//报名弹层链接地址
              }

              btnParam.activityExtendFieldList = activityExtendFieldList;

              afferentParam.activityElementConfigVOList.push(btnParam);
            }

            afferentParam.id = t.oneform2.id;
            console.log('数据', afferentParam)
            t.isSave = true;
            t.$emit('listSaveAss', afferentParam);
            t.$emit('listShowAss', '');//显示
            event.cancelBubble = true;//阻止事件冒泡
          }

        })
      },
      //保存图片路径
      saveImgUrl(res){
        const t = this;
        console.log(res)
        if (res.name == "bannerImage") {
          t.oneform.bannerImage = res.url;
        } else if(res.name=="oneBtn"){
          t.oneform.image = res.url;
        }else if(res.name=="applyBanner"){
          t.oneform.applyBanner = res.url;
        }else if(res.name=="applyButtonImage"){
          t.oneform.applyButtonImage = res.url;
        }
      },
      //删除标签
      handleClose(tag) {
        if(this.radioField==1){
          this.oneform.dynamicTags.splice(this.oneform.dynamicTags.indexOf(tag), 1);
//          this.cityOptions = Util.cloneFun(this.oneform.dynamicTags)
        }else{
          this.oneform.dynamicTags2.splice(this.oneform.dynamicTags2.indexOf(tag), 1);
//          this.cityOptions = Util.cloneFun(this.oneform.dynamicTags2)
        }

      },
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          if(this.radioField==1){
            this.oneform.dynamicTags.push(inputValue);
//            this.cityOptions = Util.cloneFun(this.oneform.dynamicTags)
          }else{
            this.oneform.dynamicTags2.push(inputValue);
//            this.cityOptions = Util.cloneFun(this.oneform.dynamicTags2)
          }
        }
        this.inputVisible = false;
        this.inputValue = '';
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

  .sign-tit{
    display: block;
    box-sizing: border-box;
    padding-left: 8px;
    width: 100%;
    margin-top: 15px;
    margin-bottom: 3px;
  }

  .el-tag{
    margin-left: 10px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 8px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 24px;
    line-height: 24px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }

  .tip-box{
    width: 100%;
    border: 1px solid #bbbbbb;
    padding: 0px 20px 20px;
    /*overflow-y: scroll;*/
    /*background: #42b983;*/
    box-sizing: border-box;
    -webkit-box-shadow: 0 0 10px #bbbbbb;
    -moz-box-shadow: 0 0 10px #bbbbbb;
    box-shadow: 0 0 10px #bbbbbb;
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
      color: #5a5e66
    }
    .right-con {
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
    min-height: 100px;
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
    .one-btn-cl1 {
      position: absolute;
      bottom: 25px;
      left: 25px;
      width: 75px;
      height: 30px;
    }

    .one-btn-cl2 {
      position: absolute;
      bottom: 25px;
      left: 50%;
      margin-left: -37px;
      width: 75px;
      height: 30px;
    }

    .one-btn-cl3 {
      position: absolute;
      bottom: 25px;
      right: 25px;
      width: 75px;
      height: 30px;
    }

    //删除按钮
    .btn-delete {
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

    .sus-p {
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
