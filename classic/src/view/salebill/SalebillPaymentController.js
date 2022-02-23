Ext.define('GSmartApp.view.salebill.SalebillPaymentController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.salebillpayment',
	init: function() {
        this.callParent(arguments);
    },
	onPay:function(){
		
		var view = this.getView().up('window');
		view.close();
	},
	onClose:function(){
		var view = this.getView().up('window');
		view.close();
	}
})