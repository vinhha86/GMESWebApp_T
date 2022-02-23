Ext.define('GSmartApp.view.stock.stockcreate.StockRowController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockRowController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnLuuRow': {
            click: 'onLuu'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#StockRow': {
            afterrender: 'onAfterrender'
        }
    },
    onAfterrender: function(){
        var me = this.getView();
        me.down('#txtFieldCode').focus();
    },
    onloadPage: function(){
        var viewModel = this.getViewModel();
        //
        var ListKhoRowStore = viewModel.getStore('ListKhoRowStore');
        ListKhoRowStore.loadOrgByTypeKho();
        //
        var record = viewModel.get('record');
        // edit
        var isEdit = viewModel.get('isEdit');
        if(isEdit){ // record: day
            viewModel.set('rowObj.orgid_link', record.get('orgid_link'));
            viewModel.set('rowObj.code', record.get('name'));
            viewModel.set('rowObj.id', record.get('id'));
        }else{ // record: kho
            viewModel.set('rowObj.orgid_link', record.get('id'));
        }
    },
    emptyForm: function(){
        var viewModel = this.getViewModel();
        viewModel.set('rowObj', null);
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onLuu: function () {
        var m = this;
        var me = this.getView();

        var viewModel = this.getViewModel();
        var rowObj = viewModel.get('rowObj');
        if(
            rowObj.orgid_link == null || rowObj.orgid_link == '' || 
            rowObj.code == null || rowObj.code == ''
            ){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần phải điền đầy đủ thông tin',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtFieldCode').focus();
            return;
        }

        rowObj.code = rowObj.code.toUpperCase();
        var params = new Object();
        params.data = rowObj;

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/create_row', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        m.fireEvent('Luu', response);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Lưu thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
})