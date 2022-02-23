Ext.define('GSmartApp.view.handover.HandoverShareView.HandoverListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverListController',
    init: function() {
        
    },
    control: {
        '#handover_cut_tolinelist': {
            childtap: 'onChildTap'
        },
        '#handover_line_fromcutlist': {
            childtap: 'onChildTap'
        },
        '#handover_line_topacklist': {
            childtap: 'onChildTap'
        },
        '#handover_pack_fromlinelist': {
            childtap: 'onChildTap'
        },
        '#handover_cut_toprintlist': {
            childtap: 'onChildTap'
        },
        '#handover_line_toprintlist': {
            childtap: 'onChildTap'
        },
    },
    onEdit: function(editor, context, eOpts ) {
        console.log(context);
    },
    onChildTap: function ( dataView, location, eOpts ) {
        // console.log('location:');
        // console.log(location.record.data);

        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var id = location.record.get('id');
        this.redirectTo(viewId + "/" + id + "/edit");
    }
});
