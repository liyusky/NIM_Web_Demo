var Login = {
	//这里做了个伪登录方式（实际上是把accid，token带到下个页面连SDK在做鉴权）
	//一般应用服务器的应用会有自己的登录接口
	requestLogin: function (account, sdktoken) {
		setCookie('uid', account);
		setCookie('sdktoken', sdktoken);
	},
};
Login.requestLogin('100390017', '12f7600c356db2effcbb4a647505dc79');