Ext.define('GSmartApp.store.groupuser.GroupUser_Menu_TreeStore', {
	extend: 'Ext.data.TreeStore',
	alias: 'store.GroupUser_Menu_TreeStore',
	idProperty: 'idx',
	fields: [
		'id',
		'idx',
		'text',
		'checked',
		{
			name: 'iconCls', type: 'string',
			convert: function (value) {
				return 'x-fa fa-' + value;
			}
		},],
	expanded: true,
	loadStore_byrole: function (roleid_link) {
		var me = this;
		var params = new Object();
		params.roleid_link = roleid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/menu/menu_tree_getbyrole',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'children'
			}
		});
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},

	loadStore_inrole: function (roleid_link) {
		var me = this;
		var params = new Object();
		params.roleid_link = roleid_link;
		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create: 'POST',
				read: 'POST',
				update: 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl() + '/api/v1/menu/menu_tree_inrole',
			paramsAsJson: true,
			extraParams: params,
			noCache: false,
			headers: {
				'Accept': "application/json",
				'Content-Type': "application/json"
			},
			reader: {
				type: 'json',
				rootProperty: 'children'
			}
		});
		this.loadPage(1, {
			scope: this,
			callback: function (records, operation, success) {
				if (!success) {
					// this.fireEvent('logout');
				}
			}
		});
	},

});
