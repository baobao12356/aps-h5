/**
 * Created by lenovo on 2017/9/29.
 */
import Http from './CommonHttp'

export default {
    //测试
    getWokerListByCondition: (param) => {
        return Http.post('/api-innovation/e/worker/getWokerListByCondition', param)
    },

    //查看活动列表
    queryActivity: (param) => {
        return Http.post('/api-aps/up/activity/queryActivity', param)
    },

    //创建活动
    creatActivity: (param) => {
        return Http.post('/api-aps/up/activity/createActivity', param)
    },

    //更新活动
    updateActivity: (param) => {
        return Http.post('/api-aps/up/activity/updateActivity', param)
    },

    //提交审核
    submit: (param) => {
        return Http.post('/api-aps/up/activity/submit', param)
    },

    //删除活动 /activity/deleteActivity/{id}
    deleteActivity: (param) => {
        return Http.post('/api-aps/up/activity/deleteActivity/' + param)
    },

    //根据活动ID获取活动详情
    getActivity: (param) => {
        return Http.get('/api-aps/up/activity/getActivity/' + param)
    },

    //分页获取报名信息记录
    queryApplyInfoList: (param) => {
        return Http.post('/api-aps/up/applyInfo/queryApplyInfoList/',param)
    },

    //导出报名信息记录
    downloadApplyInfoList: (param) => {
        return Http.get('/api-aps/up/applyInfo/downloadApplyInfoList/' + param)
    },

    //上传图片
    uploadImg: (param) => {
        return Http.post('/api-aps/up/file/upload', param)
    },

    /**
     * 带参数的上传
     * uploadImage/{maxSize}/{minWidth}/{maxWidth}/{minHeight}/{maxHeight}
     */
    uploadImage: (param) => {
        return Http.post('/api-aps/up/file/uploadImage/0/' + param)
    },

    //查看活动待审核列表
    queryActivityAuditList: (param) => {
        return Http.post('/api-aps/up/activity/queryAuditActivity', param)
    },

    //查看活动审核日志列表
    queryActivityAuditLogList: (param) => {
        return Http.post('/api-aps/up/activityAuditLog/queryActivityAuditLog', param)
    },

    /**
     * 保存模板信息
     * @param id
     * @param param
     * @returns {*}
     */
    createActivityPage: (id, param) => {
        return Http.post('/api-aps/up/activityElement/createActivityPage/' + id, param)
    },

    //获取页面配置信息
    getActivityPage: (id) => {
        return Http.get('/api-aps/up/activityElement/getActivityPage/' + id)
    },
    //获取用户信息
    getUserInfo: () => {
        return Http.get('/api-aps/up/user/getUserInfo')
    },
}