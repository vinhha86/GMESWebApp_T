Ext.define('GSmartApp.view.handover.HandoverDetailPorderSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverDetailPorderSearchController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var pordercode = viewModel.get('pordercode');
        var granttoorgid_link = viewModel.get('granttoorgid_link');
        var POrder_ListStore = viewModel.get('POrder_ListStore');
        POrder_ListStore.loadStoreByPordercode_Async(pordercode, granttoorgid_link);
        POrder_ListStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    // console.log(POrder_ListStore.getData());
                    var items = POrder_ListStore.getData().items;
                    if(items.length == 0){
                        m.fireEvent('found0Porder');
                    }
                    if(items.length == 1){
                        m.fireEvent('found1Porder', records);
                    }
				}
			}
        });
    },
    listen: {

    },
    control: {
        '#HandoverDetailPorderSearch': {
            childtap: 'onChildtap'
        },
    },
    onChildtap: function ( list, location, eOpts ) {
        var record = location.record;
        this.fireEvent('selectPOrder', record);
    }
})