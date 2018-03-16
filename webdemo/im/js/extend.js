var ExtendsFn = {
    init:function(){
        this.arr = {
            /* 
            
                第一次加载进来的时候为true点击的时候就能够点击加载ajax了

            */
            XYBG:true, // 信用报告
            showjt:true,// 显示借条
            showqt:true,// 显示欠条
            showzz:true// 显示转账记录
        }
    },
    showZZ: function (phone,ev) {     //展示转账记录
        this.prevent("showzz","zhuanzhang");
    },
    showXYBG: function (phone) {  //展示信用报告
        this.prevent("XYBG","xiyongbaogao");
    },
    hideXYBG: function (event) { // 隐藏信用报告
        $("#"+event).remove(); // 因为后面是ajax动态加载的所以每次关闭的时候要直接remove掉元素
          for(var key in this.arr){
              if(this.arr[key] == false){ // 检测哪一条数据是被false了的，为了确保下一次能够点击将他变为true
                this.arr[key] = true;
              }
          }
    },
    showJT: function (id) {     //展示借条
        this.prevent("showjt","jiekuanxiangqingyifangkuan");
    },
     showQT: function (id) {     //展示欠条
        this.prevent("showqt","qiantiao");
    },
    prevent:function(onOff,url){ 
      if(this.arr[onOff]){
          this.ajaxinIt(url);
          this.arr[onOff]=false;// 防止重复点击
      }
    },
    ajaxinIt:function(url){
        $.ajax({
          url : "/webnim/"+url+".json",
          dataType : 'json',
          success : function (data){
            switch(url){ // 借款详情已放款
              case "jiekuanxiangqingyifangkuan" :
                var str = ` <div class="extends-Loandetails" id="extends-released">
                            <div class="LoandetailsHead">
                                <img src="./images/Loan.png" alt="Alternate Text">
                                <p class="loan">借款详情</p>
                                <a onclick="javascript:ExtendsFn.hideXYBG('extends-released');" class="close">X</a>
                            </div>
                            <div class="loandetailsContent">
                                <div class="iconphoto"></div>
                                <p class="Loan-send">${data.state}</p>
                                <p class="iconText">￥${data.capital}.00</p>
                                <ul>
                                    <li>本金: <span>${data.capital}.00</span></li>
                                    <li>年利率: <span>${data.rate}%</span></li>
                                    <li>其他费用: <span>${data.otherMoney}.00</span></li>
                                    <li>借款时间: <span>20${data.startDate} 09:35:12</span></li>
                                    <li>到期时间: <span>20${data.endDate} 09:35:12</span></li>
                                </ul>
                            </div>
                        </div>` ;
                $("#chatBox").append(str);
                  break;
              case "qiantiao" : // 欠条
                    var str = `<div class="extends-Loandetails transfer" id="extends-Transfer">
                    <div class="LoandetailsHead">
                        <img src="./images/Loan.png" alt="转账详情" />
                        <p class="loan">欠条详情</p>
                        <a onclick="javascript:ExtendsFn.hideXYBG('extends-Transfer');" class="close">X</a>
                    </div>
                    <div class="loandetailsContent">
                        <div class="iconphoto"></div>
                        <p class="Loan-send">已放款</p>
                        <p class="iconText">￥${data.capital}.00</p>
                        <ul>
                            <li>本金: <span>${data.capital}.00</span></li>
                            <li>年利率: <span>${data.rate}%</span></li>
                            <li>其他费用:<span>${data.otherMoney}.00</span></li>
                            <li>借款时间: <span>20${data.startDate} 09:35:12</span></li>
                            <li>到期日期: <span>20${data.endDate}  09:35:12</span></li>
                        </ul>
                    </div>
                </div>`;
            $("#chatBox").append(str);
                 break;
              case "xiyongbaogao" : // 信用报告
                    var str = `<div class="extends-netcall-dialog" id="extend-dialog-netcall">
                    <div class="netcall-dialog-head">
                        <img src="./images/details.jpg" alt="Alternate Text">
                        <p class="details">信用报告</p>
                        <a onclick="javascript:ExtendsFn.hideXYBG('extend-dialog-netcall');" class="close">X</a>
                    </div>
                    <div class="netcall-dialog-content">
                        <ul>
                            <li class="font16 fontWight">个人基本信息</li>
                            <li>姓名: ${data.name}</li>
                            <li>身份证号: ${data.ID}</li>
                            <li>申请编号: ${data.applyNum}</li>
                            <li>报告时间: ${data.date} 10:44:55</li>
                            <li class="font16 fontWight">风险排查</li>
                            <li>[${data.fenxianOne}]</li>
                            <li>[${data.fenxianTwo}]</li>
                        </ul>
                        <span class="more"></span>
                    </div>
                </div>`;
                  $("#chatBox").append(str);
                  break;
              case "jiekuanxiangqingyiyuqi" : // 借款详情已逾期
                    var str = `<div class="extends-Loandetails2 extends-Loandetails" id="extends-Loandetails2">
                    <div class="LoandetailsHead">
                        <img src="./images/Loan.png" alt="Alternate Text" />
                        <p class="loan">借款详情</p>
                        <a onclick="javascript:ExtendsFn.hideXYBG('extends-Loandetails2');" class="close">X</a>
                    </div>
                    <div class="loandetailsContent">
                        <div class="iconphoto"></div>
                        <p class="Loan-send">${data.state}7天</p>
                        <p class="iconText">￥${data.capital}.00</p>
                        <ul>
                            <li>本金: <span>${data.capital}.00</span></li>
                            <li>年利率: <span>${data.rate}%</span></li>
                            <li>其他费用: <span>${data.otherMoney}.00</span></li>
                            <li>借款时间: <span>${data.startDate} 09:35:12</span></li>
                            <li>到期时间: <span>${data.endDate} 09:35:12</span></li>
                        </ul>
                    </div>
                    <div class="loanfoot">
                        <a href="javascript:;">销账</a>
                        <a href="javascript:;" class="active">展期</a>
                    </div>
                 </div>`;
                  $("#chatBox").append(str);
                  break;
              case "zhuanzhang" : // 展示转账记录
                  var str =   `<div class="extends-Loandetails accounts" id="extends-Loandetails">
                  <div class="LoandetailsHead">
                      <img src="./images/Loan.png" alt="转账详情" />
                      <p class="loan">欠条详情</p>
                      <a onclick="javascript:ExtendsFn.hideXYBG('extends-Loandetails');" class="close">X</a>
                  </div>
                  <div class="loandetailsContent">
                      <div class="iconphoto"></div>
                      <p class="Loan-send">已收款</p>
                      <p class="iconText">￥500.00</p>
                      <ul>
                          <li>转给: <span>${data.name}</span></li>
                          <li>备注: <span>${data.note}</span></li>
                          <li>时间:<span>20${data.date} 09:35:12</span></li>
                      </ul>
                  </div>
              </div>`;
                   $("#chatBox").append(str);
                   break;
            }
          }

  });
    }
};
var ExtendTransference = {
  showTransference: function () {
    $("#extend-transference-iframe")
    .attr('src', function (index, value) {
      return value ? '' : './transference/transference.html';
    });
    $("#extend-transference").toggleClass("extend-close")
  },
  //移除客户 （只是页面上和本地数据中删除，并不处理后台数据，后台数据在后台修改）
  removeCustomer: function (person) {
    $('#friends').find('[data-account="' + person + '"]').remove();
    $('#sessions').find('[data-account="' + person + '"]').remove();
  }
}

