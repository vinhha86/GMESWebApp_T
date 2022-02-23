Ext.define('GSmartApp.view.stockin.stockin_material.Stockin_M_List_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_List_ViewController',
    isActivate: false,
    init: function () {
        
    },
	control: {
        '#Stockin_M_List': {
            itemsingletap: 'onChildTap'
        },
    },
    onEdit: function(editor, context, eOpts ) {
        // console.log(context);
    },
    onChildTap: function ( dataView, index, target, record, e, eOpts ) {
        // console.log(record);
        var id = record.data.id;
        this.redirectTo("stockin_m_main/" + id + "/edit");
    }
})