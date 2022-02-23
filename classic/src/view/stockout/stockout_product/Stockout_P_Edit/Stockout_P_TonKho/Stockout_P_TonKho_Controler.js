Ext.define('GSmartApp.view.stockout.stockout_product.Stockout_P_Edit.Stockout_P_TonKho.Stockout_P_TonKho_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_P_TonKho_Controller',
	init: function() {
        var viewModel = this.getViewModel();
        var stockid_link = viewModel.get('stockid_link');
        var pcontract_poid_link = viewModel.get('pcontract_poid_link');

        // this.getall_sku_byline();
	},
	control:{
		'#btnThoat' : {
            click: 'onThoat'
        },
        '#Stockout_P_TonKho': {
			afterrender: 'getall_sku_byline',
		},
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    getall_sku_byline: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pcontract_poid_link = viewModel.get('pcontract_poid_link');

        me.setLoading(true);

		var params = new Object();
		params.pcontract_poid_link = pcontract_poid_link;
		GSmartApp.Ajax.post('/api/v1/pcontract_po/getall_sku_byline', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				me.setLoading(false);
				if (success) {
					if (response.respcode == 200) {
						console.log(response);

                        var StockoutD_Store = viewModel.getStore('StockoutD_Store');
                        // StockoutD_Store.removeAll();
                        StockoutD_Store.insert(0, response.data);
                        StockoutD_Store.commitChanges();

                        m.check_instock(response.data);
					} else {
						Ext.Msg.show({
							title: 'Thông báo',
							msg: response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				} else {
					Ext.Msg.show({
						title: 'Thông báo',
						msg: response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
    },
    check_instock: function(items){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockid_link = viewModel.get('stockid_link');

        var skuIdList = [];
        for(var i = 0; i<items.length; i++){
            var skuid_link = items[i].skuid_link;
            skuIdList.push(skuid_link);
        }

        var params = new Object();
		params.stockid_link = stockid_link;
		params.skuIdList = skuIdList;

		me.setLoading(true);

		GSmartApp.Ajax.postJitin('/api/v1/warehouse/check_inStock', Ext.JSON.encode(params),
			function (success, response, options) {
				me.setLoading(false);
				var response = Ext.decode(response.responseText);
				if (success) {
					if (response.respcode == 200) {
						console.log(response);
                        var StockoutD_Store = viewModel.getStore('StockoutD_Store');
						for(var i = 0; i < response.data.length; i++){
							var obj = response.data[i];
							var rec = StockoutD_Store.findRecord('skuid_link', obj.skuid_link, 0, false, true, true);
							rec.set('so_luong_ton_kho', obj.totalpackage);
							StockoutD_Store.commitChanges();
							// console.log(rec);
						}
					} else {
						Ext.Msg.show({
							title: 'Thông báo',
							msg: response.message,
							buttons: Ext.MessageBox.YES,
							buttonText: {
								yes: 'Đóng',
							}
						});
					}
				} else {
					Ext.Msg.show({
						title: 'Thông báo',
						msg: response.message,
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
    }
})