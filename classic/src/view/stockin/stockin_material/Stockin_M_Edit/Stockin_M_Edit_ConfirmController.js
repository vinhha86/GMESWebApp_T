Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.Stockin_M_Edit_ConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockin_M_Edit_ConfirmController',
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
                    m.onConfirmStockin(sessionData.user);
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
    onConfirmStockin: function(userid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockinId = viewModel.get('stockinId');
        var approver_userid_link = userid_link;
        m.confirmStockin(stockinId, approver_userid_link);
    },
    confirmStockin: function(stockinId, approver_userid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.stockinId = stockinId;
        params.approver_userid_link = approver_userid_link;

        GSmartApp.Ajax.postJitin('/api/v1/stockin/stockin_approve', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    if (response.respcode == 200) {
                        if(response.message == 'Stockin đã được duyệt (tồn tại StockinId trong warehouse)'){
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Xác thực thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                            
                            var stockin = Ext.getCmp('Stockin_M_Edit').getViewModel().get('stockin');
                            stockin.approve_date = response.data.approve_date;
                            stockin.approverid_link = response.data.approverid_link;
                            stockin.status = 1;
                            stockin.statusString = 'Đã duyệt';
                            Ext.getCmp('Stockin_M_Edit').down('#btnConfirm').setHidden(true);
                            Ext.getCmp('Stockin_M_Edit').down('#statusString').setValue('Đã duyệt');
                            // console.log(stockin);
                            m.onThoat();
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Xác thực thất bại',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Xác thực thất bại',
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
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