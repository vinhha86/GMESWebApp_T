Ext.define('GSmartApp.view.stock.stockcreate.StockFloorController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockFloorController',
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
        '#StockFloor': {
            afterrender: 'onAfterrender'
        }
    },
    onAfterrender: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var isTxtFieldSpaceNameDisable = viewModel.get('isTxtFieldSpaceNameDisable');
        if(isTxtFieldSpaceNameDisable){
            me.down('#txtFieldFloorId').focus();
        }else{
            me.down('#txtFieldSpaceName').focus();
        }
    },
    onloadPage: function(){
        var viewModel = this.getViewModel();
        //
        var ListKhoSpaceStore = viewModel.getStore('ListKhoSpaceStore');
        ListKhoSpaceStore.loadOrgByTypeKho();
        //
        var record = viewModel.get('record');
        // edit
        var isEdit = viewModel.get('isEdit');
        if(record.get('type')  == 3){ // thêm tầng
            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
            viewModel.set('spaceObj.rowid_link', record.get('id'));
            viewModel.set('spaceObj.isCreateNew', true);
            //
            viewModel.set('isTxtFieldSpaceNameDisable', false);
        }else if(record.get('type') == 4){ // thêm khoang
            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
            viewModel.set('spaceObj.rowid_link', record.get('rowid_link'));
            viewModel.set('spaceObj.spacename', record.get('spacename'));
            viewModel.set('spaceObj.isCreateNew', true);
            //
            viewModel.set('isTxtFieldSpaceNameDisable', true);
        }else if(record.get('type') == 5){ // sửa khoang
            viewModel.set('spaceObj.orgid_link', record.get('orgid_link'));
            viewModel.set('spaceObj.spaceepc', record.get('spaceepc'));
            viewModel.set('spaceObj.spaceepc_old', record.get('spaceepc'));
            viewModel.set('spaceObj.spacename', record.get('spacename'));
            viewModel.set('spaceObj.spacename_old', record.get('spacename'));
            viewModel.set('spaceObj.floorid', record.get('floorid'));
            viewModel.set('spaceObj.floorid_old', record.get('floorid'));
            viewModel.set('spaceObj.rowid_link', record.get('rowid_link'));
            viewModel.set('spaceObj.isCreateNew', false);
            //
            viewModel.set('isTxtFieldSpaceNameDisable', true);
        }
    },
    emptyForm: function(){
        var viewModel = this.getViewModel();
        viewModel.set('spaceObj', null);
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
            spaceObj.spacename == null || spaceObj.spacename == '' || 
            spaceObj.floorid == null || spaceObj.floorid == ''
            ){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Cần phải điền đầy đủ thông tin',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            if(spaceObj.floorid == null || spaceObj.floorid) me.down('#txtFieldFloorId').focus();
            if(spaceObj.spacename == null || spaceObj.spacename) me.down('#txtFieldSpaceName').focus();
            return;
        }

        var params = new Object();
        params.orgid_link = spaceObj.orgid_link;
        params.spaceepc = spaceObj.spaceepc;
        params.spacename = spaceObj.spacename;
        params.floorid = spaceObj.floorid;
        params.spaceepc_old = spaceObj.spaceepc_old;
        params.spacename_old = spaceObj.spacename_old;
        params.floorid_old = spaceObj.floorid_old;
        params.rowid_link = spaceObj.rowid_link;
        params.isCreateNew = spaceObj.isCreateNew;

        me.setLoading("Đang lưu dữ liệu");
        GSmartApp.Ajax.postJitin('/api/v1/stock/create_floor', Ext.JSON.encode(params),
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