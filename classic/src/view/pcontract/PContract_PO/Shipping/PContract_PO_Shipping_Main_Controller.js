Ext.define('GSmartApp.view.pcontract.PContract_PO_Shipping_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Shipping_Main_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        if(viewmodel.get('id') > 0){
            this.getInfo(viewmodel.get('id'));
        } else {
            this.getInfo(null);
        }
        
        var PortStore = viewmodel.getStore('PortStore');
        PortStore.loadStore(null,null);
        var PackingTypeStore = viewmodel.getStore('PackingTypeStore');
        PackingTypeStore.loadStore();        
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu' : {
            click: 'onSave'
        }
    },
    getInfo: function(id){
        var viewmodel = this.getViewModel();
        if (null != id){
            var params = new Object();
            params.id = id;
            GSmartApp.Ajax.post('/api/v1/po_shipping/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        viewmodel.set('shipping', response.data);

                        //Chuyen packing notice ve array
                        var packing_str = response.data.packingnotice;
                        var packing_arr = packing_str.split(';');
                        viewmodel.set('shipping.packingnotice', packing_arr);

                        var store = viewmodel.getStore('Shipping_DStore');
                        store.removeAll();
                        store.insert(0 , response.data.shipping_d); 
                    }
                }
            })
        } else {
            var new_shipping = new GSmartApp.model.pcontract.PContractPO_Shipping();
            new_shipping.data.id = null;

            //Lay thong tin parent po
            var params = new Object();
            params.id = viewmodel.get('pcontract_poid_link');
            GSmartApp.Ajax.post('/api/v1/pcontract_po/getone', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    // console.log(response);
                    if(response.respcode == 200){
                        var parent_po = response.data;
                        new_shipping.data.pcontract_poid_link = parent_po.id;
                        new_shipping.data.pcontractid_link = parent_po.pcontractid_link;
                        new_shipping.data.productid_link = parent_po.productid_link;
                        new_shipping.data.shipdate = parent_po.shipdate;
                        new_shipping.data.shipamount = 0;
                        new_shipping.data.packingnotice = parent_po.packingnotice;
                        
                        viewmodel.set('shipping', new_shipping.data);
                    }
                }
            })            
           
        }
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSave: function(){
        var me = this;
        var viewmodel = this.getViewModel();

        var packing_arr = viewmodel.get('shipping.packingnotice'); 
        var packingnotice = '';
        for(i=0;i<packing_arr.length;i++){
            packingnotice = packingnotice + packing_arr[i];
            if (i < packing_arr.length-1) packingnotice = packingnotice  + ';';
        } 
        viewmodel.set('shipping.packingnotice',packingnotice);    

        var params = new Object();
        params.data = viewmodel.get('shipping');

        var arrShippingD = [];
        var Shipping_DStore = viewmodel.get('Shipping_DStore');
        
        Shipping_DStore.each(function (record) {
            //Neu la lenh moi (sencha tu sinh id) --> set = null
            if(!Ext.isNumber(record.data.id)) record.data.id = null;
            arrShippingD.push(record.data);
        });
        params.data.shipping_d = arrShippingD;

        GSmartApp.Ajax.post('/api/v1/po_shipping/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                   
                    if(response.respcode == 200){
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lưu thành công',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function(){
                                me.getInfo(response.id);
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lưu thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            })
    },
    onAddSKUTap: function(){
        var viewmodel = this.getViewModel();
        var shipping = viewmodel.get('shipping');
        var me = this;
        if (null != shipping){
            var form = Ext.create('Ext.window.Window', {
                height: 500,
                closable: true,
                title: 'Chi tiết màu, cỡ',
                resizable: false,
                modal: true,
                border: false,
                closeAction: 'destroy',
                width: 400,
                bodyStyle: 'background-color: transparent',
                layout: {
                    type: 'fit', // fit screen for window
                    padding: 5
                },
                items: [{
                    border: false,
                    xtype: 'PContract_POrder_SKUSelect',
                    pcontract_poid_link: shipping.pcontract_poid_link,
                    pcontractid_link: shipping.pcontractid_link
                }]
            });
            form.show();
            //Refresh Data
            //Refresh Data
            form.down('#PContract_POrder_SKUSelect').on('SKUSave', function (select) {
                var Shipping_DStore = viewmodel.get('Shipping_DStore');
                for (var i = 0; i < select.length; i++) {
                    var data = select[i].data;
                    var newShipping_D = new Object();
                    newShipping_D.id = null;
                    newShipping_D.skuid_link = data.skuid_link;
                    newShipping_D.skucode = data.skuCode;
                    newShipping_D.mauSanPham = data.mauSanPham;
                    newShipping_D.coSanPham = data.coSanPham;
                    newShipping_D.amount = data.pquantity_total;
                    Shipping_DStore.insert(0,newShipping_D);
                }                  
                form.close();
            })       
        }        
    },
    onXoaSKU: function(grid, rowIndex, colIndex){
        var me=this;
        var objDel = grid.getStore().getAt (rowIndex);
        Ext.Msg.show({
            title: "Thông báo",
            msg: 'bạn có chắc chắn muốn xóa dòng SKU?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    var objDel = grid.getStore().getAt (rowIndex);
                    grid.getStore().remove(objDel);
                }
            }
        });
    },    
    renderSum: function(value, summaryData, dataIndex){
        var viewmodel = this.getViewModel();
        viewmodel.set('shipping.shipamount',value);
        return '<div style="font-weight: bold; color:black;">' + Ext.util.Format.number(value, '0,000') + '</div>';      
    } 
})