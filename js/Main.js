
//服务器 地址
var Url = "http://localhost:3956/";


//允许axios 携带cookies
axios.defaults.withCredentials = true;

//axios 全局错误处理
axios.interceptors.response.use(function (response) {
    if (response.data.flag != null) {
        if (!response.data.flag) {
            PromptMessage("错误", response.data.msg, "danger");
        }
    }
    // 对响应数据做点什么
    return response;
}, function (err) {
    if (err && err.response) {
        switch (err.response.status) {
            case 400: PromptMessage("错误", '请求错误(400)' , "danger"); break;
            case 401: PromptMessage("错误", '未授权，请重新登录(401),三秒后跳转到登录界面。', "danger");
                setTimeout(function () {
                    //判断当前页面是否存在父级页面
                    if (window.top == window.self) {
                        window.location.href = "../Login/Login.html";
                    } else {
                        parent.window.location.href = "../Login/Login.html";
                    }
                }, 3000);
                break;
            case 403: PromptMessage("错误", '拒绝访问(403)', "danger"); break;
            case 404: PromptMessage("错误", '请求出错(404)', "danger"); break;
            case 408: PromptMessage("错误", '请求超时(408)', "danger"); break;
            case 500: PromptMessage("错误", '服务器错误(500)', "danger"); break;
            case 501: PromptMessage("错误", '服务未实现(501)', "danger"); break;
            case 502:  PromptMessage("错误", '网络错误(502)', "danger"); break;
            case 503: PromptMessage("错误", '服务不可用(503)', "danger"); break;
            case 504: PromptMessage("错误", '网络超时(504)', "danger"); break;
            case 505: PromptMessage("错误", 'HTTP版本不受支持(505)', "danger"); break;
            default: PromptMessage("错误", '连接出错(${err.response.status})!', "danger");
        }
    } else {
        PromptMessage("错误", '连接服务器失败!', "danger");
    }
    //message.error(err.message);
    //return Promise.reject(err);
});

//ajax 全局拦截错误处理
//$(document).ajaxError(function (event,error) {
//    //alert(error.status);
//});


//初始化当前页  分页 页码加载
function PageConfig(PageIndex, PageSize, PageCount) {
    //页码赋值
    var pageDatas = [];
    if (PageCount <= 5) {
        for (var i = 0; i < PageCount; i++) {
            var pageItem = {
                PageNum: (i + 1).toString(),
                IsSelected: (i + 1) == PageIndex ? true : false
            };
            pageDatas.push(pageItem);
        }
    }
    else {
        //前五页和后五页处理
        var lessPage = PageIndex - 3 < 0 ? 3 - PageIndex : 0;
        var morePage = PageCount - PageIndex < 2 ? PageCount - PageIndex - 2 : 0;
        //展示五页数据
        for (var i = PageIndex - 3; i < PageIndex + 2; i++) {
            var pageItem = {
                PageNum: (i + 1 + lessPage + morePage).toString(),
                IsSelected: (i + 1 + lessPage + morePage) == PageIndex ? true : false
            };
            pageDatas.push(pageItem);
        }
    }
    return pageDatas;
}

//提示 信息  参数: title 标题信息 message 内容信息 type 显示样式：success 绿色； info 蓝色； warning : 黄色；danger：红色
function PromptMessage(title, message, type) {
    $.notify({
        "title": "" + title + " : ",
        "message": message,
    }, {
        "type": type
    });
}