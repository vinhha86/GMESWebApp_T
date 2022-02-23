Ext.define('GSmartApp.view.shipmode.ShipModeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ShipModeController',
    init: function(){
        var viewmodel = this.getViewModel();
        var store  =  viewmodel.getStore('ShipModeStore');
        store.loadStore();
        store.getSorters().add('name');
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        }
    },
    ThemMoi_CapNhat: function (params) {
        var me = this.getView();
        GSmartApp.Ajax.post('/api/v1/shipmode/createShipMode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var store = me.getViewModel().getStore('ShipModeStore');
                    if (params.data.id == 0 || params.data.id == null) {                        
                        me.down('#txtThemMoi').reset();
                    }
                    store.loadStore();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
     },
    onThemMoi: function(){
        var me = this.getView();
        if (me.down('#txtThemMoi').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập tên phương thức vận chuyển",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
        }
        else {
            var check = this.checkValidate(me.down('#txtThemMoi').getValue());
            if(!check) {
                me.down('#txtThemMoi').focus();
                return;
            }

            var data = new Object();
            data.id = null;
            data.name = me.down('#txtThemMoi').getValue();
            // data.issystemfix = false;

            var params = new Object();
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    checkValidate: function(name){
        var store = this.getViewModel().getStore('ShipModeStore');
        for(var i=0; i< store.data.length;i++){
            var data = store.data.items[i].data;
            if(data.name == name){
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Dữ liệu đã tồn tại ở dòng "+ (i+1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });

                return false;
            }
        }
        return true;
    },
    onXoa: function(grid, rowIndex, colIndex){
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id, rec);
                }
            }
        });
    },
    Xoa: function (id, rec) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;


        GSmartApp.Ajax.post('/api/v1/shipmode/deleteShipMode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Xóa thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });

                    var store = me.getStore();
                    store.remove(rec);
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xóa thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('ShipModeStore');

        if(context.value == '' || context.value == context.originalValue){
            store.rejectChanges();
            return;
        }

        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/shipmode/createShipMode', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        store.rejectChanges();
                    }
                    else {
                        store.commitChanges();
                    }
                }
            })
    }
    // onFobPriceNameFilterKeyup:function(){
    //     var grid = this.getView(),
    //         // Access the field using its "reference" property name.
    //         filterField = this.lookupReference('fobPriceNameFilter'),
    //         filters = this.getView().store.getFilters();

    //     if (filterField.value) {
    //         this.nameFilter = filters.add({
    //             id: 'nameFilter',
    //             property: 'name',
    //             value: filterField.value,
    //             anyMatch: true,
    //             caseSensitive: false
    //         });
    //     }
    //     else if (this.nameFilter) {
    //         filters.remove(this.nameFilter);
    //         this.nameFilter = null;
    //     }
    // }
})