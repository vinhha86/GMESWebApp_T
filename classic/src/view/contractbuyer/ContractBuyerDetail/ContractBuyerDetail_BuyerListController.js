Ext.define('GSmartApp.view.contractbuyer.ContractBuyerDetail.ContractBuyerDetail_BuyerListController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ContractBuyerDetail_BuyerListController',
    init: function () {
        var viewModel = this.getViewModel();
        var contractBuyerDs = viewModel.get('contractBuyerDs');
        this.loadBuyer(contractBuyerDs);
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnAdd': {
            click: 'onAdd'
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    loadBuyer: function (contractBuyerDs) {
        var viewModel = this.getViewModel();
        var ListEndBuyer = viewModel.getStore('ListEndBuyer');

        var buyerIds = new Array();
        if (contractBuyerDs != null) {
            for (var i = 0; i < contractBuyerDs.length; i++) {
                buyerIds.push(contractBuyerDs[i].buyerid_link);
            }
        }
        // console.log(buyerIds);
        ListEndBuyer.loadStoreForContractBuyerBuyerList(buyerIds);
        ListEndBuyer.getSorters().remove('id');
        ListEndBuyer.getSorters().add('code');
    },
    onAdd: function () {
        var m = this.getView();
        var viewModel = this.getViewModel();
        // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
        var select = m.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một Buyer",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        this.fireEvent("AddBuyer", select);
        this.onThoat();
    },
    onCodeFilterKeyup: function () {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('codeFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
})