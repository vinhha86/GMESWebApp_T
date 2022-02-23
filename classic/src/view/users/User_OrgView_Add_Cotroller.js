Ext.define('GSmartApp.view.product.User_OrgView_Add_Cotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.User_OrgView_Add_Cotroller',
    init: function () {
        var viewmodel = this.getViewModel();
        var store = this.getViewModel().getStore('OrgStore');

        var orgtypeid_link_list = viewmodel.get('orgtypeid_link_list');
        if(orgtypeid_link_list != null){
            store.loadStoreByOrgTypeString(orgtypeid_link_list);
        }else{
            store.loadStore(viewmodel.get('orgtypeid_link'),false);
        }
        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onAccept'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onAccept: function () {
        var viewmodel = this.getViewModel();
        var myview = this.getView();
        var me = this;

        var params = new Object();
        params.userid_link = viewmodel.get('userid_link');

        var obj = [];
        var select = myview.getSelectionModel().getSelection();
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            obj.push(data.id);
        }

        params.listId = obj;

        GSmartApp.Ajax.post('/api/v1/users/user_orgview_add', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    me.fireEvent('AcceptSuccess');
                } else {
                    Ext.Msg.show({
                        title: 'Lưu thất bại',
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    }
})