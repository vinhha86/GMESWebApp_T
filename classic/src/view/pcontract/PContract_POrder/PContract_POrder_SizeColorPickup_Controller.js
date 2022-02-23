Ext.define('GSmartApp.view.pcontract.PContract_POrder_SizeColorPickup_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrder_SizeColorPickup_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        var po = viewmodel.get('po');
        // var productStore = viewmodel.getStore('PContractProduct_PO_Store');
        // productStore.loadStore_bypairid(po.productid_link, po.po_quantity, true);
        var storeSku = viewmodel.getStore('PContractSKUStore');
        storeSku.loadStoreByPO_ASync(po.pcontractid_link, po.id); 
        storeSku.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				}
				else{
					this.refreshSizeColorList();
				}
			}
		});
        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnGenPOrder': {
            click: 'onGenPOrder'
        },
        'PContract_POrder_SizeColorPickup_Product':{
            select: 'onSelectProduct',
            deselect: 'onDeSelectProduct'
        },
        'PContract_POrder_SizeColorPickup_Size' : {
            select: 'onCalculate_total_select',
            deselect: 'onCalculate_total_select'
        },
        'PContract_POrder_SizeColorPickup_Color': {
            select: 'onCalculate_total_select',
            deselect: 'onCalculate_total_select'
        }
    },
    onCalculate_total_select: function(){
        var form = this.getView();
        var viewmodel = this.getViewModel();
        var size_View = form.down('PContract_POrder_SizeColorPickup_Size');
            var size_select = size_View.getSelectionModel().getSelection();
            var sizelist = '';
            for (i=0; i< size_select.length; i++){
                sizelist = sizelist + size_select[i].data.id + ';'
            }

            var color_View = form.down('PContract_POrder_SizeColorPickup_Color');
            var color_select = color_View.getSelectionModel().getSelection();
            var colorlist = '';
            for (i=0; i< color_select.length; i++){
                colorlist = colorlist + color_select[i].data.id + ';'
            }

            // var product_View = form.down('PContract_POrder_SizeColorPickup_Product');
            // var product_select = product_View.getSelectionModel().getSelection();

            if (sizelist == '' || colorlist == ''){
                var params=new Object();
                params.porderreqid_link = viewmodel.get('porderreqid_link');
                params.productid_link = viewmodel.get('productid_link');
                params.size_list = sizelist;
                params.color_list = colorlist;

                GSmartApp.Ajax.post('/api/v1/porder_req/get_total_select', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                viewmodel.set('totalselect', response.total);
                            }
                        }); 
            }
    },
    onSelectProduct: function(m, rec){
        this.refreshSizeColorList();
    },
    onDeSelectProduct: function(m, rec){
        this.refreshSizeColorList();
    },
    refreshSizeColorList:function(){
        var viewmodel = this.getViewModel();
        var storeSku = viewmodel.getStore('PContractSKUStore');

        var sizePickupStore = viewmodel.getStore('SizePickupStore');
        var colorPickupStore = viewmodel.getStore('ColorPickupStore');
        sizePickupStore.removeAll();
        colorPickupStore.removeAll();
        // var product_View = Ext.getCmp('PContract_POrder_SizeColorPickup_Product').getView();
        // var product_select = product_View.getSelectionModel().getSelection();
        // for (i=0; i< product_select.length; i++){
            // storeSku.filter('productid_link',product_select[i].data.id);
            storeSku.filter('productid_link',viewmodel.get('productid_link'));
            for(k=0; k<storeSku.data.items.length; k++){
                var data = storeSku.data.items[k].data;
                var newSize = new Object();
                newSize.id = data.sizeid_link;
                newSize.name = data.coSanPham;
                sizePickupStore.insert(0,newSize);
                // sizePickupStore.sort('','ASC')

                var newColor = new Object();
                newColor.id = data.color_id;
                newColor.name = data.mauSanPham;
                colorPickupStore.insert(0,newColor);
            }
        // }
    },
    onGenPOrder: function(){
        var viewmodel = this.getViewModel();
        if (viewmodel.get('sku_all')){
            //Neu chon sinh tat ca SKU con lai
            var productStore = viewmodel.getStore('PContractProduct_PO_Store');
            this.fireEvent('GenPOrder_AllSKU',productStore,'','');
        } else {
            var size_View = Ext.getCmp('PContract_POrder_SizeColorPickup_Size').getView();
            var size_select = size_View.getSelectionModel().getSelection();
            var sizelist = '';
            for (i=0; i< size_select.length; i++){
                sizelist = sizelist + size_select[i].data.id + ';'
            }

            var color_View = Ext.getCmp('PContract_POrder_SizeColorPickup_Color').getView();
            var color_select = color_View.getSelectionModel().getSelection();
            var colorlist = '';
            for (i=0; i< color_select.length; i++){
                colorlist = colorlist + color_select[i].data.id + ';'
            }

            // var product_View = Ext.getCmp('PContract_POrder_SizeColorPickup_Product').getView();
            // var product_select = product_View.getSelectionModel().getSelection();

            if (sizelist == '' && colorlist == ''){
                Ext.MessageBox.show({
                    title: "Lệnh sản xuất",
                    msg: 'Bạn phải chọn ít nhất 1 điều kiện để tạo lệnh',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            } else {
                this.fireEvent('GenPOrder',sizelist,colorlist);
            }
        }
    },
    onCheckStatusChange:function(e, newValue, oldValue, eOpts){
        var centerView = Ext.getCmp('PContract_POrder_SizeColorPickup_Center');
        centerView.setDisabled(newValue);
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    }
})