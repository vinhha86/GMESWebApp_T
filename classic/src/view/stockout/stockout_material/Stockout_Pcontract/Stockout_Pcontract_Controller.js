Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pcontract_Controller',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_Pcontract_View': {
            afterrender: 'onAfterrender',
            itemclick: 'onItemclick'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    onThoat: function(){
        this.fireEvent('Thoat');
    },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        // var ListEndBuyer = viewModel.getStore('ListEndBuyer');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn một đơn hàng",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        this.fireEvent("ThemDonHang", select);
        // this.onThoat();
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var productid_link = viewModel.get('productid_link');

        var PContractStore = viewModel.get('PContractStore');
        PContractStore.getSorters().add({
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'contractBuyerYear',
            direction: 'ASC'
        });

        var mainView = Ext.getCmp('Stockout_Pcontract_Main_View');
        if(mainView) mainView.setLoading(true);
        
        if(stockout.stockouttypeid_link == 1 || stockout.stockouttypeid_link == 2){
            // lấy các đơn hàng có sp này

            var params = new Object();
            params.productid_link = productid_link ;
            GSmartApp.Ajax.post('/api/v1/pcontract/getByProduct',Ext.JSON.encode(params),
            function(success,response,options ) {
                if(mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if(response.respcode == 200) {
                    // console.log(response);
                    var data = response.data;
                    var PContractStore = viewModel.getStore('PContractStore');
                    PContractStore.setData(data);
                }
            })
        }
        // if(stockout.stockouttypeid_link == 2){ // xuat dieu chuyen
        //     // lấy danh sách các đơn hàng KHÁC, có chứa các loại vải của sản phẩm đơn hàng này

        //     var stockout_pcontractid_link = viewModel.get('stockout_pcontractid_link');
        //     // var pcontractid_link = viewModel.get('pcontractid_link');

        //     // console.log(stockout);
        //     // console.log('productid_link: ' + productid_link);
        //     // console.log('stockout_pcontractid_link (id đơn hàng hiện tại): ' + stockout_pcontractid_link);
        //     // console.log('pcontractid_link (id đơn hàng cây vải cần lấy): ' + pcontractid_link);

        //     // return;

        //     var params = new Object();
        //     params.productid_link = productid_link ;
        //     params.pcontractid_link = stockout_pcontractid_link ;
        //     GSmartApp.Ajax.post('/api/v1/pcontract/getByMaterial_of_Product_Pcontract',Ext.JSON.encode(params),
        //     function(success,response,options ) {
        //         if(mainView) mainView.setLoading(false);
        //         var response = Ext.decode(response.responseText);
        //         if(response.respcode == 200) {
        //             // console.log(response);
        //             var data = response.data;
        //             var PContractStore = viewModel.getStore('PContractStore');
        //             PContractStore.setData(data);
        //         }
        //     })
        // }
    },
    onItemclick: function(thisView, record, item, index, e, eOpts){
        // console.log(record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var pcontractid_link = record.get('id');
        var productid_link = viewModel.get('productid_link');
        viewModel.set('pcontractid_link', pcontractid_link);

        var StockoutD_Store = viewModel.getStore('StockoutD_Store');

        var mainView = Ext.getCmp('Stockout_Pcontract_Main_View');
        if(mainView) mainView.setLoading(true);

        var stockouttypeid_link = stockout.stockouttypeid_link;
        if(stockouttypeid_link == 1 || stockouttypeid_link == 2){
    
            var params = new Object();
            params.pcontractid_link = pcontractid_link ;
            params.productid_link = productid_link ;
            GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/getbom_by_product_multithread',Ext.JSON.encode(params),
            function(success,response,options ) {
                if(mainView) mainView.setLoading(false);
                var response = Ext.decode(response.responseText);
                if(response.respcode == 200) {
                    // console.log(response.data);
                    var dataMaterial = new Array();
                    for(var i = 0; i < response.data.length; i++){
                        var product_type = response.data[i].product_type;
                        if(product_type == '20'){
                            var isNotContain = true;
                            for(var j = 0; j < dataMaterial.length; j++){
                                if(dataMaterial[j].materialid_link == response.data[i].materialid_link){
                                    isNotContain = false;
                                }
                            }
                            if(isNotContain){
                                dataMaterial.push(response.data[i]);
                            }
                        }
                    }
                    StockoutD_Store.removeAll();
                    StockoutD_Store.insert(0, dataMaterial);
                }
            })
        }
        // if(stockout.stockouttypeid_link == 2){ // xuat dieu chuyen
        //     var stockout_pcontractid_link = viewModel.get('stockout_pcontractid_link');

        //     var params = new Object();
        //     params.pcontractid_link_current = stockout_pcontractid_link;
        //     params.pcontractid_link_loanfrom = pcontractid_link ;
        //     params.productid_link = productid_link ;
        //     GSmartApp.Ajax.post('/api/v1/sku/getSkuForXuatDieuChuyenNguyenLieu',Ext.JSON.encode(params),
        //     function(success,response,options ) {
        //         if(mainView) mainView.setLoading(false);
        //         var response = Ext.decode(response.responseText);
        //         if(response.respcode == 200) {
        //             // console.log(response.data);

        //             // materialCode - code
        //             // materialName - name
        //             // materialid_link - id
        //             // nhacungcap - partnercode_product
        //             // product_type - producttypeid_link
        //             // product_typename - producttype_name

        //             var dataMaterial = new Array();
        //             for(var i = 0; i < response.data.length; i++){
        //                 response.data[i].materialCode = response.data[i].code;
        //                 response.data[i].materialName = response.data[i].name;
        //                 response.data[i].materialid_link = response.data[i].id;
        //                 response.data[i].nhacungcap = response.data[i].partnercode_product;
        //                 response.data[i].product_type = response.data[i].producttypeid_link;
        //                 response.data[i].product_typename = response.data[i].producttype_name;

        //                 var product_type = response.data[i].product_type;
        //                 if(product_type == '20'){
        //                     var isNotContain = true;
        //                     for(var j = 0; j < dataMaterial.length; j++){
        //                         if(dataMaterial[j].materialid_link == response.data[i].materialid_link){
        //                             isNotContain = false;
        //                         }
        //                     }
        //                     if(isNotContain){
        //                         dataMaterial.push(response.data[i]);
        //                     }
        //                 }
        //             }
        //             StockoutD_Store.removeAll();
        //             StockoutD_Store.insert(0, dataMaterial);
        //         }
        //     })
        // }
    }
})