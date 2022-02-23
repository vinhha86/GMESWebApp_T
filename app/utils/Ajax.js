Ext.define('GSmartApp.util.Ajax', {
	extend: 'Ext.app.ViewController',
	singleton: true,
	post: function (url, params, callback) {
		var me = this;
		var data = App.util.State.get('session');
		if (data == null) {
			//me.redirectTo('login', {replace: true});
		} else {
			var access_token = data.access_token;
			if (access_token == null) {
				access_token = data.data.access_token;
			}
			if (access_token == null) {
				me.redirectTo('login', { replace: true });
			} else {
				Ext.Ajax.request({
					url: config.getAppBaseUrl() + url,
					method: 'POST',
					cors: true,
					timeout: 60000,
					headers: {
						'Content-Type': "application/json",
						'authorization': 'Bearer ' + access_token
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
			}
		}
	},
	post_with_timeout: function (url, params, callback, timeout) {
		if (timeout == null)
			timeout = 45000;
		var me = this;
		var data = App.util.State.get('session');
		if (data == null) {
			//me.redirectTo('login', {replace: true});
		} else {
			var access_token = data.access_token;
			if (access_token == null) {
				access_token = data.data.access_token;
			}
			if (access_token == null) {
				me.redirectTo('login', { replace: true });
			} else {
				Ext.Ajax.request({
					url: config.getAppBaseUrl() + url,
					method: 'POST',
					cors: true,
					timeout: timeout,
					headers: {
						'Content-Type': "application/json",
						'authorization': 'Bearer ' + access_token
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
			}
		}
	},
	setProxy: function (store, url, params, callback) {
		var me = this;
		var data = App.util.State.get('session');
		if (data == null) {
			me.redirectTo('login', { replace: true });
		} else {
			var access_token = data.access_token;
			if (access_token == null) {
				access_token = data.data.access_token;
			}
			if (access_token == null) {
				me.redirectTo('login', { replace: true });
			} else {
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
						'Content-Type': "application/json",
						'authorization': 'Bearer ' + access_token
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
						if (!success) {
							me.fireEvent('logout');
						}
						callback.call(records, operation, success);
					}
				});
			}
		}
	}
})