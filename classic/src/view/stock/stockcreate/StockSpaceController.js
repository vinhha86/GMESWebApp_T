Ext.define('GSmartApp.view.stock.stockcreate.StockSpaceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockSpaceController',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnLuuSpace': {
            click: 'onLuu'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#StockSpace': {
            afterrender: 'onAfterrender'
        }
    },
    onAfterrender: function(){
        var me = this.getView();
        me.down('#txtFieldSpacename').focus();
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
        if(isEdit){ // record: tầng
            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
            viewModel.set('spaceObj.spacename', record.get('spacename'));
            viewModel.set('spaceObj.spacename_old', record.get('spacename'));
            viewModel.set('spaceObj.rowid_link', record.get('rowid_link'));
            viewModel.set('spaceObj.isCreateNew', false);
        }else{ // record: day
            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
            viewModel.set('spaceObj.rowid_link', record.get('id'));
            viewModel.set('spaceObj.isCreateNew', true);
        }
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onLuu: function () {
        var m = this;
        var me = this.getView();

        var viewModel = this.getViewModel();
        var spaceObj = viewModel.get('spaceObj');
        if(
            spaceObj.orgid_link == null || spaceObj.orgid_link == '' || 
            spaceObj.spacename == null || spaceObj.spacename == ''
            ){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần phải điền đầy đủ thông tin',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtFieldSpacename').focus();
            return;
        }

        if(spaceObj.spacename == spaceObj.spacename_old){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Lưu thành công',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            m.fireEvent('Thoat');
            return;
        }

        var params = new Object();
        params.orgid_link = spaceObj.orgid_link;
        params.spacename = spaceObj.spacename;
        params.spacename_old = spaceObj.spacename_old;
        params.rowid_link = spaceObj.rowid_link;
        params.isCreateNew = spaceObj.isCreateNew;

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/create_space', Ext.JSON.encode(params),
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
                        m.fireEvent('Luu', response, spaceObj);
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