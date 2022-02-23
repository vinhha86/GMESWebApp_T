Ext.define('GSmartApp.view.dm_shop.DanhSachShopViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.DanhSachShopViewController',

    init: function (view) {
        var viewmodel = view.getViewModel()
        var store = viewmodel.getStore('OrgStore');
        store.GetOrgByTypeId(4);
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#DanhSachShopView': {
            itemdblclick: 'onCapNhatdbl'
        },
        
    },

    onThemMoi: function (m, record) {
        this.redirectTo("dm_shop/create");
    },

    onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel()
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.data.id;
        var name = rec.data.name;

        var params = new Object();
        params.id = id;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa cửa hàng "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/org/delete', Ext.JSON.encode(params),
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

                                var store = viewmodel.getStore('OrgStore');
                                store.GetOrgByTypeId(4);
                            } else {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onCapNhat:function(grid,rowIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.data.id;
      
        this.redirectTo("dm_shop/" + id + "/edit");
    },
    onCapNhatdbl:function(m,record){
        var id = record.data.id;
       
        this.redirectTo("dm_shop/" + id + "/edit");
    },
    onShopCodeFilter:function(){
     
        filterField = this.lookupReference('shopCodeFilter');
        filters = this.getView().store.getFilters();
        
        if(filterField.value){
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
     

    },
    onShopNameFilter:function(){
        filterField = this.lookupReference('shopNameFilter');
        filters = this.getView().store.getFilters();

        if(filterField.value){
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    }

})