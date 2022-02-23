Ext.define('GSmartApp.view.salary.SalType_AddNew_Cotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.SalType_AddNew_Cotroller',
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnXacNhan' : {
            click: 'onAccept'
        },
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onAccept: function(grid, rowIndex, colIndex) {
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.orgid_link = viewmodel.get('orgid_link');
        params.saltype_code = viewmodel.get('saltype_code');
        params.saltype_name = viewmodel.get('saltype_name');
        params.typeid_link = viewmodel.get('typeid_link');

        GSmartApp.Ajax.post('/api/v1/salary/saltype_create', Ext.JSON.encode(params),
            function (success, response, options) {
                var mes = "";
                var isSuccess = false;
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        mes = "Xác nhận thành công";
                        isSuccess = true;
                    }
                    else{
                        mes = response.message;
                    }
                }
                else{
                    mes = "Không nhận được phản hồi! Bạn vui lòng liên hệ kỹ thuật để trợ giúp";
                }

                Ext.Msg.show({
                    title: 'Thông báo',
                    msg: mes,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng'
                    },
                    fn: function(){
                        if(isSuccess)
                            me.fireEvent('AcceptSuccess');
                    }
                });
            })

        
    }
})