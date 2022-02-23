Ext.define('GSmartApp.view.laborlevel.LaborLevelController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.LaborLevelController',
    init: function(){
        let viewmodel = this.getViewModel();
        let store  =  viewmodel.getStore('LaborLevelStore');
        store.loadStore();
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
        GSmartApp.Ajax.post('/api/v1/laborlevel/createLaborLevel', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let store = me.getViewModel().getStore('LaborLevelStore');
                    if (params.data.id == 0 || params.data.id == null) {                        
                        me.down('#txtName').reset();
                        me.down('#txtCode').reset();
                        me.down('#txtName').focus();
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
        if (me.down('#txtName').getValue() == "") {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa nhập tên bậc thợ",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtName').focus();
        }
        else {
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
        let store = this.getViewModel().getStore('LaborLevelStore');
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
            msg: 'Bạn có chắc chắn xóa bậc thợ "' + name + '" ?',
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

        GSmartApp.Ajax.post('/api/v1/laborlevel/deleteLaborLevel', Ext.JSON.encode(params),
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
    onChangeComment:function(textField, newValue, oldValue, eOpts){
        let viewModel = this.getViewModel();
        viewModel.set('newComment',newValue);
    },
    onFocusLeaveComment:function(textField, event, eOpts){
        let me = this.getView();
        let viewModel = this.getViewModel();
        let newComment = viewModel.get('newComment');
        let oldComment = viewModel.get('oldComment');

        if(newComment==oldComment){
            return;
        }

        let data = new Object();
        data = viewModel.get('currentRec');
        data.comment=newComment;

        let params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.ThemMoi_CapNhat(params);

        // console.log(viewModel.get('currentName'));
        // console.log(viewModel.get('currentRec').id);
    },
    onChangeRate: function(textField, newValue, oldValue, eOpts){
        let viewModel = this.getViewModel();
        viewModel.set('newRate',newValue);
    },
    onFocusLeaveRate: function(textField, event, eOpts){
        let me = this.getView();
        let viewModel = this.getViewModel();
        let newRate = viewModel.get('newRate');
        let oldRate = viewModel.get('oldRate');

        if(newRate==oldRate){
            return;
        }

        let data = new Object();
        data = viewModel.get('currentRec');
        data.rate=newRate;

        let params = new Object();
        params.data = data;

        me.setLoading("Đang lưu dữ liệu");
        this.ThemMoi_CapNhat(params);
    },
    onRowClick:function(row, record, element, rowIndex, e, eOpts){
        // console.log(record); 
        let viewModel = this.getViewModel();
        viewModel.set('currentRec',record.data);
        viewModel.set('oldName',record.data.name);
        viewModel.set('newName',record.data.name);
        viewModel.set('oldCode',record.data.code);
        viewModel.set('newCode',record.data.code);
        viewModel.set('oldComment',record.data.comment);
        viewModel.set('newComment',record.data.comment);
        viewModel.set('oldRate',record.data.rate);
        viewModel.set('newRate',record.data.rate);
    },
    onLaborLevelCodeFilterKeyup:function(){
        let filterField = this.lookupReference('laborLevelCodeFilter'),
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
    onLaborLevelNameFilterKeyup:function(){
        let filterField = this.lookupReference('laborLevelNameFilter'),
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