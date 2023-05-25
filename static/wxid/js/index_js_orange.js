index_show = true
var app = new Vue({
    el: "#body",
    data: {
        box_slide_top: 0,
        menu_is_open: false,
        btm_btns_is_show:false,
        setting_box_is_show: false,
        updateCollect_box_is_show: false,
        collect_box_is_show: false,
        collectList: [],
        add_collect: {
            name: "",
            ico: "",
            url: "",
            type: ""
        },
        top_url_list: [
            {
                "name": "知乎",
                "url": "https://www.zhihu.com/hot",
            },
            {
                "name": "百度贴吧",
                "url": "https://tieba.baidu.com/",
            },
            {
                "name": "天下大行",
                "url": "http://www.xn--ghqv4yqvwzzs.com/%E5%A4%A9%E4%B8%8B%E5%A4%A7%E8%A1%8C/getList",
            },
            {
                "name": "蓝白档案库",
                "url": "http://www.lanbaishe.net",
            },
        ],
        index_title: "欢迎回来~我的朋友",
        index_content: "“你我终会相逢，就像山川合流，就像万河归海。我涉旷野丛林而过，你撑船渡我，入灿灿花海。我把对你的喜欢藏进云里，隐于风里，揉进眼里。”",
        index_bgi_list: [
            "https://tucdn.wpon.cn/2023/02/24/ffdd01e5db0c3.jpg",
            "https://tucdn.wpon.cn/2023/02/24/9254b6d0c4cbd.jpg",
            "https://tucdn.wpon.cn/2023/02/24/d47459dd92333.jpg",
            "https://tucdn.wpon.cn/2023/02/24/9115a21c471da.jpg",
            "https://tucdn.wpon.cn/2023/02/24/b8e13aa1d8fd7.jpg",
            "https://tucdn.wpon.cn/2023/02/24/0da1ea7a727b2.jpg",
            "https://tucdn.wpon.cn/2023/02/24/cd6fafb5ac7ff.jpg",
            "https://tucdn.wpon.cn/2023/02/24/174141a777339.jpg",
            "https://tucdn.wpon.cn/2023/02/24/888938f3b910c.jpg",
            "https://tucdn.wpon.cn/2023/02/24/6dcf176804b21.jpg",
            "https://tucdn.wpon.cn/2023/02/24/8c8a83facb049.jpg",
            "https://tucdn.wpon.cn/2023/02/24/2d61c8458a849.jpg",
            "https://tucdn.wpon.cn/2023/02/24/e2a8f1db70233.jpg"
        ],
        index_bgi_index: 0,
        local_path: "",
        collect_box_style: {
            height: ""
        },
        collect_big_collect: []
    },
    methods:{
        search: function (e, key){
            if (key == -1){
                var theEvent = window.event || e;
                key = theEvent.keyCode || theEvent.which || theEvent.charCode;
            }
            if(key == 13){
                var q = $(".search_val input").val()
                if(q == "954722"){
                    this.show_hide()
                    return
                }
                var url = $(".search_from select").val()
                window.open(url + q)
            }
        },
        show_setting: function (){
            this.close_menu()
            if (this.setting_box_is_show){
                $(".setting_box").css("transform", "rotateX(90deg)")
            }else {
                $(".setting_box").css("transform", "rotateX(0deg)")
            }
            this.setting_box_is_show = !this.setting_box_is_show
        },
        show_updateCollect: function (){
            this.close_menu()
            if (this.updateCollect_box_is_show){
                $(".updateCollect_box").css("transform", "rotateX(90deg)")
            }else {
                $(".updateCollect_box").css("transform", "rotateX(0deg)")
            }
            this.updateCollect_box_is_show = !this.updateCollect_box_is_show
        },
        open_list: function (e, collect){
            var collect_height = 53
            if ($(e.target).attr("isOpen") === "0") {
                $(e.target).parent(".collect_dir").children(".collect_list").height(collect_height * collect.list.length)
                $(e.target).attr("isOpen", "1")
            }else {
                $(e.target).parent(".collect_dir").children(".collect_list").height(0)
                $(e.target).attr("isOpen", "0")
            }
        },
        box_slide: function (){
            var box_height = $(".left").height()
            var content_height = $(".collect_box").height()
            console.log(this.box_slide_top)
            console.log(box_height + " , " + content_height)
            if(event.wheelDelta > 0 && this.box_slide_top < 0){
                //滚轮向下滚动
                this.box_slide_top+=50
                $(".collect_box").css("margin-top", this.box_slide_top)
            }else if (event.wheelDelta < 0 && -this.box_slide_top < (content_height - box_height)){
                //滚轮向上滚动
                this.box_slide_top-=50
                $(".collect_box").css("margin-top", this.box_slide_top)
            }
        },
        open_menu: function (e){
            this.close_menu("menu")
            if (!this.menu_is_open){
                var thet = this
                $.getJSON("/myIndex/collectList", function (e){
                    thet.collectList = e
                })
                $(".left").width(300)
                $(".collect_box_show_big").show(300)
                this.menu_is_open = !this.menu_is_open
            }else {
                $(".left").width(0)
                $(".collect_box_show_big").hide(300)
                this.menu_is_open = !this.menu_is_open
            }
        },
        close_menu: function (e){
            if (this.menu_is_open && e != "menu"){
                $(".left").width(0)
                $(".collect_box_show_big").hide(300)
                this.menu_is_open = !this.menu_is_open
            }
            if (this.btm_btns_is_show && e != "btm_btns"){
                $(".btm_btns").css("bottom", -207)
                $(".show_btm_btns").css("transform", "rotateZ(0deg)")
                this.btm_btns_is_show = !this.btm_btns_is_show
            }
            if (this.setting_box_is_show){
                $(".setting_box").css("transform", "rotateX(90deg)")
                this.setting_box_is_show = !this.setting_box_is_show
            }
            if (this.updateCollect_box_is_show){
                $(".updateCollect_box").css("transform", "rotateX(90deg)")
                this.updateCollect_box_is_show = !this.updateCollect_box_is_show
            }
            if(this.collect_box_is_show && e != "collect_big"){
                $(".collect_big").css("transform", "rotateX(90deg)")
                this.collect_box_is_show = false
            }
        },
        setHome: function (obj){
            var vrl = window.location
            try{
                obj.style.behavior='url(#default#homepage)';obj.setHomePage(vrl);
            }
            catch(e){
                if(window.netscape) {
                    try {
                        netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                    }
                    catch (e) {
                        alert("此操作被浏览器拒绝！\n请在浏览器地址栏输入“about:config”并回车\n然后将 [signed.applets.codebase_principal_support]的值设置为'true',双击即可。");
                    }
                    var prefs = Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
                    prefs.setCharPref('browser.startup.homepage',vrl);
                }else{
                    alert("您的浏览器不支持，请按照下面步骤操作：1.打开浏览器设置。2.点击设置网页。3.输入："+vrl+"点击确定。");
                }
            }
        },
        show_btm_btns: function (){
            this.close_menu("btm_btns")
            if (this.btm_btns_is_show){
                $(".btm_btns").css({
                    "bottom": -207,
                })
                $(".show_btm_btns").css({
                    "transform": "rotateZ(0deg)"
                })
                this.btm_btns_is_show = false
            }else {
                $(".btm_btns").css({
                    "bottom": 10,
                })
                $(".show_btm_btns").css({
                    "transform": "rotateZ(180deg)"
                })
                this.btm_btns_is_show = true
            }
        },
        update_collect: function (){
            var thet = this
            $(".collect_box_update").text("上传中")
            $.get("/myIndex/addCollect", this.add_collect, function (e){
                $(".collect_box_update").text(e)
                thet.add_collect = {
                    name: "",
                    ico: "",
                    url: "",
                    type: ""
                }
                setTimeout($(".collect_box_update").text("提交"), 3000)
            })
        },
        auto_ico: function (){
            var url_list = this.add_collect.url.split("/")
            var ico_url = ""
            for (var u in [0, 1, 2]){
                ico_url += (url_list[u] + "/")
            }
            ico_url += "favicon.ico"
            this.add_collect.ico = ico_url
        },
        load_local_data: function (){
            // top栏url列表
            var top_url_list_str = window.localStorage.getItem("top_url_list")
            // 当该值为空时，写入初始数据
            if(!top_url_list_str){
                top_url_list_str = JSON.stringify(this.top_url_list)
                window.localStorage.setItem("top_url_list", top_url_list_str)
            }
            this.top_url_list =JSON.parse(top_url_list_str)

            // 首页展示文本
            var index_title = window.localStorage.getItem("index_title")
            // 当该值为空时，写入初始数据
            if(!index_title){
                index_title = this.index_title
                window.localStorage.setItem("index_title", index_title)
            }
            this.index_title = index_title
            var index_content = window.localStorage.getItem("index_content")
            // 当该值为空时，写入初始数据
            if(!index_content){
                index_content = this.index_content
                window.localStorage.setItem("index_content", index_content)
            }
            this.index_content = index_content

            // 首页背景图
            this.index_bgi_index = parseInt(window.localStorage.getItem("index_bgi_index") ? window.localStorage.getItem("index_bgi_index") : 0)
        },
        update_local_data: function (){
            var top_url_list_str = JSON.stringify(this.top_url_list)
            window.localStorage.setItem("top_url_list", top_url_list_str)
            window.localStorage.setItem("index_title", this.index_title)
            window.localStorage.setItem("index_content", this.index_content)
            window.localStorage.setItem("index_bgi_index", this.index_bgi_index)

        },
        add_top_url: function (){
            this.top_url_list.push({
                name: "",
                url: ""
            })
        },
        delete_top_url: function (index){
            this.top_url_list.splice(index, 1)
            this.update_local_data()
        },
        local_val_revalue: function (){
            this.update_local_data()
        },
        re_bgi: function (e){
            this.index_bgi_index += 1
            if (this.index_bgi_index > this.index_bgi_list.length-1){
                this.index_bgi_index = 0
            }
            $(".header").css("background-image", "url("+this.index_bgi_list[this.index_bgi_index]+")")
            this.update_local_data()
        },
        show_hide: function (){
            var thet = this
            $.getJSON("/myIndex/collectList?is_show=2", function (e){
                thet.collectList.push(e[0])
            })
        },
        re_collect_big_collect: function (e, collect){
            $(".collect_big_top_lab").removeClass("collect_big_top_lab_click")
            $(e.target).addClass("collect_big_top_lab_click")
            this.collect_big_collect = collect["list"]
        },
        collect_box_show_big: function (){
            this.close_menu("collect_big")
            if(this.collect_box_is_show){
                $(".collect_big").css("transform", "rotateX(90deg)")
                this.collect_box_is_show = false
            }else {
                $(".collect_big").css("transform", "rotateX(0deg)")
                this.collect_box_is_show = true
            }
        }
    },
    mounted: function (){
        var thet = this
        // 判断是否为本地加载
        if (!(window.location.host=="127.0.0.1" || window.location.host=="localhost" || window.location.host=="")){

            this.local_path = "./static/wxid/"
        }
        if(index_show !== true){
            window.location.href = "404";
        }
        // 读取本地配置
        this.load_local_data()
        $(".header").css("background-image", "url("+this.index_bgi_list[this.index_bgi_index]+")")

        //计算.left高度
        this.collect_box_style.height = ($(window).height() - $(".top").height()) + "px"
    },
    updated: function (){
    }
})

$(".tab").on("click", function (){
    var href = $(this).attr("href")
    if (!href){
        return
    }
    $(".live").css("transform", "rotateX(0deg)")
    setTimeout(function (){
        $(".live").css("transform", "rotateX(90deg)")
        setTimeout(function () {
            window.location.href = href
        }, 800)
    }, 2000)
})