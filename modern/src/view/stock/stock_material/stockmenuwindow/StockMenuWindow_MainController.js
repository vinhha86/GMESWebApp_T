Ext.define('GSmartApp.view.stock.stock_material.stockmenuwindow.StockMenuWindow_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.StockMenuWindow_MainController',
	init: function () {

	},
	control: {
        '#btnChon':{
            tap: 'onBtnChon'
        },
	},
    onBtnChon: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var selectedStock = viewModel.get('selectedNode');

        // console.log(selectedStock);
        if(selectedStock == null){ 
            // console.log('length 0');
            Ext.toast('Bạn cần chọn khoang trong danh sách', 1000);
            return;
        }else{
            if(selectedStock.get('type') != 5 && selectedStock.get('khoangKhongXacDinh') != true){
                Ext.toast('Bạn cần chọn khoang trong danh sách', 1000);
                return;
            }
            
            selectedStock.set('id', null);
            this.fireEvent('SelectStock', selectedStock.data);
        }

        // console.log(selection);
        // this.fireEvent('SelectStock');
    }
})