var ExtendSearch = {
  userUID: null,
  personlist: null,
  list: null,
  refreshData: function () {
    this.list = [];
    this.personlist = yunXin.cache.personlist;
    this.userUID = readCookie('uid');
    delete this.personlist[userUID];
  },
  search: function (_this) {
    var self = this;
    self.refreshData();
    var keyword = _this.value;  //获取关键字
    
    //遍历对比
    for (var person in self.personlist) {
      var result = self.personlist[person].nick.indexOf(keyword) + person.indexOf(keyword);
      if (result > -2) this.list.push(person);
    }

    $('#friends>ul>li').each(function (index, dom) {
      $(this).attr('data-account', function (index, attr) {
        
        // console.log(self.list.indexOf(attr));
        
        switch (self.list.indexOf(attr)) {
          case -1:
            // console.log(this);
            $(this).attr('class', 'panel_item hide');
            break;
          default:
            // console.log(this);
            $(this).attr('class', 'panel_item');
        }      
      });
    });

    $('#sessions>ul>li').each(function (index, dom) {
      $(this).attr('data-account', function (index, attr) {

        // console.log(self.list.indexOf(attr));

        switch (self.list.indexOf(attr)) {
          case -1:
            // console.log(this);
            $(this).attr('class', 'panel_item hide');
            break;
          default:
            // console.log(this);
            $(this).attr('class', 'panel_item');
        }
      });
    });
  }
}

var ExtendChat = {
  copy: function (_this) {
    $(_this).find('.f-maxWid').text(function (index, content) {
      $('#messageText').val(content);
    });
  },
};

