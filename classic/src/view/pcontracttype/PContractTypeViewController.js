Ext.define('GSmartApp.view.pcontracttype.PContractTypeViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractTypeViewController',
    init: function(){
        var viewmodel = this.getViewModel();
        var store  =  viewmodel.getStore('ContractTypeStore');
        store.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        }
    },
    ThemMoi_CapNhat: function (params) {
        var me = this.getView();
        GSmartApp.Ajax.post('/api/v1/pcontracttype/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var store = me.getViewModel().getStore('ContractTypeStore');
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
                msg: "Bạn chưa nhập tên loại hình đơn hàng",
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
            data.orgrootid_link = 0;
            data.name = me.down('#txtThemMoi').getValue();
            data.issystemfix = false;

            var params = new Object();
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
        me.down('#txtThemMoi').focus();
    },
    checkValidate: function(name){
        var store = this.getViewModel().getStore('ContractTypeStore');
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

        var issystemfix = rec.get('issystemfix');
        if(issystemfix){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Không thể xoá loại hình đơn hàng này (system fixed)",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa loại hình đơn hàng "' + name + '" ?',
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


        GSmartApp.Ajax.post('/api/v1/pcontracttype/delete', Ext.JSON.encode(params),
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
    onChange:function(textField, newValue, oldValue, eOpts){
        var viewModel = this.getViewModel();
        viewModel.set('newValue',newValue);
    },
    onFocusLeave:function(textField, event, eOpts){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var newName = viewModel.get('newValue');
        var oldName = viewModel.get('oldValue');
        var issystemfix = viewModel.get('currentRec').issystemfix;

        if(newName==oldName){
            return;
        }

        if(issystemfix){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Không thể thay đổi loại hình đơn hàng này (system fixed).",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            textField.setValue(oldName);
            textField.focus();
            return;
        }

        var check = this.checkValidate(newName);
        if(!check || newName=='') {
            textField.setValue(oldName);
            textField.focus();
            return;
        }

        var data = new Object();
        data = viewModel.get('currentRec');
        data.name=newName;

        var params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.ThemMoi_CapNhat(params);

        // console.log(viewModel.get('currentName'));
        // console.log(viewModel.get('currentRec').id);
    },
    onRowClick:function(row, record, element, rowIndex, e, eOpts){
        // console.log(record); 
        var viewModel = this.getViewModel();
        viewModel.set('currentRec',record.data);
        viewModel.set('oldValue',record.data.name);
        viewModel.set('newValue',record.data.name);
    },

    isButtonDisabled:function (grid, rowIndex, colIndex, items, record) {
        return record.data.issystemfix;
    },
    onPcontracttypeNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('pcontracttypeNameFilter'),
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