Ext.define('GSmartApp.view.pcontract.PContract_PO_Edit_SizesetSelectController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_SizesetSelectController',
    init: function(){
        var parent = Ext.getCmp('PContract_PO_Edit');
        var p_viewmodel = parent.getViewModel();

        var viewmodel = this.getViewModel();
        var sizesetStore = viewmodel.getStore('SizeSetStore');
        sizesetStore.loadStore();
		sizesetStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    //remove sizeset that have been selected to PO
                    var priceStore = p_viewmodel.getStore('PriceStore');
                    for(var k =0; k < priceStore.data.length; k++){
                        var p_data = priceStore.data.items[k].data;
                        var fSizeset = sizesetStore.findRecord('id', p_data.sizesetid_link);
                        if (null != fSizeset){
                            sizesetStore.remove(fSizeset);
                        }
                    } 
                    var sorters = sizesetStore.getSorters();
                    sorters.add('sortvalue');
                    sorters.remove('id');
                    // console.log(sizesetStore.getSorters());
                }
			}
		});  
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        }
    },    
    onThoat: function () {
        this.getView().up('window').destroy();
    },
    onLuu: function () {
        var parent = Ext.getCmp('PContract_PO_Edit');
        var p_viewmodel = parent.getViewModel();
        var productStore = p_viewmodel.getStore('ProductStore');
        var priceStore = p_viewmodel.getStore('PriceStore');

        var me = this.getView();
        var po = p_viewmodel.get('po');

        var po_pricelist = po.pcontract_price;
        var select = me.getSelectionModel().getSelection();   

        if(select.length == 0){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Bạn chưa chọn dải cỡ',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });

            return;
        } else {
            
            for (var i = 0; i < select.length; i++) {
                var data = select[i].data;

                //Them Sizeset cho tat ca cac san pham trong bo
                for(var k =0; k < productStore.data.length; k++){
                    var p_data = productStore.data.items[k].data;
                    var newSizeset = new Object();
                    var pcontract_price_d = [];
                    //Neu da co Price --> Lay danh sach PriceD de dua vao cac Price moi
                    if (priceStore.data.length > 0){
                        var price_data = priceStore.data.items[0].data;
                        for(var j =0; j < price_data.pcontract_price_d.length; j++){
                            var price_d = price_data.pcontract_price_d[j];
                            var newPriceD = new Object({
                                id: null,
                                isfob: price_d.isfob,
                                fobprice_name : price_d.fobprice_name,
                                fobpriceid_link: price_d.fobpriceid_link,
                                price : 0,
                                cost: 0,
                                productid_link: p_data.id
                            })  
                            pcontract_price_d.push(newPriceD);
                        }
                    } else {
                        //Neu chua co, mac dinh them price CMP
                        var newPriceD = new Object({
                            id: null,
                            isfob: false,
                            fobprice_name : 'Giá CMP',
                            fobpriceid_link: 1,
                            price : 0,
                            cost: 0,
                            productid_link: p_data.id
                        })  
                        pcontract_price_d.push(newPriceD);
                    }
                    newSizeset.pcontractid_link = po.pcontractid_link;
                    newSizeset.pcontract_poid_link = po.id;
                    newSizeset.productid_link =p_data.id;
                    newSizeset.sizesetid_link = data.id;
                    newSizeset.sizesetname = data.name;
                    newSizeset.sortvalue = data.sortvalue;
                    newSizeset.price_cmp = null;
                    newSizeset.price_fob = null;
                    //Mac dinh price_sewingtarget =  20% price_cmp (tinh theo tien viet)
                    newSizeset.sewfobratio = 20;
                    newSizeset.price_sewingcost = null;
                    newSizeset.price_sewingtarget = null;
                    newSizeset.salaryfund = null;
                    newSizeset.totalprice = null;
                    newSizeset.pcontract_price_d = pcontract_price_d;
                    priceStore.insert(0,newSizeset);
                }
            }  
            var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
            viewSizeset.getView().select(0);
            Ext.getCmp('PContract_PO_Edit_Price').setDisabled(true);
            this.onThoat();
        }
    
    }
})