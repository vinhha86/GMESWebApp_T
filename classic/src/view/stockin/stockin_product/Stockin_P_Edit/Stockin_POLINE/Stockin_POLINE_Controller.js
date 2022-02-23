Ext.define('GSmartApp.view.stockin.stockin_product.stockin_p_edit.stockin_POLINE.Stockin_POLINE_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_POLINE_Controller',
	init: function() {
        
	},
	control:{
        '#Stockin_POLINE': {
            itemclick: 'onStockin_POLINE_itemclick'
        }
    },
    onStockin_POLINE_itemclick: function( thisView, record, item, index, e, eOpts){
        // console.log(record);
        var pcontract_poid_link = record.get('id');
        var viewModel = this.getViewModel();
        var PContractSKUStore = viewModel.getStore('PContractSKUStore');

        var mainView = this.getView().up('window');
        if(mainView) mainView.setLoading(true);

        PContractSKUStore.load_by_pcontract_po_async(pcontract_poid_link);
		PContractSKUStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(mainView) mainView.setLoading(false);
				if(!success){
					 // this.fireEvent('logout');
				} else {
				}
			}
		});

        viewModel.set('poData.id', record.get('id'));
        viewModel.set('poData.po_buyer', record.get('po_buyer'));
    }
})