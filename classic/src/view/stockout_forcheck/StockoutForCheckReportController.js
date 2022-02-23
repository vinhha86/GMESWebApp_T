Ext.define('GSmartApp.view.stockout.StockoutForCheckReportController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.stockoutforcheckreport',

    onSearchTap: function(){
        var stockoutdate_from = this.lookupReference('stockoutdate_from');
        var stockoutdate_to = this.lookupReference('stockoutdate_to');
        forcheckR_rdoStockoutType = this.lookupReference('forcheckR_rdoStockoutType');

        var store_stockoutforcheckreport = Ext.data.StoreManager.lookup('store_stockoutforcheckreport'); 
        if (store_stockoutforcheckreport) {
            store_stockoutforcheckreport.loadByDate(stockoutdate_from.getValue(),stockoutdate_to.getValue(),forcheckR_rdoStockoutType.lastValue);
            //console.log(store_waiting);
        }  
    }, 
    renderSummary: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    onMaterialFilterKeyup: function() {
        var store_stockoutforcheckreport = Ext.data.StoreManager.lookup('store_stockoutforcheckreport');
        filterField = this.lookupReference('materialFilterField');
        filters = store_stockoutforcheckreport.getFilters();

        if (filterField.value) {
            this.materialFilter = filters.add({
                id: 'materialFilter',
                property: 'skucode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.materialFilter) {
            filters.remove(this.materialFilter);
            this.materialFilter = null;
        }
    },
    onCheckDetail: function(grid, rowIndex, colIndex){
        var record = grid.store.getAt(rowIndex);
        var form =Ext.create({
            xtype: 'stockoutforcheckreportdwindow',
            reference:'stockoutforcheckreportdwindow'
        });
        var viewModel = form.getViewModel();
        viewModel.set('stockout_d',record);
        form.show();
     },  
     onCloseButton: function() {
        var mywin = Ext.WindowManager.getActive();
        if (mywin) {
            mywin.close();
        }
    }, 
    onExportExcel: function(){
        this.getView().saveDocumentAs({
            type: 'excel',
            title: 'Báo cáo kiểm vải',
            fileName:'kiemvai.xls'
        });
    }      
});
