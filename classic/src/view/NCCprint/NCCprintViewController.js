Ext.define('GSmartApp.view.NCCprint.NCCprintViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.NCCprintViewController',
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
        '#lsintheuView': {
            activate: 'onActivate',
            itemdblclick: 'onCapNhatdbl'
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

        this.redirectTo("lsintheu/create");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("lsintheu/" + id + "/edit");
        console.log("dbclk here");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lsintheu/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa vendor "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Delete(id, rec);
                }
            }
        });
    },
    Delete: function (id, rec) {
        var me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        var params = new Object();
        params.id = id;
        console.log(params);

        GSmartApp.Ajax.post('/api/v1/orgmenu/deleteById', Ext.JSON.encode(params),
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
        store.GetOrgByTypeId(20);
        store.sort('code', 'ASC');
    },
    onNCCprintCodeFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('NCCprintCodeFilter'),
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
    onNCCprintrNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('NCCprintNameFilter'),
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
    }
})