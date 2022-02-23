Ext.define('GSmartApp.view.pcontract.PContractInfoViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractInfoViewCotroller',
    control: {
        '#orgbuyerid_link' : {
            select: 'onSelectBuyer'
        }
    },
    init: function () {
        var me = this.getView();
        var viewmodel  = this.getViewModel();
        var IdPContract = viewmodel.get('IdPContract');
        if (IdPContract == 0) {
            this.getView().getForm().reset();
        }

        me.down('#orgbuyerid_link').focus();
    },
    onSelectBuyer: function(combo, record) {
        var viewmodel  = this.getViewModel();
        viewmodel.set('PContract.contractcode', record.get('code'));
        // console.log(record);
        // list h/dong gia cong
        this.getView().down('#contractbuyerid_link').setValue(null);
        var storeContractBuyer = viewmodel.getStore('ContractBuyerStore');
        storeContractBuyer.loadStoreByBuyer(record.id);

        // list vendor
        this.getView().down('#orgvenderid_link').setValue(null);
        var VenderStore = viewmodel.getStore('Vender');
        VenderStore.loadVendorStoreByBuyerId(record.id);
    },
    onSelectPayer: function(combo, record){
        // console.log(record);
        var viewmodel  = this.getViewModel();
        if(record.id == 1){ // vendor
                viewmodel.set('PContract.orgshowid_link', viewmodel.get('PContract.orgvendorid_link'));
        }
        if(record.id == 2){ // buyer
                viewmodel.set('PContract.orgshowid_link', viewmodel.get('PContract.orgbuyerid_link'));
        }
    },
    loadInfo: function (id) {
        var me = this.getView();
        var viewmodel  = this.getViewModel();
        if (id == 0) {
            me.getForm().reset();
            viewmodel.set('PContract.contractdate', new Date());
            viewmodel.set('PContract.contracttypeid_link', 1);
            viewmodel.set('PContract.marketypeid_link', 2);
            viewmodel.set('PContract.payer', 1);
            return;
        }

        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/pcontract/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewModel.set('PContract', response.data);
                        var storeContractBuyer = viewModel.getStore('ContractBuyerStore');
                        storeContractBuyer.loadStoreByBuyer(response.data.orgbuyerid_link);
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