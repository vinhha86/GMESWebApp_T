Ext.define('GSmartApp.view.packingtype.PackingTypeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PackingTypeController',
    init: function(){
        let viewmodel = this.getViewModel();
        let store  =  viewmodel.getStore('PackingStore');
        store.loadStore();
        store.sort('name', 'ASC');
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        }
    },
    ThemMoi_CapNhat: function (params) {
        // console.log('ThemMoi_CapNhat OK');
        // console.log(params);
        let me = this.getView();
        GSmartApp.Ajax.post('/api/v1/packingtype/createPackingType', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let store = me.getViewModel().getStore('PackingStore');
                    if (params.data.id == 0 || params.data.id == null) {                        
                        me.down('#txtName').reset();
                        me.down('#txtCode').reset();
                        me.down('#txtCode').focus();
                    }
                    store.loadStore();
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
    onThemMoi: function(){
        let me = this.getView();
        if (me.down('#txtCode').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập mã p/thức đóng gói",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtCode').focus();
        }else if (me.down('#txtName').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập tên p/thức đóng gói",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtName').focus();
        }else {
            let check = this.checkValidate(me.down('#txtName').getValue());
            if(!check) {
                me.down('#txtName').focus();
                return;
            }

            let data = new Object();
            data.id = null;
            data.name = me.down('#txtName').getValue();
            data.code = me.down('#txtCode').getValue();

            let params = new Object();
            params.data = data;

            me.setLoading("Đang lưu dữ liệu");
            this.ThemMoi_CapNhat(params);
        }
    },
    checkValidate: function(name){
        let store = this.getViewModel().getStore('PackingStore');
        for(let i=0; i< store.data.length;i++){
            let data = store.data.items[i].data;
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
        let me = this;
        let rec = grid.getStore().getAt(rowIndex);
        let id = rec.get('id');
        let name = rec.get('name');

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa p/thức đóng gói "' + name + '" ?',
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
        let me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        let params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/packingtype/deletePackingType', Ext.JSON.encode(params),
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

                    let store = me.getStore();
                    store.remove(rec);
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
                me.setLoading(false);
            })
    },
    onChangeName:function(textField, newValue, oldValue, eOpts){
        let viewModel = this.getViewModel();
        viewModel.set('newName',newValue);
    },
    onFocusLeaveName:function(textField, event, eOpts){
        let me = this.getView();
        let viewModel = this.getViewModel();
        let newName = viewModel.get('newName');
        let oldName = viewModel.get('oldName');

        if(newName==oldName){
            return;
        }

        let check = this.checkValidate(newName);
        if(!check || newName=='') {
            textField.setValue(oldName);
            textField.focus();
            return;
        }

        let data = new Object();
        data = viewModel.get('currentRec');
        data.name=newName;

        let params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.ThemMoi_CapNhat(params);

        // console.log(viewModel.get('currentName'));
        // console.log(viewModel.get('currentRec').id);
    },
    onChangeCode:function(textField, newValue, oldValue, eOpts){
        let viewModel = this.getViewModel();
        viewModel.set('newCode',newValue);
    },
    onFocusLeaveCode:function(textField, event, eOpts){
        let me = this.getView();
        let viewModel = this.getViewModel();
        let newCode = viewModel.get('newCode');
        let oldCode = viewModel.get('oldCode');

        if(newCode==oldCode){
            return;
        }

        let data = new Object();
        data = viewModel.get('currentRec');
        data.code=newCode;

        let params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.ThemMoi_CapNhat(params);

        // console.log(viewModel.get('currentName'));
        // console.log(viewModel.get('currentRec').id);
    },
    onRowClick:function(row, record, element, rowIndex, e, eOpts){
        // console.log(record); 
        let viewModel = this.getViewModel();
        viewModel.set('currentRec',record.data);
        viewModel.set('oldName',record.data.name);
        viewModel.set('newName',record.data.name);
        viewModel.set('oldCode',record.data.code);
        viewModel.set('newCode',record.data.code);
    },
    onPackingTypeCodeFilterKeyup:function(){
        let filterField = this.lookupReference('packingTypeCodeFilter'),
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
    onPackingTypeNameFilterKeyup:function(){
        let filterField = this.lookupReference('packingTypeNameFilter'),
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