Ext.define('GSmartApp.view.stockout.stockout_material.Stockout_Pcontract.Stockout_Pcontract_SearchByProduct_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Stockout_Pcontract_SearchByProduct_Controller',
    init: function () {
        
    },
    listen: {

    },
    control: {
        '#Stockout_Pcontract_SearchByProduct_View': {
            afterrender: 'onAfterrender',
            // itemclick: 'onItemclick'
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
        var stockout = viewModel.get('stockout');
        var productid_link = viewModel.get('productid_link');
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
        
        // console.log(select);
        // Chọn đơn hàng, mở cửa sổ danh sách các đơn hàng KHÁC, có chứa các loại vải của sản phẩm đơn hàng này
        var stockout_pcontractid_link = select[0].get('id'); // id đơn hàng đã chọn

        var form = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '90%',
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh sách nguyên liệu',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Stockout_Pcontract_Main_View',
                viewModel: {
                    data: {
						stockout: stockout,
                        stockout_pcontractid_link: stockout_pcontractid_link,
                        productid_link: productid_link
                    }
                }
            }]
        });
        form.show();
        form.down('#Stockout_Pcontract_View').getController().on('Thoat', function () {
            form.close();
        });
        form.down('#Stockout_Pcontract_MaterialList_View').getController().on('ThemNPL_XuatDieuChuyen', function (select, stockout_pcontractid_link, pcontractid_link_loanfrom, productid_link) {

            // viewModel.set('stockout.pcontractid_link', pcontractid_link);
            // viewModel.set('stockout.productid_link', productid_link);

            // for(var i=0; i<select.length; i++){
            //     var isExist = m.checkSkuInDListFromStockout_Pcontract(select[i]);
			// 	if(isExist){ // thông báo
			// 		// đã có loại vải này
			// 	}else{ // thêm
			// 		m.addSkuToDListFromStockout_Pcontract(select[i]);
			// 	}
            // }
            // m.getPcontractProductId(pcontractid_link, productid_link);
            // form.close();
        });

        // this.fireEvent("ThemDonHang", select);
        // this.onThoat();
    },

    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var stockout = viewModel.get('stockout');
        var productid_link = viewModel.get('productid_link');

        // console.log(stockout);
        // console.log(productid_link);

        // return;

        var PContractStore = viewModel.get('PContractStore');
        PContractStore.getSorters().add({
            property: 'contractcode',
            direction: 'ASC'
        },{
            property: 'contractBuyerYear',
            direction: 'ASC'
        });

        me.setLoading(true);

        var params = new Object();
        params.productid_link = productid_link ;
        GSmartApp.Ajax.post('/api/v1/pcontract/getByProduct',Ext.JSON.encode(params),
		function(success,response,options ) {
            me.setLoading(false);
            var response = Ext.decode(response.responseText);
            if(response.respcode == 200) {
				// console.log(response);
                var data = response.data;
                var PContractStore = viewModel.getStore('PContractStore');
                PContractStore.setData(data);
                console.log(data);
            }
		})
    },

    onItemclick: function(thisView, record, item, index, e, eOpts){
        // console.log(record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var pcontractid_link = record.get('id');
        var productid_link = viewModel.get('productid_link');
        viewModel.set('pcontractid_link', pcontractid_link);

        var StockoutD_Store = viewModel.getStore('StockoutD_Store');

        var mainView = Ext.getCmp('Stockout_Pcontract_Main_View');
        if(mainView) mainView.setLoading(true);

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
})