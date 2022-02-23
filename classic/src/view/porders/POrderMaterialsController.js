Ext.define('GSmartApp.view.porders.POrderMaterialsController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pordermaterials',
    onSearchOrderTap: function() {
        var txt_ordercode = this.lookupReference('txt_ordercode');
        var store_stockout_d_balance = Ext.data.StoreManager.lookup('store_stockout_d_balance');
        if (store_stockout_d_balance){
            store_stockout_d_balance.loadByOrdercode(txt_ordercode.getValue(),1);
        }    
    },
    renderCell: function(value, record) {
        if (null == value) value = 0;
        return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    },  

});