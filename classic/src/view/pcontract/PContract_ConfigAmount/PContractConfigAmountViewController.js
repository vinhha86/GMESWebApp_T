Ext.define('GSmartApp.view.pcontract.PContractConfigAmountViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractConfigAmountViewController',
    isActivate: false,
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#btnXoa': {
            click: 'onXoa'
        },
        '#PContractConfigAmountView': {
            itemclick: 'onItemClick'
        }
    },
    onThemMoi: function(){
        let viewModel = this.getViewModel();
        let store = viewModel.getStore('PContractConfigAmountStore');
        let items = store.data.items;
        let amountfrom = 0;

        for(let i = 0; i<items.length; i++){
            if(amountfrom <= items[i].data.amount_to) amountfrom=items[i].data.amount_to+1;
        }

        let form = Ext.create('Ext.window.Window', {
            // height: 150,
            width: 700,
            closable: true,
            title: 'Thêm mới cấu hình số lượng',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'PContractConfigAmountFormView',
                amountFrom: amountfrom
            }]
        });
        form.show();
    },
    onloadPage: function () {
        let viewmodel = this.getViewModel();
        let store = viewmodel.getStore('PContractConfigAmountStore');
        store.loadStore();
    },
    onXoa: function (grid, rowIndex, colIndex) {
        let me = this;
        let rec = grid.getStore().getAt(rowIndex);
        let id = rec.get('id');
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id);
                }
            }
        });
    },
    Xoa: function (id) {
        let me = this.getView();
        me.setLoading("Đang xóa dữ liệu");
        let params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/configamount/delete', Ext.JSON.encode(params),
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
                    store.load();
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
    onItemClick: function(thisItem, record, item, index, e, eOpts){
        let viewModel = this.getViewModel();
        viewModel.set('data', record.data);
        viewModel.set('amount_from_old', record.data.amount_from);
        viewModel.set('amount_to_old', record.data.amount_to);
        viewModel.set('amount_plus_old', record.data.amount_plus);
        viewModel.set('type_old', record.data.type);

        // console.log(record.data);
    },
    saveData: function() {
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        let params = new Object();
        params.data = data;

        params.msgtype = "CONFIG_AMOUNT_SAVE";
        params.message = "Lưu cấu hình số lượng";

        GSmartApp.Ajax.post('/api/v1/configamount/save', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        mainView = Ext.getCmp('PContractConfigAmountView');
                        mainView.getStore().load();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
        // console.log(data);
    },
    onAmountFromFocusLeave: function(thisField, event, eOpts) {
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        if(data.amount_from == viewModel.get('amount_from_old')){
            return;
        }else if(data.amount_from == null || data.amount_from == 0 || data.amount_from == ''){
            thisField.setValue(viewModel.get('amount_from_old'));
            // console.log('gia tri bang null || 0');
            return;
        }else{
            if(data.amount_from >= data.amount_to){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Số lượng từ phải nhỏ hơn số lượng đến',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                thisField.setValue(viewModel.get('amount_from_old'));
                return;
            }else if(data.amount_from <= 0){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Số lượng từ phải lớn hơn 0',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                thisField.setValue(viewModel.get('amount_from_old'));
                return;
            }else {
                // Luu
                this.saveData();
            }
            // console.log('ko trung nhau');
        }
        // console.log(data.amount_from);
        // console.log(viewModel.get('amount_from_old'));
    },
    onAmountFromChange: function(thisField, newValue, oldValue, eOpts ){
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.amount_from = newValue;
        // console.log(oldValue);
        // console.log(newValue);
    },
    onAmountToFocusLeave: function(thisField, event, eOpts) {
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        if(data.amount_to == viewModel.get('amount_to_old')){
            return;
        }else if(data.amount_to == null || data.amount_to == 0 || data.amount_to == ''){
            thisField.setValue(viewModel.get('amount_to_old'));
            // console.log('gia tri bang null || 0');
            return;
        }else{
            if(data.amount_from >= data.amount_to){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Số lượng đến phải lớn hơn số lượng từ',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                thisField.setValue(viewModel.get('amount_to_old'));
                return;
            }else if(data.amount_to <= 0){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Số lượng đến phải lớn hơn 0',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                thisField.setValue(viewModel.get('amount_to_old'));
                return;
            }else {
                // Luu
                this.saveData();
            }
            // console.log('ko trung nhau');
        }
        // console.log(data.amount_from);
        // console.log(viewModel.get('amount_from_old'));
    },
    onAmountToChange: function(thisField, newValue, oldValue, eOpts ){
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.amount_to = newValue;
        // console.log(oldValue);
        // console.log(newValue);
    },
    onAmountPlusFocusLeave: function(thisField, event, eOpts) {
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        if(data.amount_plus == viewModel.get('amount_plus_old')){
            return;
        }else if(data.amount_plus == null ||  data.amount_plus === ''){
            thisField.setValue(viewModel.get('amount_plus_old'));
            return;
        }else{
            if(data.amount_plus < 0){
                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: 'Số lượng tăng phải lớn hơn hoặc bằng 0',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
                thisField.setValue(viewModel.get('amount_plus_old'));
                return;
            }else {
                // Luu
                this.saveData();
            }
            // console.log('ko trung nhau');
        }
        // console.log(data.amount_from);
        // console.log(viewModel.get('amount_from_old'));
    },
    onAmountPlusChange: function(thisField, newValue, oldValue, eOpts ){
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.amount_plus = newValue;
        // console.log(oldValue);
        // console.log(newValue);
    },
    onTypeFocusLeave: function(thisField, event, eOpts) {
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        if(data.type == viewModel.get('type_old')){
            return;
        }else{
            this.saveData();
        }
        // console.log(data.amount_from);
        // console.log(viewModel.get('amount_from_old'));
    },
    onTypeChange: function(thisField, newValue, oldValue, eOpts ){
        let viewModel = this.getViewModel();
        let data = viewModel.get('data');
        data.type = newValue;
        // console.log(oldValue);
        // console.log(newValue);
    }

})