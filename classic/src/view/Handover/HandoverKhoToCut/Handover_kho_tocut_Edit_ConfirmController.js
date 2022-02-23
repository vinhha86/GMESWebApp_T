Ext.define('GSmartApp.view.handover.Handover_kho_tocut_Edit_ConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Handover_kho_tocut_Edit_ConfirmController',
    isActivate: false,
    init: function () {
    },
    control: {
        '#btnLuu': {
            click: 'onLoginClick'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onLoginClick: function() {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var username = viewModel.get('username');
        var password = viewModel.get('password');
        return new Ext.Promise(function (resolve, reject) {
            Ext.Ajax.request({
                url :  config.getBack() + 'login',
                method:'POST',
                params: JSON.stringify({
                    username: username,
                    password: password
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                success: function(result, opts) {
                    var sessionData = Ext.decode(result.responseText);
                    console.log('Success login user:', sessionData);
                    // console.log(sessionData.user);
                    m.onConfirmStockout(sessionData.user);
                    //
                    // Ext.Msg.show({
                    //     title: 'Thông báo',
                    //     msg: 'Xác nhận thành công',
                    //     buttons: Ext.MessageBox.YES,
                    //     buttonText: {
                    //         yes: 'Đóng',
                    //     }
                    // });
                },
                failure: function(err, opts) {
                    console.log('Failure login user', err);
                    //

                    //
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Xác nhận thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });
        });
    },
    onConfirmStockout: function(userid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockoutId = viewModel.get('stockoutId');
        var receiver_userid_link = userid_link;
        m.confirmStockout(stockoutId, receiver_userid_link);
    },
    confirmStockout: function(stockoutId, receiver_userid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.stockoutId = stockoutId;
        params.approver_userid_link = receiver_userid_link;

        this.fireEvent('Confirmed', receiver_userid_link);
    },
    onEnterConfirm: function(textfield, e, eOpts){
        var m = this;
        var viewModel = this.getViewModel();
        if(e.getKey() == e.ENTER) {
            if(viewModel.get('username') == '' || viewModel.get('password') == ''){
                return;
            }else{
                m.onLoginClick();
            }
        }
    }
})