Ext.define('GSmartApp.view.porders.POrder_List.POrder_InfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_InfoViewController',
    init: function () {
        // let me = this.getView();
        // console.log(me.IdPOrder);
        // this.loadInfo(me.IdPOrder);

        if (this.getView().IdPOrder == 0) {
            this.getView().getForm().reset();
        }
        let productiondate_plan = this.lookupReference('productiondate_plan');
        let golivedate = this.lookupReference('golivedate');
        productiondate_plan.getPicker().monthYearFormat = 'm-Y';
        golivedate.getPicker().monthYearFormat = 'm-Y';
        // me.down('#contractcode').focus();
    },
    loadInfo: function (id) {
        let me = this.getView();
        if (id == 0) {
            me.getForm().reset();
            return;
        }

        let viewModel = this.getViewModel();
        viewModel.getStore('POrder_ListStatusStore').loadStore();

        let params = new Object();
        params.porderid_link = id;
        GSmartApp.Ajax.post('/api/v1/porder/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    let res = Ext.decode(response.responseText);
                    if (res.respcode == 200) {
                        viewModel.set('porder', res.data);
                        // safari vs chrome
                        var productiondate_plan = Ext.Date.parse(res.data.productiondate_plan, 'c');
                        if(productiondate_plan == null) productiondate_plan = new Date(res.data.productiondate_plan);
                        var golivedate = Ext.Date.parse(res.data.golivedate, 'c');
                        if(golivedate == null) productiondate_plan = new Date(res.data.golivedate);
                        viewModel.set('productiondate_plan', productiondate_plan);  
                        viewModel.set('golivedate', golivedate);

                        //Lay danh sach cac Po Line cua lenh sx
                        var porderid_link = viewModel.get('porder.id');
                        var pcontract_poid_link = viewModel.get('porder.pcontract_poid_link');
                        var PContract_PO = viewModel.getStore('PContract_PO');
                        PContract_PO.loadStoreForPOrderListPContractPO(porderid_link, pcontract_poid_link);
                
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})