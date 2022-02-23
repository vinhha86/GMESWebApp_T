Ext.define('GSmartApp.view.pcontract.PContract_General_InfoViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_General_InfoViewController',
    init: function () {
        var me = this.getView();

        this.loadStoreForPopUpWindow();
        this.loadDataForPopUpWindow();
        this.disableInfoViewBtn();
        this.disableListProductViewBtn();
        this.disablePairProductViewBtn();
        this.disableDocumentViewBtn();
        this.disableAttributeViewBtn();

        common.Check_Object_Permission();
    },


    loadStoreForPopUpWindow: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var KHStore = viewmodel.getStore('CustomerStore');
        var VenderStore = viewmodel.getStore('Vender');
        var EndBuyerStore = viewmodel.getStore('EndBuyer');
        var BranchStore = viewmodel.getStore('BranchStore');
        var SeasonStore = viewmodel.getStore('SeasonStore');
        var UnitStore = viewmodel.getStore('UnitStore');
        var MarketStore = viewmodel.getStore('MarketStore');
        var PContractTypeStore = viewmodel.getStore('ContractTypes');

        KHStore.loadStore(10, false);
        VenderStore.loadStore(11, false);
        EndBuyerStore.loadStore(12, false);
        BranchStore.loadStore(false);
        SeasonStore.loadStore(false);
        UnitStore.loadStore();
        MarketStore.loadStore(1);
        PContractTypeStore.loadStore();
    },

    loadDataForPopUpWindow: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var IdPContract = viewmodel.get('IdPContract');
        var IdProduct = viewmodel.get('IdProduct');

        var infoView = me.down('#PContractInfoView');
        infoView.IdPContract = me.IdPContract;
        infoView.getController().loadInfo(IdPContract);

        var listProducView = me.down('#PContractListProductView');
        listProducView.IdPContract = me.IdPContract;

        var productpair = me.down('#PContractPairProductView');
        productpair.IdPcontract = me.IdPContract;

        var storepair = viewmodel.getStore('PContractProductPairStore');
        var store = viewmodel.getStore('PContractProductStore');
        store.loadStore(IdPContract);
        if(IdProduct){
            store.getFilters().add({
                property: 'productid_link',
                value: me.IdProduct,
                exactMatch: true
            });
        }
        storepair.loadStore(IdPContract);
    },

    disableInfoViewBtn: function(){
        var me = this.getView();
        var infoView = me.down('#PContractInfoView');
        if (infoView.down('#contractcode') != null) infoView.down('#contractcode').setReadOnly(true);
        if (infoView.down('#contractdate') != null) infoView.down('#contractdate').setReadOnly(true);
        if (infoView.down('#confirmdate') != null) infoView.down('#confirmdate').setReadOnly(true);
        if (infoView.down('#orgbuyerid_link') != null) infoView.down('#orgbuyerid_link').setReadOnly(true); // duplicate id
        if (infoView.down('#orgvenderid_link') != null) infoView.down('#orgvenderid_link').setReadOnly(true);
        if (infoView.down('#contracttypeid_link') != null) infoView.down('#contracttypeid_link').setReadOnly(true);
        if (infoView.down('#orgpayerid_link') != null) infoView.down('#orgpayerid_link').setReadOnly(true); // duplicate id
        if (infoView.down('#orgshowid_link') != null) infoView.down('#orgshowid_link').setReadOnly(true);
        if (infoView.down('#market') != null) infoView.down('#market').setReadOnly(true);
        if (infoView.down('#contractcode') != null) infoView.down('#contractcode').setReadOnly(true);
    },

    disableListProductViewBtn: function(){
        var me = this.getView();
        var listProductView = me.down('#PContractListProductView');
        if(listProductView.down('#btnAddProduct_PContractListProductView') != null) listProductView.down('#btnAddProduct_PContractListProductView').setVisible(false);
        var col = listProductView.getColumns()[5];
        if (col) col.hide();
    },

    disablePairProductViewBtn: function(){
        var me = this.getView();
        var pairProductView = me.down('#PContractPairProductView');
        if(pairProductView.down('#btnPair_PContractPairProductView') != null) pairProductView.down('#btnPair_PContractPairProductView').setVisible(false);
        var col = pairProductView.getColumns()[2];
        col.hide();
        var cellEditing = pairProductView.getPlugins()[0];
        if (cellEditing) cellEditing.destroy();
    },

    disableDocumentViewBtn: function(){
        var me = this.getView();
        var listDocumentView = me.down('#PContractDocumentView');
        if(listDocumentView.down('#btnDoc_PContractDocumentView') != null) listDocumentView.down('#btnDoc_PContractDocumentView').setVisible(false);
    },

    disableAttributeViewBtn: function(){
        var me = this.getView();
        var attributeView = me.down('#PContractAttributeView');
        if(attributeView.down('#btnThemMoi') != null) attributeView.down('#btnThemMoi').setVisible(false);
        var col = attributeView.getColumns()[2];
        if (col) col.hide();
    },
})