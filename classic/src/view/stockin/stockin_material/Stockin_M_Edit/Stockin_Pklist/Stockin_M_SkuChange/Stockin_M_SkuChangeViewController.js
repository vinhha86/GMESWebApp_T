Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_M_SkuChangeViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockin_M_SkuChangeViewController',
	init: function () {
		// var m = this;
        // var me = this.getView();
        // var viewModel = this.getViewModel();

        // var stockin_lot = viewModel.get('stockin_lot');
        // console.log(stockin_lot);
	},
	control: {
        '#Stockin_M_SkuChangeView': {
            afterrender: 'onAfterrender'
        },
		'#btnThoat': {
			click: 'onThoat'
		},
        '#btnLuu': {
			click: 'onLuu'
		},
	},
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onLuu: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var selection = me.getSelection();
        if(selection.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn cần chọn một nguyên phụ liệu',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        var selectedStockinD = selection[0];
        this.fireEvent('Luu', selectedStockinD);
    },
    onAfterrender: function(){
        this.onLoad();
    },
    onLoad: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var Stockin_d_Store = viewModel.getStore('Stockin_d_Store');
        var stockin_lot = viewModel.get('stockin_lot');
        var stockindid_link = stockin_lot.stockindid_link;
        // console.log(stockin_lot);

        Stockin_d_Store.loadStore_byStockinId_async(stockin_lot.stockinid_link);
        Stockin_d_Store.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    var storeData = Stockin_d_Store.getData().items; 
                    // console.log(storeData);
                    for(var i = 0;i<storeData.length;i++){
                        if(storeData[i].get('id') == stockindid_link){
                            me.getSelectionModel().select(storeData[i]);
                            break;
                        }
                    }
					
				}
			}
		});
    },
})