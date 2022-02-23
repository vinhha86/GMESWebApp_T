Ext.define('GSmartApp.view.invcheck.InvCheckPackingListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.invcheckpackinglist',
	init: function() {
        this.callParent(arguments);
    },
	onPackingListClose:function(){
		var view = this.getView().up('window');
		view.close();
	}
})