var ExtendQuickSend = {
  textarea: $('#entry-textarea'),
  input: $('#messageText'),
  sendBtn: $('#sendBtn'),
  list: $('#extends-quickSend-list'),
  max: 0,
  current: 0,
  content: {},
  type: 'add',
  init: function () {
    var self = this;
    var data = localStorage.getItem("quickSend");
    if (!data || data == '{}') {
      this.content = {};
    }
    else {
      this.content = JSON.parse(data);
    }
    var htmlStr = "";
    for (var index in this.content) {
      htmlStr += this.setHtml(index, self.content[index]);
      this.max = index * 1 > this.max ? index * 1 : this.max;
    }
    this.list.html(htmlStr);
  },
  send: function (_this) {
    if ($('#rightPanel').hasClass('hide')) return;
    var self = this;
    this.input.val($(_this).find('.item-content').text());
    this.sendBtn.click();
  },
  add: function () {
    var self = this;
    var content = this.textarea.val();
    this.textarea.val('');
    $('#extends-quickSend-btn').text('添加');
    if (!content) {
      this.type = 'add';
      alert('内容不能为空，请重试');
      return;
    }
    switch (this.type) {
      case 'add':
        this.content[++this.max] = content;
        var html = this.setHtml(self.max, content);
        this.list.append(html);
        break;
      case 'modify':
        this.content[this.current] = content;
        $('#extends-QuickSend-' + this.current).find('.item-content').text(content);
        $('#extends-QuickSend-' + this.current).attr('title', content);
        break;
    }
    this.type = 'add';
    localStorage.setItem('quickSend', JSON.stringify(self.content));
  },
  remove: function (_this) {
    var self = this;
    var index = $(_this).attr('data-index');
    delete self.content[index];
    localStorage.setItem('quickSend', JSON.stringify(self.content));
    $('#extends-QuickSend-' + index).remove();
  },
  modify: function (_this) {
    this.type = 'modify';
    this.current = $(_this).attr('data-index');
    var self = this;
    var content = $('#extends-QuickSend-' + self.current).find('.item-content').text();
    this.textarea.val(content);
    $('#extends-quickSend-btn').text('修改');
  },
  setHtml: function (index, content) {
    var htmlStr = '<li class="list-item" title="' + content + '" id="extends-QuickSend-' + index + '" ondblclick="javascript: ExtendQuickSend.send(this);">' +
      '<p class="item-content">' + content + '</p>' +
      '<div class="item-operation">' +
        '<div class="operation-group">' +
          '<div class="iconfont-wrap" title="修改" data-index="' + index + '" onclick="javascript: ExtendQuickSend.modify(this);">' +
            '<i class="iconfont icon-xiugai-copy"></i>' +
          '</div>' +
          '<div class="iconfont-wrap" title="删除" data-index="' + index + '" onclick="javascript: ExtendQuickSend.remove(this);">' +
            '<i class="iconfont icon-shanchu3"></i>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</li>';
    return htmlStr;
  },
}


var ExtendInfomessages = {
  onOff: true,
  quickDom: null,
  messageDom: null,
  init: function(event) {
        // 阻止冒泡防止点击的时候会把事件传向父级元素
        event.stopPropagation();
        // 获取快捷回复元素
        this.quickDom = document.getElementById("extend-quick-message-list");
        // 获取聊天框
        this.messageDom = document.getElementById("messageText");
        // 用于给聊天框设定位置以及点击显示隐藏
        this.eventsDom(this.quickDom, this.messageDom);
        // 添加快捷用语
        this.initMessageList(this.quickDom, this.messageDom);
        // 点击其他元素隐藏快捷用语
        this.clickHideMessge(this.quickDom)
  },
  initMessageList: function(quickDom, messageDom) {
    var arrList = ["快捷回复11111111", "快捷回复22221222", "快捷回复33333333", "快捷回复44444444", "快捷回复55555555"];
    var html = "",ullist = quickDom.children[0],$this = this;
    for (var i = 0; i < arrList.length; i++) {
      html += '<li onclick="ExtendInfomessages.addClick(this)">' + arrList[i] + '</li>'
    };
    ullist.innerHTML = html;
  },
  addClick:function($this){
    $("#messageText").val($this.innerText);
  },
  eventsDom: function(quickDom, messageDom) {
    var left = messageDom.offsetLeft, top = messageDom.offsetTop,cName = quickDom.className;
    quickDom.style.left = left + 'px';
    if (this.onOff) {
      $(quickDom).removeClass("hide");
    } else {
      $(quickDom).addClass("hide");
    }
    this.onOff = !this.onOff;
  },
  getStyle: function(obj, attr) {
    if (obj.currentStyle) {
      return obj.currentStyle[attr]
    } else {
      return getComputedStyle(obj, false)[attr]
    }
  },
  clickHideMessge: function(obj) {
    var wrapper = document.body.children[1],chatContent = document.getElementById("chatContent"),cName = obj.className;
    wrapper.onclick = chatContent.onclick = function() {
      $(obj).addClass("hide");
    }
  }
};

var ExtendInformationReport = {
  show: function () { //展示
    //当前聊天对象
    var account = yunXin.crtSessionAccount;
    $('#extends-information-report-content').removeClass('hide');
  },
  close: function () {  //关闭
    $('#extends-information-report-content').addClass('hide');
  },
  fillContent: function (data) {  //插入html
    var htmlStr = '<li class="table-item">' +
      '<div class="item-unit">状态</div>' +
      '<div class="item-unit">笔数</div>' +
      '<div class="item-unit">金额</div>' +
    '</li>';

    for (var i = 0; i < data.length; i++) {
      htmlStr += this.setHtml(data[i]);
    }
    $('#extends-information-report-content-table').html(htmlStr);
  },
  setHtml: function (data) {    //设置html字符串
    return '<li class="table-item">' +
      '<div class="item-unit">' + data.state + '</div>' +
      '<div class="item-unit">' + data.count + '</div>' +
      '<div class="item-unit">' + data.money + '</div>' +
    '</li>';
  }
}



window.onload = function () {
  ExtendQuickSend.init();
  ExtendsFn.init();
}



