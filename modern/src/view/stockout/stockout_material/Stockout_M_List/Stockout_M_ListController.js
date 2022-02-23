Ext.define('GSmartApp.view.stockout.stockout_material.stockout_m_list.Stockout_M_ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_M_ListController',
    init: function() {
        
    },
    control: {
        '#Stockout_M_List': {
            itemsingletap: 'onChildTap'
        },
    },
    onChildTap: function ( dataView, index, target, record, e, eOpts ) {
        // console.log(record);
        var id = record.data.id;
        this.redirectTo("stockout_m/" + id + "/edit");
    }
});
