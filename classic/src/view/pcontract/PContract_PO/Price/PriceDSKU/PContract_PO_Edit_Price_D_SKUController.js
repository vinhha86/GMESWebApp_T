Ext.define('GSmartApp.view.pcontract.PContract_PO.Price.PriceDSKU.PContract_PO_Edit_Price_D_SKUController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_PO_Edit_Price_D_SKUController',
    init: function(){
    },
    control: {      
        '#btnThemMoiGiaSKU': {
            click: 'onThemMoiGiaSKU'
        },
        '#PContract_PO_Edit_Price_D_SKU': {
            // beforecelldblclick: 'onBeforePriceCellDblClick',
            celldblclick: 'onPriceDSKUCellDblClick'
        }
    },
    onPriceDSKUCellDblClick: function(thisView, td, cellIndex, record, tr, rowIndex, e, eOpts ){
        var m = this;
        if(cellIndex == 1 || cellIndex == 2 || cellIndex == 3){
            // console.log(record);
            m.updateFabricPrice(record);
        }
    },

    updateFabricPrice: function(price_d_sku_record){
        var viewModel = this.getViewModel();
        var price_d_record = viewModel.get('price_d_record');
        var po_currencyid_link = viewModel.get('po.currencyid_link');
        var me = this.getView();
        var m = this;

        // console.log(price_d_sku_record);
        // console.log(price_d_record);

        var form = Ext.create('Ext.window.Window', {
            // height: 500,
            width: 300,
            closable: true,
            title: 'Chi tiết giá vải',
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                border: false,
                xtype: 'PriceDSKUDetail',
                viewModel: {
                    type: 'PriceDSKUDetailViewModel',
                    data: {
                        price_d_sku_record: price_d_sku_record, // price d sku record
                        price_d_record: price_d_record, // price d record
                        po_currencyid_link: po_currencyid_link 
                    }
                }
            }]
        });
        form.show();

        form.down('#PriceDSKUDetail').getController().on('updateFabricPrice', function (select) {
            // console.log(select);
            // console.log(price_d_sku_record);
            for(var i=0;i < select.length;i++){
                var unitprice = select[i].unitPrice;
                price_d_sku_record.set('unitprice', unitprice);

                var amount = price_d_sku_record.get('amount');
                if(unitprice != null && amount != null && amount > 0){
                    var totalprice = amount * unitprice;
                    totalprice = Math.round(amount * unitprice * 1000) / 1000;
                    price_d_sku_record.set('totalprice', totalprice );

                    // console.log(price_d_record);
                    m.reCalculatePriceDUnitprice(price_d_record);
                }
            }

            form.close();
        })
    },
    onThemMoiGiaSKU: function(){
        var me = this;
        var viewModel = this.getViewModel();
        price_d_record = viewModel.get('price_d_record');
        console.log(price_d_record);
        if(price_d_record == null){
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Bạn cần chọn một chi tiết giá',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else if(price_d_record.get('isfob') == false){
            Ext.Msg.show({
                title: "Thông báo",
                msg: 'Không được thêm chi tiết giá SKU cho giá CMP',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }else {
            me.addPContractPriceDSKU(price_d_record);
        }
    },
    addPContractPriceDSKU: function(record){
        var me = this.getView();
        var viewModel = this.getViewModel();

        var form = Ext.create({
            xtype: 'skusearchwindow',
            width: 1200,
            height: 500,       
            reference: 'skusearchwindow',
            closeAction: 'destroy',
            viewModel: {
                data: {
                    sourceview: 'PContract_PO_Edit_Price_D_SKU',
                    searchtype: 5,
                    // pcontractid_link: viewModel.get('PContract.id'),
                    // productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true,
                    
                    currencyid_link: viewModel.get('po.currencyid_link'), // tính đơn giá cho price_sku_d
                    unitid_link: record.get('unitid_link'), // tính đơn giá cho price_sku_d
                }
            }
        });
        form.show();

        form.getController().on('AddMaterialIdLink', function (rec) {
            console.log(rec);
            var pcontract_price_d_skus = record.get('pcontract_price_d_sku');
            if(pcontract_price_d_skus == null){
                // ko có pcontract_price_d_skus thì định nghĩa để ko bị null
                pcontract_price_d_skus = new Array();
            }
            
            for(var i = 0; i < rec.length;i++){
                var found = pcontract_price_d_skus.some(item => item.materialid_link === rec[i].id);

                if(!found){
                    var newPriceDSKU = new Object();
                    // newPriceDSKU.amount = 0;
                    // newPriceDSKU.totalprice = 0;
                    // newPriceDSKU.unitprice = 0
                    // newPriceDSKU.materialid_link = rec[i].get('id');
                    // newPriceDSKU.materialCode = rec[i].get('code');
                    // newPriceDSKU.color_name = rec[i].get('color_name');
                    // newPriceDSKU.size_name = rec[i].get('size_name');

                    newPriceDSKU.amount = 0;
                    newPriceDSKU.totalprice = 0;
                    newPriceDSKU.unitprice = rec[i].unitPrice;
                    newPriceDSKU.materialid_link = rec[i].id;
                    newPriceDSKU.materialCode = rec[i].code;
                    newPriceDSKU.color_name = rec[i].color_name;
                    newPriceDSKU.size_name = rec[i].size_name;

                    pcontract_price_d_skus.push(newPriceDSKU);
                }
            }

            record.set('pcontract_price_d_sku', []);
            record.set('pcontract_price_d_sku', pcontract_price_d_skus);
            viewModel.getStore('Price_D_SKUStore').loadData(pcontract_price_d_skus);

            form.close();
        })
    },
    onPriceDSKUItemBeforeEdit:function(){},
    onPriceDSKUItemEdit:function(editor, context){
        // console.log(context);
        var viewModel = this.getViewModel();
        var Price_D_SKUStore = viewModel.getStore('Price_D_SKUStore');
        var price_d_record = viewModel.get('price_d_record');

        if(context.value == "" || context.value == context.originalValue || isNaN(context.value)){
            Price_D_SKUStore.rejectChanges(); //commitChanges()
            return;
        }

        var amount = 0;
        var unitprice = 0;

        if(context.record.get('amount') != null && !isNaN(context.record.get('amount'))){
            amount = context.record.get('amount');
        }
        if(context.record.get('unitprice') != null && !isNaN(context.record.get('unitprice'))){
            unitprice = context.record.get('unitprice');
        }
        context.record.set('totalprice', amount*unitprice);
        Price_D_SKUStore.commitChanges(); //commitChanges()

        this.reCalculatePriceDUnitprice(price_d_record);
    },
    reCalculatePriceDUnitprice:function(price_d_record){
        var viewModel = this.getViewModel();
        var Price_DStore = viewModel.getStore('Price_DStore');
        var pcontract_price_d_sku = price_d_record.get('pcontract_price_d_sku');
        // console.log(price_d_record);
        // console.log(pcontract_price_d_sku);

        // tính tổng sl và tổng giá
        var amountSum = 0;
        var totalpriceSum = 0;

        for(var i = 0; i < pcontract_price_d_sku.length; i++) {
            var amount = parseFloat(pcontract_price_d_sku[i].amount);
            var unitprice = parseFloat(pcontract_price_d_sku[i].unitprice);

            if(!isNaN(amount)  &&  !isNaN(unitprice)){
                if(amount!= 0 && unitprice != 0){
                    var totalprice = amount * unitprice;
                    amountSum+=amount;
                    totalpriceSum+=totalprice;
                }
            }else{
                continue;
            }
        }

        // set đơn giá cho price_d
        var priceD_Unitprice = 0;
        if(amountSum > 0){
            priceD_Unitprice = totalpriceSum/amountSum;
        }
        price_d_record.set('unitprice', priceD_Unitprice);

        // tính giá chào cho price_d
        var priceD_lost_ratio = parseFloat(price_d_record.get('lost_ratio'));
        var priceD_quota = parseFloat(price_d_record.get('quota'));
        var priceD_price = 0;

        if(priceD_quota != null){
            if(priceD_lost_ratio != null){
                priceD_price = priceD_quota * priceD_Unitprice * (1 + priceD_lost_ratio/100)
            }else{
                priceD_price = priceD_quota * priceD_Unitprice;
            }
        }
        // console.log(priceD_lost_ratio);
        // console.log(priceD_quota);
        // console.log(priceD_Unitprice);
        // console.log(priceD_price);
        price_d_record.set('price', priceD_price);
        Price_DStore.commitChanges();

        this.calculateSumFOB();
    },
    calculateSumFOB: function(){
        var viewModel = this.getViewModel();
        var PContract_PO_Edit_PriceView = Ext.getCmp('PContract_PO_Edit_Price');
        var PContract_PO_Edit_PriceViewController = PContract_PO_Edit_PriceView.getController();
        // tính tổng fob
        var Price_DStore = viewModel.getStore('Price_DStore');
        var viewSizeset = Ext.getCmp('PContract_PO_Edit_Sizeset');
        var price_data = viewSizeset.getView().selection.data;

        Price_DStore.filter('isfob',true);
        var fobSum = Price_DStore.sum('price');
        Price_DStore.clearFilter();
        price_data.price_fob = fobSum;
        var totalprice = price_data.price_cmp + price_data.price_fob;
        price_data.totalprice = totalprice;
        // console.log(totalprice);
        
        viewModel.set('po_price',price_data);

        //Neu khong phai la sizesetAll --> Tinh toan cho SizesetAll cua san pham do
        if (price_data.sizesetid_link != 1){
            PContract_PO_Edit_PriceViewController.calPrice_SizesetAll(viewModel.get('product_selected_id_link'));
        }

        //Tinh SizesetAll cho san pham cha
        PContract_PO_Edit_PriceViewController.calPrice_PairProduct();
    },
    onMenu_PriceDSKUList: function(grid, rowIndex, colIndex, item, e, record){
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Xoá chi tiết giá SKU',
                reference: 'deletePriceD',
                separator: true,
                margin: '0 0 0',
                iconCls: 'x-fa fas fa-trash violetIcon',
                handler: function() {
                    // var record = this.parentMenu.record;
                    me.onPriceDSKU_Delete(grid, rowIndex, colIndex);
                }
            }
        ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX()-10, e.getY()-10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
    },
    onPriceDSKU_Delete: function(grid, rowIndex, colIndex){
        var viewModel = this.getViewModel();
        var me=this;
        var price_d_record = viewModel.get('price_d_record');
        var price_d_sku_record = viewModel.get('price_d_sku_record');

        Ext.Msg.show({
            title: "Thông báo",
            msg: 'Bạn có chắc chắn muốn xóa dòng chi tiết giá SKU?',
            buttons: Ext.MessageBox.YESNO,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function(btn){
                if(btn==='yes'){
                    var objDel = grid.getStore().getAt(rowIndex);
                    grid.getStore().remove(objDel);

                    console.log(price_d_record);
                    console.log(price_d_sku_record);
                    console.log(objDel);

                    var materialid_link = objDel.get('materialid_link');
                    const condition = (obj) => obj.materialid_link == materialid_link;
                    var index = price_d_sku_record.findIndex(condition);
                    price_d_sku_record.splice(index, 1);

                    // var result = price_d_sku_record.filter(obj => {
                    //     return obj.materialid_link == materialid_link
                    // })
                    // price_d_sku_record

                    me.reCalculatePriceDUnitprice(price_d_record);
                }
            }
        });
    },
})