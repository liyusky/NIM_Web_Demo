var ExtendsFn = {
    init:function(){
      this.dialogNetcall = document.getElementById('extend-dialog-netcall'),
      this.released = document.getElementById('extends-released'),
      this.Transfer = document.getElementById('chatBox').getElementsByClassName('Transfer')[0];
      var arr = [this.dialogNetcall,this.released,this.Transfer];
      return  arr;
    },
    showZZ: function (id) {     //展示转账记录
    },
    showXYBG: function (phone) {  //展示信用报告
        var dom = this.init()[0];
        $(dom).removeClass('hide');
        
    },
    hideXYBG: function (event) { // 隐藏信用报告
        var dom = document.getElementById(event);
        var classNames = dom.className;
        dom.className = classNames+' '+'hide';
    },
    showJT: function (id) {     //展示借条
         var dom = this.init()[1];
        $(dom).removeClass('hide');
    },
    showQT: function (id) {     //展示欠条
       var dom = this.init()[2];
        $(dom).removeClass('hide');
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


ExtendQuickSend.init();

