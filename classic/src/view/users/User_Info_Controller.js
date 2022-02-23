Ext.define('GSmartApp.view.users.User_Info_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.User_Info_Controller',
	init: function() {
		var listidtype = "8,9,13,22,17";
		var OrgStore = this.getViewModel().getStore('OrgStore');
		OrgStore.loadStore_allchildren_byorg(listidtype);

		var viewmodel = this.getViewModel();
		if(viewmodel.get('User.id') > 0){
			var grantStore = viewmodel.getStore('OrgGrantStore');
			var parentid_link = viewmodel.get('User.orgid_link');
			grantStore.getbyParent(parentid_link);
		}
	},
	control: {
		'#cmbOrg' : {
			select: 'onSelectOrg'
		}
	},
	onSelectOrg: function(combo, record){
		var viewmodel = this.getViewModel();
		var grantStore = viewmodel.getStore('OrgGrantStore');
			var parentid_link = record.get('id');
			grantStore.getbyParent(parentid_link);
	}
})