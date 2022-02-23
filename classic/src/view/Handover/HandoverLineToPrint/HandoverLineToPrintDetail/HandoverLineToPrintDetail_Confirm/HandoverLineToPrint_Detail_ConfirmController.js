Ext.define('GSmartApp.view.handover.HandoverLineToPrint_Detail_ConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverLineToPrint_Detail_ConfirmController',
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
        var currentStatus = viewModel.get('currentStatus');
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
                    m.changeHandoverStatus(sessionData.user, currentStatus);
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
    changeHandoverStatus: function(userid_link, currentStatus){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var handoverid_link = viewModel.get('handoverid_link');
        var viewId = viewModel.get('viewId');
        var status = 0;
        var approver_userid_link = 0;
        var receiver_userid_link = 0;
        if(
            currentStatus == 0 &&
            (
            viewId == 'handover_line_toprint_detail'
            )
        ) {
            status = 1;
            approver_userid_link = userid_link;
        }
        // m.setStatus(status, handoverid_link, approver_userid_link, receiver_userid_link);
        var obj = new Object();
        obj.status = status;
        obj.handoverid_link = handoverid_link;
        obj.approver_userid_link = approver_userid_link;
        obj.receiver_userid_link = receiver_userid_link;

        m.fireEvent('updateStatus', obj);
    },
    
    setStatus: function(status, handoverid_link, approver_userid_link, receiver_userid_link){
        var m = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.status = status;
        params.handoverid_link = handoverid_link;
        params.approver_userid_link = approver_userid_link;
        params.receiver_userid_link = receiver_userid_link;
        params.msgtype = "HANDOVER_SETSTATUS";
        params.message = "Set status";

        GSmartApp.Ajax.post('/api/v1/handover/setstatus', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        if(response.message == 'Không tồn tại POrderProcessing'){
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
                            //
                            var viewId = viewModel.get('viewId');
                            var mainView = Ext.getCmp(viewId);
                            if(approver_userid_link != 0)
                                mainView.getViewModel().set('currentRec.approver_userid_link', approver_userid_link);
                            if(receiver_userid_link != 0)
                                mainView.getViewModel().set('currentRec.receiver_userid_link', receiver_userid_link);
                            mainView.getViewModel().set('currentRec.status', status);
                            //
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
            console.log('here yet');
            if(viewModel.get('username') == '' || viewModel.get('password') == ''){
                return;
            }else{
                m.onLoginClick();
            }
        }
    }
})