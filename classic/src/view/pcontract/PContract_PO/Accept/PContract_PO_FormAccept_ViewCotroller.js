Ext.define('GSmartApp.view.pcontract.PContract_PO_FormAccept_ViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_FormAccept_ViewCotroller',
    init: function(){
        var viewmodel = this.getViewModel();
        var userStore = viewmodel.getStore('UserStore');

		var OrgStore = viewmodel.getStore('OrgStore');
        OrgStore.loadOrg_Request(viewmodel.get('po.id'), function(records, operation, success){
            var po = viewmodel.get('po');
            if(po.orgid_link == null || po.orgid_link == 0){
                if(OrgStore.data.length > 0){
                    viewmodel.set('po.orgid_link', OrgStore.getAt(0).get('id'));
                    userStore.loadUserbyOrg_Buyer(OrgStore.getAt(0).get('id'), viewmodel.get('po.orgbuyerid_link'));
                }
                
            }
        });

        if(viewmodel.get('po.orgid_link') > 0){
            userStore.loadUserbyOrg_Buyer(viewmodel.get('po.orgid_link'), viewmodel.get('po.orgbuyerid_link'));
        }
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnXacNhan' : {
            click: 'onAccept'
        },
        '#cmbDonVi': {
            select: 'onSelectOrg' 
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSelectOrg: function(combo, record, eOpts){
        var viewmodel = this.getViewModel();
        var userStore = viewmodel.getStore('UserStore');
        userStore.loadUserbyOrg_Buyer(record.get('id'), viewmodel.get('po.orgbuyerid_link'));
    },
    onAccept: function(grid, rowIndex, colIndex) {
        var grid = this.getView();
        grid.setLoading("Đang xử lý");
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.userid_link = viewmodel.get('po.userid_link');
        params.orgid_link = viewmodel.get('po.orgid_link');
        params.pcontract_poid_link = viewmodel.get('po.id');

        GSmartApp.Ajax.post('/api/v1/pcontract_po/accept', Ext.JSON.encode(params),
            function (success, response, options) {
                var mes = "";
                grid.setLoading(false);
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