Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pklist.Stockout_Pklist_StockController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pklist_StockController',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_Pklist_Stock': {
            // afterrender: 'onAfterrender',
            itemclick: 'onItemclick'
        },
        // '#btnThoat': {
        //     click: 'onThoat'
        // },
        // '#btnSelect': {
        //     click: 'onSelect'
        // },
    },
    // onThoat: function(){
    //     this.fireEvent('Thoat');
    // },
    // onSelect: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
    //     var select = me.getSelectionModel().getSelection();
    //     if (select.length == 0) {
    //         Ext.Msg.show({
    //             title: "Thông báo",
    //             msg: "Phải chọn một đơn hàng",
    //             buttons: Ext.MessageBox.YES,
    //             buttonText: {
    //                 yes: 'Đóng',
    //             }
    //         });
    //         return;
    //     }
    //     this.fireEvent("ThemDonHang", select);
    //     // this.onThoat();
    // },
    // onAfterrender: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var productid_link = viewModel.get('productid_link');

    //     var mainView = Ext.getCmp('Stockout_Pcontract_Main_View');
    //     if(mainView) mainView.setLoading(true);

    //     var params = new Object();
    //     params.productid_link = productid_link ;
    //     GSmartApp.Ajax.post('/api/v1/pcontract/getByProduct',Ext.JSON.encode(params),
	// 	function(success,response,options ) {
    //         if(mainView) mainView.setLoading(false);
    //         var response = Ext.decode(response.responseText);
    //         if(response.respcode == 200) {
	// 			// console.log(response);
    //             var data = response.data;
    //             var PContractStore = viewModel.getStore('PContractStore');
    //             PContractStore.setData(data);
    //         }
	// 	})
    // },
    onItemclick: function(thisView, record, item, index, e, eOpts){
        // console.log(record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var WarehouseStore = viewModel.getStore('WarehouseStore');
        WarehouseStore.removeAll();
        WarehouseStore.insert(0, record.get('warehouseList'));
    }
})