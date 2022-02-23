Ext.define('GSmartApp.view.fobprice.FOBPriceViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.FOBPriceViewController',
    init: function(){
        var viewmodel = this.getViewModel();
        var store  =  viewmodel.getStore('PriceStore');
        store.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        }
    },
    ThemMoi_CapNhat: function (params) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var PriceStore = viewModel.getStore('PriceStore');
        GSmartApp.Ajax.post('/api/v1/fobprice/create', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.respcode == 200){
                        if (params.data.id == 0 || params.data.id == null) {                        
                            me.down('#txtThemMoi').reset();
                        }
                    }else{
                        Ext.MessageBox.show({
                            title: "Thông báo",
                            msg: "Thêm mới thất bại: " + response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    PriceStore.loadStore();
                } else {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    PriceStore.loadStore();
                }
                me.setLoading(false);
            })
     },
    onThemMoi: function(){
        var me = this.getView();
        if (me.down('#txtThemMoi').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập tên giá",
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
            data.isdefault = false;

            var params = new Object();
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    checkValidate: function(name){
        var store = this.getViewModel().getStore('PriceStore');
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
                msg: "Không thể xoá giá FOB này (system fixed)",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa giá "' + name + '" ?',
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


        GSmartApp.Ajax.post('/api/v1/fobprice/delete', Ext.JSON.encode(params),
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
                msg: "Không thể thay đổi giá FOB này (system fixed).",
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
    onFobPriceNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('fobPriceNameFilter'),
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
    onBeforecheckchange:function(column, rowIndex, checked, record, e, eOpts){},
    onCheckchange:function(column, rowIndex, checked, record, e, eOpts){
        // console.log(column);
        // console.log(record);
        var viewModel = this.getViewModel();
        var PriceStore = viewModel.getStore('PriceStore');
        if(record.get('id') == 1) { // Giá CMP
            PriceStore.rejectChanges();
            return;
        }

        var params = new Object();
        params.data = record.data;
        this.ThemMoi_CapNhat(params);
    },
    onFobEdit: function (editor, context, eOpts) {
        var m = this;
		var me = this.getView();
		var viewModel = this.getViewModel();
        var PriceStore = viewModel.getStore('PriceStore');


		if (context.field == 'name') {
			if (context.value == "" || context.value == context.originalValue) {
                PriceStore.rejectChanges();
                return;
            }
		}
        if (context.field == 'lost_percent') {
			if (context.value == context.originalValue) {
                PriceStore.rejectChanges();
                return;
            }
		}
        if (context.field == 'price') {
			if (context.value == context.originalValue) {
                PriceStore.rejectChanges();
                return;
            }
		}

        // console.log(context);
        var record = context.record.data;

        var params = new Object();
        params.data = record;

        me.setLoading("Đang lưu dữ liệu");
        this.ThemMoi_CapNhat(params);
    }
})