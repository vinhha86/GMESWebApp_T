Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.stockout_m_edit.stockout_m_edit_d.Stockout_M_Edit_D_MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.Stockout_M_Edit_D_MainController',
	init: function () {
		
	},
	control: {
        '#Stockout_M_Edit_D': {
			// itemtap: 'onItemTap',
            itemsingletap: 'onStockout_M_Edit_DItemTap'
		},
	},
	onStockout_M_Edit_DItemTap: function(dataView, index, target, record, e, eOpts){
        var me = this.getView();
        var m = this;
		var viewModel = this.getViewModel();
		viewModel.set('selectedDRecord', record);

        this.setComboPkl();
        this.setComboPklRip();
    },
    setComboPkl: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pkl_stockoutdId', selectedDRecord.get('id'));
    },
    setComboPklRip: function(){
        var viewModel = this.getViewModel();
        var selectedDRecord = viewModel.get('selectedDRecord');
        viewModel.set('pklRip_stockoutdId', selectedDRecord.get('id'));
    },
	onmaNPLFilterKeyup: function (){
        var grid = this.getView().down('#Stockout_M_Edit_D'),
            // Access the field using its "reference" property name.
            filterField = this.getView().down('#maNPLFilter'),
            filters = grid.store.getFilters();
        
        var viewModel = this.getViewModel();
        viewModel.set('selectedDRecord', null);
        grid.getSelectable().deselectAll();

        if (filterField.getValue()) {
            this.maNPLFilter = filters.add({
                id: 'maNPLFilter',
                property: 'skucode',
                value: filterField.getValue(),
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.maNPLFilter) {
            filters.remove(this.maNPLFilter);
            this.maNPLFilter = null;
        }
    },
    reloadStore: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var stockoutid_link = viewModel.get('stockout.id');
        var selectedDRecord = viewModel.get('selectedDRecord');

        var Stockout_d_Store = viewModel.getStore('Stockout_d');
        Stockout_d_Store.loadByStockoutID_async(stockoutid_link);
        Stockout_d_Store.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    if(selectedDRecord != null){
                        var storeItems = Stockout_d_Store.getData().items;
                        for(var i=0; i<storeItems.length; i++){
                            var item = storeItems[i];
                            if(item.get('id') == selectedDRecord.get('id')){
                                var grid = m.getView().down('#Stockout_M_Edit_D');
                                grid.getSelectable().select(item);
                                viewModel.set('selectedDRecord', item);
                                viewModel.set('pkl_stockoutdId', item.get('id'));
                                viewModel.set('pklRip_stockoutdId', item.get('id'));
                            }
                        }
                    }
                }
            }
        });
    }
})