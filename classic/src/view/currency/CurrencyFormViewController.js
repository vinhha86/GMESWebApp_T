Ext.define('GSmartApp.view.currency.CurrencyFormViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.CurrencyFormViewController',
    Id: 0,
    init: function () {
        
    },
    control: {
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnThem': {
            click: 'onThem'
        }
    },
    onLuu: function () {
        var me = this.getView();
        me.setLoading("Đang lưu dữ liệu");

        var viewModel = this.getViewModel();

        var params = new Object();
        var data = new Object();
        data = viewModel.get('currentRec');
        data.id = viewModel.get('id');
        
        if(data.status==true){
            data.status=1;
        }else{
            data.status=-1;
        }

        params.data = data;
        console.log('data here');
        console.log(params.data);
        params.msgtype = "CURRENCY_CREATE";
        params.message = "Tạo ngoại tệ";

        GSmartApp.Ajax.post('/api/v1/currency/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });

                        
                        var store = viewModel.getStore('CurrencyStore');
                        store.loadStore();
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
                        msg: null,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
        viewModel.set('id',0);
        viewModel.set('currentRec',null);
        me.down('#code').focus();
    },
    onThem:function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        viewModel.set('id',0);
        viewModel.set('currentRec',null);
        me.down('#code').focus();
    }
})