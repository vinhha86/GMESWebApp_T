Ext.define('GSmartApp.view.stockout.Stockout_P_Select_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_Select_Controller',
	init: function() {
		var viewmodel = this.getViewModel();
		var GpayUser = viewmodel.getStore('GpayUser');
		GpayUser.loadUserInfo_Async();
		GpayUser.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
					var Stockout = viewmodel.getStore('Stockout');
					if (null!=records[0].data.org_grant_id_link)
						Stockout.loadByOrgTo(22,records[0].data.org_grant_id_link,viewmodel.get('status'));
					else
						Stockout.loadByOrgTo(22,records[0].data.orgid_link,viewmodel.get('status'));
				}
			}
		});
	},
	control:{
		'#btnThoat' : {
            click: 'onThoat'
        },
        '#btnLuu' :{
            click: 'onChon'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onChon: function(){
        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();

        grid.fireEvent("Chon", select[0].data);
    }
})