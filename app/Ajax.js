Ext.define('GSmartApp.Ajax', {
	extend: 'Ext.app.ViewController',
	singleton: true,
	access_token: function () {
		var access_token;
		var me = this;
		try {
			access_token = config.getToken();
			if (access_token == null) {
				me.redirectTo('login', { replace: true });
			}
		} catch (err) {
			me.redirectTo('login', { replace: true });
		}
		return access_token;
	},
	getTermid: function () {
		var Termid;
		var me = this;
		try {
			access_token = config.getToken();
			if (access_token != null) {
				var session = GSmartApp.util.State.get('session');
				var user;
				if (session) {
					user = session.user;
					Termid = 'term-' + user;
				}

			}
			if (access_token == null) {
				me.redirectTo('login', { replace: true });
			}
		} catch (err) {
			me.redirectTo('login', { replace: true });
		}
		return Termid;
	},
	getClientid: function () {
		var clientid;
		var me = this;
		try {
			access_token = config.getToken();
			if (access_token != null) {
				clientid = 'gpay#devops' + data.user.id;
			}
			if (access_token == null) {
				me.redirectTo('login', { replace: true });
			}
		} catch (err) {
			me.redirectTo('login', { replace: true });
		}
		return clientid;
	},
	post: function (url, params, callback) {
		var me = this;
		Ext.Ajax.request({
			url: config.getAppBaseUrl() + url,
			method: 'POST',
			timeout: 120000,
			cors: true,
			headers: {
				'Content-Type': "application/json"
			},
			useDefaultXhrHeader: false,
			params: params,
			success: function (response, options) {
				callback.call(me, true, response, options);
			},
			failure: function (response, options) {
				callback.call(me, false, response, options);
				//me.fireEvent('logout');

			}
		});
		//}

	},
	post_demo: function (url, params, callback) {
		var me = this;
		Ext.Ajax.request({
			url: config.getAppBaseUrl_demo() + url,
			method: 'POST',
			cors: true,
			headers: {
				'Content-Type': "application/json"
			},
			useDefaultXhrHeader: false,
			params: params,
			success: function (response, options) {
				callback.call(me, true, response, options);
			},
			failure: function (response, options) {
				callback.call(me, false, response, options);
				//me.fireEvent('logout');

			}
		});
		//}

	},
	postJitin: function (url, params, callback) {
		var me = this;
		Ext.Ajax.request({
			url: config.getAppBaseUrl_Jitin() + url,
			method: 'POST',
			cors: true,
			headers: {
				'Content-Type': "application/json"
			},
			useDefaultXhrHeader: false,
			params: params,
			success: function (response, options) {
				callback.call(me, true, response, options);
			},
			failure: function (response, options) {
				callback.call(me, false, response, options);
				console.log(response, options);
				//me.fireEvent('logout');

			}
		});
		//}

	},
	postUpload: function (url, rawdata, callback) {
		var me = this;
		Ext.Ajax.request({
			url: config.getAppBaseUrl() + url,
			method: 'POST',
			cors: true,
			rawData: rawdata,
			headers: {
				'Content-Type': null
			},
			useDefaultXhrHeader: false,
			success: function (response, options) {
				callback.call(me, true, response, options);
			},
			failure: function (response, options) {
				callback.call(me, false, response, options);
			}
		});
	},
	postUpload_timeout: function (url, rawdata, timeout, callback) {
		var me = this;
		Ext.Ajax.request({
			url: config.getAppBaseUrl() + url,
			method: 'POST',
			cors: true,
			rawData: rawdata,
			headers: {
				'Content-Type': null
			},
			timeout: timeout,
			useDefaultXhrHeader: false,
			success: function (response, options) {
				callback.call(me, true, response, options);
			},
			failure: function (response, options) {
				callback.call(me, false, response, options);
			}
		});
	},
	postUpload_timeout_Jitin: function (url, rawdata, timeout, callback) {
		var me = this;
		Ext.Ajax.request({
			url: config.getAppBaseUrl_Jitin() + url,
			method: 'POST',
			cors: true,
			rawData: rawdata,
			headers: {
				'Content-Type': null
			},
			timeout: timeout,
			useDefaultXhrHeader: false,
			success: function (response, options) {
				callback.call(me, true, response, options);
			},
			failure: function (response, options) {
				callback.call(me, false, response, options);
			}
		});
	},
	setProxy: function (store, url, params, callback) {
		var me = this;

		var access_token = config.getToken();
		//if(access_token==null){
		//	me.redirectTo('login', {replace: true});
		//}else{
		store.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + url,
			paramsAsJson: true,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
				//					'authorization': access_token
			},
			extraParams: params,
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		store.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				console.log(records, operation, success);
				//if(!success){
				//	me.fireEvent('logout');
				//}
				callback.call(records, operation, success);
			}
		});
		//}
	}
});