Ext.define('GSmartApp.view.users.Vendor_Buyer_ForUser_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Vendor_Buyer_ForUser_Controller',
	init: function() {
		
    },
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    }
})