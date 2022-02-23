Ext.define('GSmartApp.view.device.DeviceEditController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.deviceedit',
	onSave:function(){
		
	},
	onClose:function(){
		var view = this.getView().up('window');
		view.close();
	}
})