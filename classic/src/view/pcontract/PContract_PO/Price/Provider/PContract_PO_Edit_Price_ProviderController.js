Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.Provider.PContract_PO_Edit_Price_ProviderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Price_ProviderController',
    init: function(){
        var me = this.getView();
        var viewModel = this.getViewModel();
        var ListProviderStore = viewModel.getStore('ListProviderStore');
        ListProviderStore.loadStoreByOrgTypeString_Async('5');
        ListProviderStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    var record = viewModel.get('record');
                    var providerid_link = record.data.providerid_link;
                    var data = ListProviderStore.findRecord('id', providerid_link);
                    me.getSelectionModel().select(data, true);
				}
			}
        });
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnAdd': {
            click: 'onAdd'
        },
        '#btnAddProvider': {
            click: 'onBtnAddProvider'
        },
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onAdd: function(){
        var m = this.getView();
        var viewModel = this.getViewModel();
        // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
        var select = m.getSelectionModel().getSelection();
        this.fireEvent("AddProvider", select);
        this.onThoat();
    },
    onBtnAddProvider: function(){
        // console.log('here yet');
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();

        // txtProviderName, txtProviderCode

        var providerName = me.down('#txtProviderName').getValue();
        if(providerName == null || providerName == '' || providerName.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Tên nhà cung cấp không được để trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtProviderName').focus();
            return;
        }
        var providerCode = me.down('#txtProviderCode').getValue();
        if(providerCode == null || providerCode == '' || providerCode.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Mã nhà cung cấp không được để trống',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            me.down('#txtProviderCode').focus();
            return;
        }

        var params = new Object();
        var data = new Object();

        data.name = providerName;
        data.code = providerCode;
        data.id = 0;
        data.orgtypeid_link = 5;
        data.orgrootid_link = 0;
        data.status = 1;

        params.data = data;
        params.msgtype = "PROVIDER_CREATE";
        params.message = "Tạo nhà cung cấp";

        me.setLoading("Đang lưu dữ liệu");

        GSmartApp.Ajax.post('/api/v1/orgmenu/org_create_quick', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    if(response.message == 'Mã đã tồn tại'){
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Mã nhà cung cấp đã tồn tại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    me.down('#txtProviderCode').focus();
                                }
                            }
                        });
                    }else if(response.message == 'Tên đã tồn tại'){
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Tên nhà cung cấp đã tồn tại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function (btn) {
                                if (btn === 'yes') {
                                    me.down('#txtProviderName').focus();
                                }
                            }
                        });
                    }else{
                        var ListProviderStore = viewModel.getStore('ListProviderStore');
                        ListProviderStore.load();
                        me.down('#txtProviderName').setValue('');
                        me.down('#txtProviderCode').setValue('');
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onEnterAddAttributeValue: function(textfield, e, eOpts){
        var m = this;
        if(e.getKey() == e.ENTER) {
            m.onBtnAddProvider();
        }
    }
})