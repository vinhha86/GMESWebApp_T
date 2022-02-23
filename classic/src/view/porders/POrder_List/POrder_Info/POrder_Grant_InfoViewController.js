Ext.define('GSmartApp.view.porders.POrder_List.POrder_Grant_InfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_InfoViewController',
    init: function () {
    },
    loadInfo: function (id) {
        let me = this.getView();
        if (id == 0) {
            me.getForm().reset();
            return;
        }
        var viewModel = this.getViewModel();
        let params = new Object();
        params.idPorderGrant = id;
        GSmartApp.Ajax.post('/api/v1/porder_grant/findone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        viewModel.set('POrder_grant', res.data);
                        viewModel.set('golivedate', Ext.Date.parse(res.data.golivedate, 'c'));
                        viewModel.set('finish_date_plan', Ext.Date.parse(res.data.finish_date_plan, 'c'));
                        
                        //Kiem tra SL KH(totalamount_tt) va SL da giao (grantamount), neu chenh 10% --> Bao do
                        if (null!=res.data.totalamount_tt && res.data.totalamount_tt != 0){
                            var difrate = (null==res.data.grantamount?0:res.data.grantamount)/res.data.totalamount_tt;
                            if (difrate > 1.1 || difrate < 0.9){
                                viewModel.set('fieldstyle_sl', 'font-weight: bold;font-size:12px;text-align:right;background-color:red;color:yellow');
                            } else {
                                viewModel.set('fieldstyle_sl', 'font-weight: bold;font-size:12px;text-align:right;background-color:white;color:black');
                            }
                        }
                        //Kiem tra neu ngay kthuc < ngay KH --> Canh bao
                        if (res.data.golivedate < res.data.finish_date_plan){
                            viewModel.set('fieldstyle_date', 'font-weight: bold;font-size:12px;text-align:right;background-color:red;color:yellow');
                        } else {
                            viewModel.set('fieldstyle_date', 'font-weight: bold;font-size:12px;text-align:right;background-color:white;color:black');
                        }
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin PO_Grant thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})