Ext.define('GSmartApp.view.devicein.StockInDeviceMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockInDeviceMainController',
    isActivate: false,
    init: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();
        
        var listidtype = "14";
        // var orgtostore = this.getViewModel().getStore('OrgToStore');
        // orgtostore.loadStore_allchildren_byorg(listidtype);

        var OrgFromStore = viewmodel.getStore('OrgFromStore');
        OrgFromStore.loadStore_byRoot(listidtype);

        var DeviceInTypeStore = viewmodel.getStore('DeviceInTypeStore');
        DeviceInTypeStore.loadStore();

        var DeviceInStore = viewmodel.getStore('DeviceInStore');
        DeviceInStore.sort('devicein_date','DESC');

        // var StockinTypeStore = viewmodel.getStore('StockinTypeStore');
        // StockinTypeStore.loadStore();

        // var store = viewmodel.getStore('StockinStore');
        // store.loadStore(0, null, new Date(), 0, 0, 25, 1);
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            }
        }
    },    
    control: {
        '#StockinDevice_List': {
            itemdblclick: 'onCapNhatdbl'
        },        
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnTimKiem': {
            click: 'onSearch'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        }
    },
    onActivate: function () {
        this.onSearch();
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('StockinStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function () {
        console.log('Searching');
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('DeviceInStore');

        var limit = me.down('#limitpage').getValue();
        var orgid_from_link = me.down('#OrgFromStore').getValue();
        var devicein_date_from = me.down('#devicein_date_from').getValue();
        var devicein_date_to = me.down('#devicein_date_to').getValue();
        var deviceintypeid_link = me.down('#deviceintypeid_link').getValue();

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }
        // store.loadStore(devicein_date_from, devicein_date_to, orgid_from_link, deviceintypeid_link, status, limit, page);
        store.loadStore(devicein_date_from, devicein_date_to, orgid_from_link, deviceintypeid_link, limit, page);
        
    },
    onThemMoi: function(){
        this.redirectTo('stockin_device/create');
    },
    onCapNhatdbl: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("stockin_device/" + id + "/edit");
    },
    onEdit: function(grid, rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockin_device/" + id + "/edit");
    },
    onDelete: function(grid, rowIndex){
        var me = this.getView();
        
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('devicein_code');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa phiếu nhập "' + name + '" ?',
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
                    GSmartApp.Ajax.post('/api/v1/devicein/delete', Ext.JSON.encode(params),
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
    }
})