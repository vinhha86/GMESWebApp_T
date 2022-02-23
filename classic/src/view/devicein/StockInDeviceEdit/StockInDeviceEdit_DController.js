Ext.define('GSmartApp.view.devicein.StockInDeviceEdit_DController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.StockInDeviceEdit_DController',
	channel: { cmd: null, dta: null },
	init: function () {
		// var devicestore = this.getViewModel().getStore('DeviceInvStore');
		// devicestore.loadStore(3);
	},
	control: {
		'#StockInDeviceEdit_D': {
			itemdblclick: 'onItemDblCLick'
		}
	},
	onItemDblCLick: function(m, record, item, index, e, eOpts){
		// console.log(record);
		var form = Ext.create('Ext.window.Window', {
            // height: 500,
            width: 750,
            closable: false,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chi tiết thông tin thiết bị',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'DeviceDetail',
                viewModel: {
					type: 'DeviceDetailViewModel',
                    data: {
						deviceid_link: record.data.deviceid_link,
						deviceinid_link: record.data.deviceinid_link,
						isStockInDeviceEdit: true
                    }
                }
            }]
		});
        form.show();
	}
})