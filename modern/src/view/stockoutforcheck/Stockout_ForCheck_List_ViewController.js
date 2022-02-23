Ext.define('GSmartApp.view.stockoutforcheck.Stockout_ForCheck_List_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_ForCheck_List_ViewController',
    isActivate: false,
    init: function () {
        
    },
	control: {
        '#Stockout_ForCheck_List': {
            itemsingletap: 'onChildTap'
        },
    },
    onEdit: function(editor, context, eOpts ) {
        // console.log(context);
    },
    onChildTap: function ( dataView, index, target, record, e, eOpts ) {
        // console.log(record);
        var viewModel = this.getViewModel();
        var id = record.data.id;
        var is_stockout_m_view = viewModel.get('is_stockout_m_view');
        if(is_stockout_m_view){
            var tempObj = new Object();
            tempObj.is_stockout_m_view = true;
            GSmartApp.util.State.set('tempObj', tempObj);
        }
        this.redirectTo("stockoutforcheckmain/" + id + "/edit");
    }
})