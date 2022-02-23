Ext.define('GSmartApp.view.tagencode.Encode_ListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Encode_ListController',
	init: function() {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('EncodeStore');
        store.loadStore(0,0,new Date(), new Date(), 25,1);

        var listidtype = "8,9,11,12";
		var orgStore = viewmodel.getStore('OrgStore');
		orgStore.loadStore_allchildren_byorg(listidtype);

		var userStore = viewmodel.getStore('UserStore');
		userStore.loadUserinOrg();
	},
	control:{
		'#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem':{
            click: 'onloadPage'
        },
        '#Encode_List': {
           itemdblclick: 'onCapNhatdbl'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        }
    },
    onThemMoi: function(){
        this.redirectTo('lstagencode/create');
    },
    onEdit: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lstagencode/" + id + "/edit");
    },
    onDelete: function(grid, rowIndex){
        var me = this.getView();
        
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('stockincode');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.setLoading("Đang xóa");
                    var params = new Object();
                    params.id = id;
                    GSmartApp.Ajax.postJitin('/api/v1/encode/encode_delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        if (success) {
                            me.setLoading(false);
                            var response = Ext.decode(response.responseText);
                            if (response.respcode == 200) {
                                grid.getStore().remove(rec);
                            }
                        }
                })
                }
            }
        });
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("lstagencode/" + id + "/edit");
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('EncodeStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('EncodeStore');

        var limit = me.down('#limitpage').getValue();
        var orgencodeid_link = me.down('#orgencodeid_link').getValue();
        var usercreateid_link = me.down('#usercreateid_link').getValue();
        var timecreatefrom = me.down('#timecreatefrom').getValue();
        var timecreateto = me.down('#timecreateto').getValue();

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (orgencodeid_link == null) {
            stockcode = 0;
        }

        if (usercreateid_link == null) {
            usercreateid_link = 0;
        }

        store.loadStore(orgencodeid_link, usercreateid_link, timecreatefrom, timecreateto, limit, page);
    }
})