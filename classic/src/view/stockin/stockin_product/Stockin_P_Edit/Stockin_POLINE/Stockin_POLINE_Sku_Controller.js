Ext.define('GSmartApp.view.stockin.stockin_product.stockin_p_edit.stockin_POLINE.Stockin_POLINE_Sku_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_POLINE_Sku_Controller',
	init: function() {
        
	},
	control:{
        // '#Stockin_POLINE': {
        //     itemclick: 'onStockin_POLINE_itemclick'
        // }
    },
    // onStockin_POLINE_itemclick: function( thisView, record, item, index, e, eOpts){
    //     console.log(record);
    // }
    onItemSkuEdit: function (editor, context, eOpts) {
		// console.log(context);
		var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
		var store = me.getStore();
		var item = context.record.data;

		if (context.field == 'so_luong_yeu_cau') {
            if(item.so_luong_yeu_cau == null || item.so_luong_yeu_cau == '') item.so_luong_yeu_cau = 0;
			item.so_luong_yeu_cau = parseInt(item.so_luong_yeu_cau);
		}
		store.commitChanges();
        // console.log(store);

        var grid = this.getView();
        var select = grid.getSelectionModel().getSelection();
        // console.log(select);
        // console.log(context);

        var found = select.some(item => item.get('id') == context.record.get('id'));
        if(!found){
            select.push(context.record);
        }

        grid.getSelectionModel().select(select);
	},
})