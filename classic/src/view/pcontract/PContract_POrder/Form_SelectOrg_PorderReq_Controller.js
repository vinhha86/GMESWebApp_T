Ext.define('GSmartApp.view.pcontract.PContract_Porder.Form_SelectOrg_PorderReq_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Form_SelectOrg_PorderReq_Controller',
    init: function(){
        var viewmodel = this.getViewModel();

        var OrgStore = viewmodel.getStore('OrgStore');
        OrgStore.loadOrg_NotRequest(viewmodel.get('pcontractpo_id_link'));
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
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

        var params = new Object();
        params.data = new Object();

        params.data.id = null;
        params.data.granttoorgid_link = viewmodel.get('orgid_link');
        params.data.pcontract_poid_link = viewmodel.get('pcontractpo_id_link');
        params.data.pcontractid_link = viewmodel.get('pcontractid_link');
        params.data.productid_link = viewmodel.get('productid_link');
        params.data.is_calculate = false;
        params.data.totalorder = parseFloat(viewmodel.get('amount').toString().replace(/,/gi,''));

        GSmartApp.Ajax.post('/api/v1/porder_req/create_from_po', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (!success) {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Có lỗi trong quá trình xử lý dữ liệu! Bạn vui lòng thử lại",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            } else {
                me.fireEvent('Chon');
            }
        });     
    }
})