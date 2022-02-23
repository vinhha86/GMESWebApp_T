Ext.define('GSmartApp.view.handover.HandoverDetailConfirmController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverDetailConfirmController',
    isActivate: false,
    init: function () {
    },
    control: {
        '#btnLuu': {
            tap: 'onLoginClick'
        },
        '#btnThoat': {
            tap: 'onThoat'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
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
                    Ext.toast('Xác nhận thất bại', 1000);
                    // Ext.Msg.show({
                    //     title: 'Thông báo',
                    //     msg: 'Xác nhận thất bại',
                    //     buttons: Ext.MessageBox.YES,
                    //     buttonText: {
                    //         yes: 'Đóng',
                    //     }
                    // });
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
            viewId == 'handover_cut_toline_edit' ||
            viewId == 'handover_line_topack_edit' ||
            viewId == 'handover_cut_toprint_edit'
            )
        ) {
            status = 1;
            approver_userid_link = userid_link;
        }
        if(
            currentStatus == 1 &&
            (
            viewId == 'handover_line_fromcut_edit' ||
            viewId == 'handover_pack_fromline_edit'
            )
        ) {
            status = 2;
            receiver_userid_link = userid_link;
        }

        var obj = new Object();
        obj.status = status;
        obj.handoverid_link = handoverid_link;
        obj.approver_userid_link = approver_userid_link;
        obj.receiver_userid_link = receiver_userid_link;

        m.fireEvent('updateStatus', obj);
        // m.setStatus(status, handoverid_link, approver_userid_link, receiver_userid_link);
    },
    // setStatus: function(status, handoverid_link, approver_userid_link, receiver_userid_link){
    //     var m = this;
    //     var viewModel = this.getViewModel();
    //     var params = new Object();
    //     params.status = status;
    //     params.handoverid_link = handoverid_link;
    //     params.approver_userid_link = approver_userid_link;
    //     params.receiver_userid_link = receiver_userid_link;
    //     params.msgtype = "HANDOVER_SETSTATUS";
    //     params.message = "Set status";

    //     GSmartApp.Ajax.post('/api/v1/handover/setstatus', Ext.JSON.encode(params),
    //         function (success, response, options) {
    //             if (success) {
    //                 var response = Ext.decode(response.responseText);
    //                 if (response.respcode == 200) {
    //                     if(response.message == 'Không tồn tại POrderProcessing'){
    //                         Ext.toast(response.message, 1000);
    //                         // Ext.MessageBox.show({
    //                         //     title: "Thông báo",
    //                         //     msg: response.message,
    //                         //     buttons: Ext.MessageBox.YES,
    //                         //     buttonText: {
    //                         //         yes: 'Đóng',
    //                         //     }
    //                         // });
    //                     }else {
    //                         Ext.toast('Xác thực thành công', 1000);
    //                         // Ext.Msg.show({
    //                         //     title: 'Thông báo',
    //                         //     msg: 'Xác thực thành công',
    //                         //     buttons: Ext.MessageBox.YES,
    //                         //     buttonText: {
    //                         //         yes: 'Đóng',
    //                         //     }
    //                         // });
    //                         //
    //                         // var viewId = viewModel.get('viewId');
    //                         // var mainView = Ext.getCmp(viewId);
    //                         // if(approver_userid_link != 0)
    //                         //     mainView.getViewModel().set('currentRec.approver_userid_link', approver_userid_link);
    //                         // if(receiver_userid_link != 0)
    //                         //     mainView.getViewModel().set('currentRec.receiver_userid_link', receiver_userid_link);
    //                         // mainView.getViewModel().set('currentRec.status', status);
    //                         // //
    //                         // m.onThoat();

    //                         var obj = new Object();
    //                         obj.approver_userid_link = approver_userid_link;
    //                         obj.receiver_userid_link = receiver_userid_link;
    //                         obj.status = status;

    //                         m.fireEvent('XacThuc', obj);
    //                     }
    //                 }
    //                 else {
    //                     Ext.toast('Xác thực thất bại', 1000);
    //                     console.log(response.message);
    //                     // Ext.Msg.show({
    //                     //     title: 'Xác thực thất bại',
    //                     //     msg: response.message,
    //                     //     buttons: Ext.MessageBox.YES,
    //                     //     buttonText: {
    //                     //         yes: 'Đóng',
    //                     //     }
    //                     // });
    //                 }

    //             } else {
    //                 Ext.toast('Xác thực thất bại', 1000);
    //                 console.log(null);
    //                 // Ext.Msg.show({
    //                 //     title: 'Xác thực thất bại',
    //                 //     msg: null,
    //                 //     buttons: Ext.MessageBox.YES,
    //                 //     buttonText: {
    //                 //         yes: 'Đóng',
    //                 //     }
    //                 // });
    //             }
    //         })
    // },
})