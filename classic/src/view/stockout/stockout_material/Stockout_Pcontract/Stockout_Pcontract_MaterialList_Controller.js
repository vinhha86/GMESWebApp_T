Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_MaterialList_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pcontract_MaterialList_Controller',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_Pcontract_MaterialList_View': {
            // afterrender: 'onAfterrender'
        },
        // '#btnThoat': {
        //     click: 'onThoat'
        // },
        '#btnSelect': {
            click: 'onSelect'
        },
    },
    // onThoat: function(){
    //     this.fireEvent('Thoat');
    // },
    onSelect: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var stockout_pcontractid_link = viewModel.get('stockout_pcontractid_link');
        var pcontractid_link = viewModel.get('pcontractid_link');
        var productid_link = viewModel.get('productid_link');
        var select = me.getSelectionModel().getSelection();
        if (select.length == 0) {
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Phải chọn ít nhất một nguyên phụ liệu",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        var stockouttypeid_link = stockout.stockouttypeid_link;
        if(stockouttypeid_link == 1 || stockouttypeid_link == 2){
            m.fireEvent("ThemNPL", select, pcontractid_link, productid_link);
        }
        // if(stockouttypeid_link == 2){ // xuat dieu chuyen
        //     m.fireEvent("ThemNPL_XuatDieuChuyen", select, stockout_pcontractid_link, pcontractid_link, productid_link);
        //     // console.log('stockout_pcontractid_link ' + stockout_pcontractid_link);
        //     // console.log('pcontractid_link ' + pcontractid_link);
        //     // console.log('productid_link ' + productid_link);
        // }
        // this.onThoat();
    },
    // onAfterrender: function(){
    //     var m = this;
    //     var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var pcontractid_link = viewModel.get('pcontractid_link');
    //     var productid_link = viewModel.get('productid_link');

    //     var StockoutD_Store = viewModel.getStore('StockoutD_Store');

    //     var params = new Object();
    //     params.pcontractid_link = pcontractid_link ;
    //     params.productid_link = productid_link ;
    //     GSmartApp.Ajax.post('/api/v1/pcontractproductbom2/getbom_by_product_multithread',Ext.JSON.encode(params),
	// 	function(success,response,options ) {
    //         me.setLoading(false);
    //         var response = Ext.decode(response.responseText);
    //         if(response.respcode == 200) {
	// 			// console.log(response.data);
    //             var dataMaterial = new Array();
    //             for(var i = 0; i < response.data.length; i++){
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
    //             StockoutD_Store.setData(dataMaterial);
    //         }
	// 	})
    // }
})