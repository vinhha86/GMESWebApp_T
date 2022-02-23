Ext.define('GSmartApp.view.stockout.StockoutForCheckPklistSelectWindow', {
    extend: 'Ext.window.Window',
    xtype: 'stockoutforcheckpklistwindow',
    // requires: [
    //     'GSmartApp.view.sku.SkuSearch'
    // ],
    controller: 'stockoutforcheckpklistselect',
    viewModel: 'stockoutforcheckpklistselect',
    title: 'Chọn cây vải',
    width: 800,
    height: 400,
    margin:10,
    layout: 'fit',
    resizable: true,
    modal: true,
    items:[{
        title:'', 
        xtype: 'stockoutforcheckpklistselect',
        id: 'grid_stockoutforcheckpklistselect'
    }],
    listeners: {
        activate: 'onActivate'
    }
});
