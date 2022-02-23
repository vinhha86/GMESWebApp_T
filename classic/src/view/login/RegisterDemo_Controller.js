Ext.define('GSmartApp.view.login.RegisterDemo_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.RegisterDemo_Controller',
    control: {
        // '#btnThoat': {
        //     click: 'onThoat'
        // },
        '#btnLuu': {
            click: 'onChon'
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onChon: function(){
        var me = this;
        var viewmodel = this.getViewModel();

        Ext.Ajax.request({
            url :  config.getBack() + 'demoreg',
            method:'POST',
            params: JSON.stringify({
                reguser: viewmodel.get('reguser'),
                regemail: viewmodel.get('regemail'),
                regtel: viewmodel.get('regtel'),
                regorg: viewmodel.get('regorg'),
                regcomment: viewmodel.get('regcomment'),
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: function(result, opts) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "GPAY Technology đã nhận được yêu cầu đăng ký sử dụng Demo Hệ thống quản lý sản xuất. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất. Xin cảm ơn!",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });                
                me.onThoat();
            },
            failure: function(err, opts) {
                console.log('Failure login user', err);
            }
        });
    }
})