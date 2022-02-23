Ext.define('GSmartApp.view.sku.SkuSearchModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.skusearch',
    requires: ['GSmartApp.store.org.ListOrgStore'],
    stores:{
        ProductStore: {
            type: 'ProductStore'
        },   
        SkuStore: {
            type: 'sku'
        },   
        SkuAtributesStore: {
            type: 'skuattributes'
        },
        ProductTypeStore:{
            type: 'ProductTypeStore'
        },
        SkuAtributeValueStore: {
            type: 'skuattributevalues'
        },
        OrgStore: {
            type: 'ListOrgStore'
        }
    },
    data: {
        sourceview: null,
        skucode: null,
        stockouttypeid_link: null,
        stockoutdate: null,
        productid_link: 0, //truyền xuống filter
        productid_link_notsearch: 0 , //truyền xuống api
        pcontractid_link: 0,
        pcontract_poid_link: 0,
        orgcustomerid_link : 0,
        partnercode: '',
        code: '',
        type: 0, //value phân loại
        searchtype: 0, //0-all; 1-product; 2-main material; 3-sewing+packing; 4-material, 5 : NPL
        listMau: [],
        listCo: [],
        invoiceid_link: 0 ,// để truyền xuống api trong invoice
        isHidden_sku: false,
        isHidden_newProduct: false,
        isHidden_Select_Products: true,
        isHiddenSkuSearchCriteria_Attr_actioncolumn: false,
        isHiddenSkuSearchCriteria_Attr_btnThemMoi: false,

        currencyid_link: null, // tính đơn giá cho price_sku_d
        unitid_link: null, // tính đơn giá cho price_sku_d
    },
    formulas: {
        isVisible_btnChonSP: function(get){
            if(get('sourceview') == 'PContractListProductView'){
                return true;
            }
            else{
                return false;
            }
        },
        isReadOnly_cmbKhachHang: function(get){
            if(get('sourceview') == 'PContractSKU_ListProductView'){
                return true;
            }
            else{
                return false;
            }
        }
    }
});
