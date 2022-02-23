Ext.define('GSmartApp.view.tagencode.Encode_Porder_List_Controller', {
    extend: 'Ext.app.ViewController',
	alias: 'controller.Encode_Porder_List_Controller',
	init: function(){
		var viewModel = this.getViewModel();
        var store = viewModel.getStore('Porder_Encode_Store');
        store.loadStore('',0,new Date(), new Date(), 25, 1);

        var userStore = viewModel.getStore('UserStore');
		userStore.loadUserinOrg();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
        '#Encode_Porder_List': {
            itemdblclick: 'onCapNhatdbl'
        }
    },
    onThemMoi: function(){
        this.redirectTo('porder_encode/create');
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('Porder_Encode_Store');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function(){
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('Porder_Encode_Store');

        var limit = me.down('#limitpage').getValue();
        var pordercode = me.down('#pordercode').getValue();
        var usercreateid_link = me.down('#usercreateid_link').getValue();
        var encodedatefrom = me.down('#encodedatefrom').getValue();
        var encodedateto = me.down('#encodedateto').getValue();

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (pordercode == null) {
            pordercode = "";
        }

        if (usercreateid_link == null) {
            usercreateid_link = 0;
        }

        store.loadStore(pordercode, usercreateid_link, encodedatefrom, encodedateto, limit, page);
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("porder_encode/" + id + "/edit");
    },
    onEdit: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("porder_encode/" + id + "/edit");
    }
});
