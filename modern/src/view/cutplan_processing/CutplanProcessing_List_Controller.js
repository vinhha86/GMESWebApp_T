Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_List_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CutplanProcessing_List_Controller',
    isActivate: false,
    init: function () {
        
    },
	control: {
        '#CutplanProcessing_List': {
            itemsingletap: 'onChildTap'
        },
    },
    onEdit: function(editor, context, eOpts ) {
        // console.log(context);
    },
    onChildTap: function ( dataView, index, target, record, e, eOpts ) {
        // console.log(record);
        var id = record.data.id;
        this.redirectTo("cutplan_processing/" + id + "/edit");
    }
})