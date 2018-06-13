/**
 * Created by yinchun.ling on 2017/1/10.
 */

//公共方法类
export default {

  /**
   * 返回URL参数对象
   * @returns {Object}
   */
  getUrlPath() {
    let url = window.location.href;
    let theRequest = {};
    if (url.indexOf("?") != -1) {
      let str = url.substr(url.lastIndexOf("?") + 1);
      let strs = str.split("&");
      for (let i = 0; i < strs.length; i++) {
        theRequest[strs[i].split("=")[0]] = (strs[i].substr(strs[i].indexOf('=') + 1));
      }
    }
    return theRequest;
  },

  /**
   * 毫秒转换时间格式
   * mill 传入毫秒
   * str 分隔符  -   /  时分秒
   */
  transformTime(mill, str){
    let refTime;
    if (mill) {
      let mill2 = parseInt(mill);
      let timem = new Date(mill2);
      let y = timem.getFullYear(),
        m = (timem.getMonth() + 1) < 10 ? '0' + (timem.getMonth() + 1) : (timem.getMonth() + 1),
        d = timem.getDate() < 10 ? '0' + timem.getDate() : timem.getDate(),
        h = timem.getHours() < 10 ? '0' + timem.getHours() : timem.getHours(),
        f = timem.getMinutes() < 10 ? '0' + timem.getMinutes() : timem.getMinutes(),
        s = timem.getSeconds() < 10 ? '0' + timem.getSeconds() : timem.getSeconds();

      if (!!str) {
        if (str == "cn") {
          refTime = y + "年" + m + "月" + d + "日 " + h + "时" + f + "分" + s + "秒";
        } else {
          refTime = y + str + m + str + d + " " + h + ":" + f + ":" + s;
        }
      } else {
        refTime = y + '-' + m + '-' + d + " " + h + ":" + f + ":" + s;
      }
    } else {
      refTime = "-"
    }


    return refTime;
  },

  //克隆对象/数组
  cloneFun(o){
    if (o instanceof Array) {
      let n = [];
      for (let i = 0; i < o.length; ++i) {
        n[i] = o[i];
      }
      return n;
    } else if (o instanceof Object) {
      let n = {}
      for (let i in o) {
        n[i] = o[i];
      }
      return n;
    }
  },

  /**
   * status转换
   * 1.已保存 2.报名中 3.进行中 4.已中止 5.已取消 6.已结束 7.已关闭
   *  1.草稿 2.未开始 3.进行中 4.已结束 21.审核中 22.审核驳回,
   */
  getStatus (status){
    const dataStatus = {
      1: "草稿",
      2: "未开始",
      3: "进行中",
      4: "已结束",
      5: "已取消",
      6: "已结束",
      7: "已关闭",
      21: "审核中",
      22: "审核驳回",
    }
    if (!!dataStatus[status]) return dataStatus[status]
    return "状态异常！"
  },

  /**
   * auditStatus转换
   * 0.初始状态 1.审核中 2.中止审核中 3.取消审核中 4.新增商场审核
   */
  getauditStatus (status){
    const dataAuditStatus = {
      0: "初始状态",
      1: "审核中",
      2: "中止审核中",
      3: "取消审核中",
      4: "新增商场审核",
      5: '财务审核中'
    }
    if (!!dataAuditStatus[status]) return dataAuditStatus[status]
    return "审核状态异常！"
  },

  //json数组去重
  uniqueJson: function (arr) {
    if (arr == null || arr.length < 1) {
      return null;
    }
    let result = [], hash = {};
    for (let i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[JSON.stringify(elem)]) {
        result.push(elem);
        hash[JSON.stringify(elem)] = true;
      }
    }
    return result;
  },

  /**
   * json数组去重,数组被添加hashkey时
   * @param arr 需要去重的数组
   * @param columnName 传入需要判断的键值
   * @returns {Array} 返回去重后的数组结果
   */
  uniqueJsonByName: function (arr, columnName) {
    let result = [], hash = {};
    for (let i = 0, elem; (elem = arr[i]) != null; i++) {
      if (!hash[elem[columnName]]) {
        //console.log(JSON.stringify(elem));
        result.push(elem);
        hash[elem[columnName]] = true;
      }
    }
    return result;
  },

  /**
   * 获取缓存
   */
  getUrmsButton: function (sessType) {
    const dataStatus = {
      // accessCodesEnty: sessionStorage.getItem("accessCodesEnty"),//权限缓存
      accessCodesEnty: sessionStorage.getItem("mmcBtnPower"),//权限缓存
      htmlDataMap: sessionStorage.getItem("htmlDataMap")//用户信息缓存
    }
    if (dataStatus[sessType] != undefined) return JSON.parse(dataStatus[sessType])
    return "空缓存！"
  },

  /**
   * 获取指定名称的 cookie值
   * @param cname
   */
  getCookieByName(cname){
    let acookie = document.cookie.split("; ");
    for (let i = 0; i < acookie.length; i++) {
      let arr = acookie[i].split("=");
      if (cname == arr[0]) {
        if (arr.length > 1)
          return unescape(arr[1]);
        else
          return "";
      }
    }
  },

  /**
   * 数字金额转大写
   */
  digitUppercase(n) {
    let fraction = ['角', '分'];

    // let digit = [
    //   '零', '一', '二', '三', '四',
    //   '五', '六', '七', '八', '九'
    // ];
    // let unit = [
    //   ['元', '万', '亿'],
    //   ['', '十', '百', '千']
    // ];

    let digit = [
      '零', '壹', '贰', '叁', '肆',
      '伍', '陆', '柒', '捌', '玖'
    ];
    let unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ];

    let head = n < 0 ? '负' : '';
    n = Math.abs(n);
    let s = '';
    for (let i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (let i = 0; i < unit[0].length && n > 0; i++) {
      let p = '';
      for (let j = 0; j < unit[1].length && n > 0; j++) {
        p = digit[n % 10] + unit[1][j] + p;
        n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  },

  //保留两位小数
  handleAcc(num){
    let nub = num.toString();
    if (nub == 0) {
      return nub;
    } else if (nub.indexOf(".") > -1) {
      //小数点后有几位
      if (nub.split(".")[1].length > 2) {
        return nub.substring(0, nub.indexOf(".") + 3);
      } else {
        return nub;
      }
    } else {
      return nub;
    }
  },

  /**
   * 获取权限缓存
   */
  getUrmsButton: function (sessType) {
    const dataStatus = {
      accessCodesEnty: sessionStorage.getItem("accessCodesEnty"),//权限缓存
      // accessCodesEnty: sessionStorage.getItem("mmcBtnPower"),//权限缓存
      htmlDataMap: sessionStorage.getItem("htmlDataMap")//用户信息缓存
    }
    if (dataStatus[sessType] != undefined) return JSON.parse(dataStatus[sessType])
    return "空缓存！"
  },

  regUrl(val){
    const name = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
    if(!(name.test(val))) {
      return false;
    } else {
      return true;
    }
  }
}
