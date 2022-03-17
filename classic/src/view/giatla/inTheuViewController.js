Ext.define('GSmartApp.view.giatla.giatLaViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.giatLaViewController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#delete': {
            click: 'onXoa'
        },
        '#edit': {
            click: 'onCapNhat'
        },
        '#lsgiatla': {
            activate: 'onActivate',
            itemdblclick: 'onCapNhatdbl',
        }
    },
    onActivate: function () {
        var me = this;
        if (me.isActivate) {
            this.onloadPage();
        }
        me.isActivate = true;
        // var viewmodel = this.getViewModel();
        // var store = viewmodel.getStore('PortStore');
        // store.loadStore();
    },
    onThemMoi: function (m, record) {
        var me = this.getView();
        var Id = 0;

        this.redirectTo("lsgiatla/create");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("lsgiatla/" + id + "/edit");
        console.log("dbclk here");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lsgiatla/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');

        // return;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa giặt là "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    // me.Xoa(id, rec);
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

        GSmartApp.Ajax.post('/api/v1/org/deleteOrg', Ext.JSON.encode(params),

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
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('OrgStore');
        var storeColor = viewmodel.getStore('ColorStore');
        storeColor.sort('code', 'ASC');
        store.GetOrgByTypeId(23);
        store.sort('code', 'ASC');
        storeColor.loadStore();
    },
    onVendorCodeFilterKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('vendorCodeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
    onVendorNameFilterKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('vendorNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    ThemMoi_CapNhat: function (params) {
        // console.log('ThemMoi_CapNhat OK');
        // console.log(params);
        let me = this.getView();
        GSmartApp.Ajax.post('/api/v1/orgmenu/createOrg', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let store = me.getViewModel().getStore('OrgStore');
                    if (params.data.id == 0 || params.data.id == null) {
                        me.down('#txtName').reset();
                        me.down('#txtCode').reset();
                        me.down('#txtName').focus();
                    }
                    store.load();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Lưu thất bại",
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
        var me = this.getView()
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('OrgStore')
        var items = store.data.items
        
        if(context.value == context.originalValue){
            return;
        }
        if(context.field == 'name') {
            var arr = -1;
            items.forEach(function(element, index, array) {
                if(element.data.name == context.value && index != context.rowIdx) {
                    arr = index;
                }
            })
            if(arr != -1) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Dữ liệu đã tồn tại ở dòng " + (arr + 1),
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                items[context.rowIdx].set('name', context.originalValue);
                return;
            }
        }
               
        let data = new Object();
        data = context.record.data
        data[context.field] = context.value;

    
        let params = new Object();
        params.data = data;
        
        me.setLoading("Dang luu du lieu");
        this.ThemMoi_CapNhat(params);  
    },
    rendererColor: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var store = this.getViewModel().getStore('ColorStore')
        var items = store.data.items;
        var result = '';
        items.forEach(function(element, index,array) {
            if(element.get('id') == value) {
                result = element.get('name')
            }
        })
        return result;
    },
})