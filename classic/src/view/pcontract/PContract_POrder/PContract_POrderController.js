Ext.define('GSmartApp.view.pcontract.PContract_POrderController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrderController',
    init: function () {
         var viewmodel = this.getViewModel();
         var porderReqStore = viewmodel.getStore('porderReqStore');
         porderReqStore.setGroupField('productinfo');
    },
    control:{
        '#btnSKUSelect':{
            click: 'onSKUSelect'
        },
        '#PContract_POList':{
            itemclick: 'onSelectParentPO'
        },
        '#PO_ChildList':{
            itemclick: 'onSelectPO'
        },
        'PContract_POrder_Porders': {
            select: 'onSelectPOrder'
        },
        'PContract_POrder_Req': {
            itemclick: 'onSelectPOrder_Req'
        },
        
    },
    onAddPorderReq: function(){
        var viewmodel = this.getViewModel();

        if(viewmodel.get('po_selected.id') == null) {
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn PO",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm yêu cầu xếp kế hoạch',
            closeAction: 'destroy',
            height: 150,
            width: 400,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Form_SelectOrg_PorderReq',
                viewModel: {
                    data: {
                        pcontractpo_id_link: viewmodel.get('po_selected.id'),
                        pcontractid_link: viewmodel.get('po_selected.pcontractid_link'),
                        productid_link: viewmodel.get('po_selected.productid_link')
                    }
                }
            }]
        });
        form.show();   

        form.down('#Form_SelectOrg_PorderReq').getController().on('Chon', function(){
            var storePO = viewmodel.getStore('porderReqStore');
            storePO.load();
            var PContractProductPOStore = viewmodel.getStore('PContractProductPOStore');
            PContractProductPOStore.load();
            form.close();
        })
    },
    onXoaPorderReq: function(objDel){
        var viewmodel = this.getViewModel();
        // var objDel = grid.getStore().getAt (rowIndex);

        Ext.Msg.confirm('Yêu cầu SX', 'Bạn có thực sự muốn xóa Yêu cầu SX? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {

                    if(Ext.isNumber(objDel.data.id)){
                        var params=new Object();
                        params.id = objDel.data.id;
                        GSmartApp.Ajax.post('/api/v1/porder_req/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (!success) {
                                Ext.MessageBox.show({
                                    title: "Yêu cầu SX",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                            else {
                                var porderReqStore = viewmodel.getStore('porderReqStore');
                                if (null!=porderReqStore){
                                    porderReqStore.remove(objDel);
                                }
                                // grid.getStore().remove(objDel);
                            }
                            // porderReqStore.reload();
                        }); 
                    }
                }
            } );        
    },
    onCheckCalculate: function( col, rowIndex, checked, record, e, eOpts){
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.porder_reqid_link = record.get('id');
        params.check = checked;

        GSmartApp.Ajax.post('/api/v1/porder_req/update_iscalculate', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            var porderSKUStore = viewmodel.getStore('porderReqStore');
                            porderSKUStore.commitChanges();
                        } else {
                            Ext.MessageBox.show({
                                title: "Thông báo",
                                msg: "Có lỗi trong quá trình xử lý dữ liệu! Bạn vui lòng thử lại",
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                },
                                fn: function(){
                                    record.set('is_calculate', !checked);
                                }
                            });
                        }
                    }); 
    },
    onEditPorderReq: function(editor, context, e){
        var viewmodel = this.getViewModel();

        if(viewmodel.get('po_selected.isauto_calculate')) {
            var porderReqStore = viewmodel.getStore('porderReqStore');

            var count = 0;
            var amount_fix =0 ;
            var curRec = porderReqStore.getAt(context.rowIdx);
            for(var i=0; i<porderReqStore.data.length;i++){
                var rec = porderReqStore.data.items[i];
                if(curRec.get('productid_link') == rec.get('productid_link') && curRec.get('id') != rec.get('id')) {
                    if(rec.get('is_calculate')){
                        amount_fix += rec.get('totalorder');
                    }
                    else
                    count++;
                }
            }
    
            var po_quantity = parseFloat(viewmodel.get('po_selected.po_quantity').toString().replace(/,/gi,''));
            po_quantity = po_quantity * context.record.get('amount_inset') - context.value;

            var amount = 0;
            if(count > 1){
                amount = (po_quantity - amount_fix ) / (count-1);
            }
            else {
                amount = po_quantity - amount_fix;
            }

            if(po_quantity - amount_fix >= context.value){
                // for (var i = 0; i < porderReqStore.data.length; i++) {
                //     var rec = porderReqStore.data.items[i];
                //     if(rec.get('productid_link') != curRec.get('productid_link')) continue;
                //     if (!rec.get('is_calculate') && rec.get('granttoorgcode') != curRec.get('granttoorgcode')) {
                //         rec.set('totalorder', amount);
                //     }
                // }

                porderReqStore.each(function (record) {
                    if (!record.get('is_calculate') && record.get('productid_link') == curRec.get('productid_link') 
                    && record.get('id') != curRec.get('id')) {
                        if (po_quantity-amount >= amount -1 ){
                            record.set('totalorder', amount);
                            po_quantity = po_quantity - amount;
                        }
                        else
                            record.set('totalorder', po_quantity);//Lay phan con lai
                    }
                });  
            }            
            else
            {
                curRec.set('totalorder', context.originalValue);
            }
        }
    },
    onFilterProduct: function(combo, record, eOpts ){
        var store = this.getViewModel().getStore('PContractPOList');
        var productid_link = record.get('productid_link');
        var pcontractid_link = this.getViewModel().get('PContract.id');

        store.loadLeafOnly_ByContract(pcontractid_link , productid_link);
    },
    onSelectPO: function(m, rec){
        var viewmodel = this.getViewModel();
        var po_id = rec.data.id;
        viewmodel.set('po_selected', rec.data);

        //Lay danh sach POrder_Req
        var porderReqStore = viewmodel.getStore('porderReqStore');
        porderReqStore.loadByPO(po_id);

        this.refreshSKUList(null);
        viewmodel.set('porder_selected',null);
    },
    onSelectParentPO: function(m, rec){
        var viewmodel = this.getViewModel();
        var porderReqStore = viewmodel.getStore('porderReqStore');
        porderReqStore.removeAll();

        this.refreshSKUList(null);
        viewmodel.set('porder_selected',null);
    },
    onSelectPOrder_Req: function(m, rec){
        var viewmodel = this.getViewModel();
        // var porder_req_id = rec.data.id;
        // var po_id = viewmodel.get('po_selected').id;
        
        //1 Porder_req chi co duy nhat 1 Porder duoc tao
        if (rec.data.porderlist.length > 0){
            var porder = rec.data.porderlist[0];
            viewmodel.set('porder_selected',porder);
            this.refreshSKUList(porder.id);
        } else {
            viewmodel.set('porder_selected',null);
            this.refreshSKUList(null);
        }
    },

    onSelectPOrder: function(m, rec){
        this.refreshSKUList(rec.data.id);
    },
    refreshSKUList:function(orderid){
        var viewmodel = this.getViewModel();
        //Lay danh sach POrders_SKU
        var porderSKUStore = viewmodel.getStore('porderSKUStore');
        if ( null!= orderid)
            porderSKUStore.loadByPorderID(orderid);
        else
            porderSKUStore.removeAll();
    },
    onXoaSKU: function(rid, rowIndex, colIndex){
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Lệnh sản xuất', 'Bạn có thực sự muốn xóa SKU? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var porderSKUStore = viewmodel.getStore('porderSKUStore');
                    var record = porderSKUStore.getAt(rowIndex);
                    var params=new Object();
                    params.data = record.data;
                    GSmartApp.Ajax.post('/api/v1/porder/delete_sku', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            var porderSKUStore = viewmodel.getStore('porderSKUStore');
                            porderSKUStore.reload();
                        } else {
                            Ext.MessageBox.show({
                                title: "Lệnh sản xuất",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    }); 
                }
            } );        

    },
    onSKUSelect: function(){
        var viewmodel = this.getViewModel();
        var me = this;
        var po_data = viewmodel.get('po_selected');
        var porderView = Ext.getCmp('PContract_POrder_Porders');
        var porder_data = porderView.getView().selection.data;
        if (null != porder_data){
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
                    pcontract_poid_link: porder_data.pcontract_poid_link,
                    pcontractid_link: porder_data.pcontractid_link,
                    porderid_link: porder_data.id
                }]
            });
            form.show();
 
        }
    },    
    onSizeColorPickup:function(record){
        // console.log(record.data.productid_link);
        var productid_link = record.data.productid_link;
        var porderreqid_link = record.data.id;
        var me = this;
        var viewmodel = this.getViewModel();
        var po_selected = viewmodel.get('po_selected');
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Tạo lệnh sản xuất',
            closeAction: 'destroy',
            height: 465,
            width: 800,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_POrder_SizeColorPickup_Main',
                viewModel: {
                    data: {
                        po: po_selected,
                        porderreqid_link: porderreqid_link,
                        productid_link: productid_link
                    }
                }
            }]
        });
        form.show();  
        
        form.down('PContract_POrder_SizeColorPickup_Main').getController().on('GenPOrder',function(sizelist,colorlist){
            // for(i=0;i<product_select.length;i++){
            //     me.onPOrderCreateByProduct(porderreqid_link, product_select[i].data.id, sizelist, colorlist);
            // } 
            me.onPOrderCreateByProduct(porderreqid_link, productid_link, sizelist, colorlist);           
            form.close();
        });
        form.down('PContract_POrder_SizeColorPickup_Main').getController().on('GenPOrder_AllSKU',function(sizelist,colorlist){
            // for(i=0;i<product_select.data.items.length;i++){
            //     me.onPOrderCreateByProduct(porderreqid_link, product_select.data.items[i].data.id, sizelist, colorlist);
            // }            
            me.onPOrderCreateByProduct(porderreqid_link, productid_link, sizelist, colorlist);
            form.close();
        });
        form.down('PContract_POrder_SizeColorPickup_Main').getController().on('Thoat',function(){
            // var porderStore = viewmodel.getStore('porderStore');
            // porderStore.load();
            form.close();
        });
    },
    onPOrderCreateByProduct:function(porderreqid_link, productid_link, sizelist, colorlist){
        var viewmodel = this.getViewModel();
        var productStore = viewmodel.getStore('PContractProduct_PO_Store');
        productStore.loadStore_bypairid_Async(productid_link, null, true);

        productStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                    // this.fireEvent('logout');
                } else {
                    for(i=0;i<records.length;i++){
                        //Tao lenh sx cho tung san pham con
                        var params=new Object();
                        params.porderreqid_link = porderreqid_link;
                        params.productid_link = records[i].id;
                        params.size_list = sizelist;
                        params.color_list = colorlist;
                        // console.log(params);
                        GSmartApp.Ajax.post('/api/v1/porder_req/gen_porder', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                var porderStore = viewmodel.getStore('porderStore');
                                porderStore.reload();

                                var storereq = viewmodel.getStore('porderReqStore');
                                storereq.load();
                            } else {
                                Ext.MessageBox.show({
                                    title: "Lệnh sản xuất",
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        }); 
                    }
                }
            }
        });
    },
    onMenu_POrder: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Chi tiết lệnh',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-pencil greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onPOder_Edit(record);
                }
            }, 
            {
                text: 'Xóa lệnh',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-trash redIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onPOder_Delete(record);
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
    onMenu_POrder_Req: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;

        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
            {
                text: 'Tạo lệnh SX',
                itemId: 'btnGenPO_PContract_POrder',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-magic greenIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onPOder_Create(record);
                },
            }, 
            {
                text: 'Xóa yêu cầu SX',
                itemId: 'btnDel_PContract_POrder',
                separator: true,
                margin: '10 0 0',
                iconCls: 'x-fa fas fa-trash redIcon',
                handler: function(){
                    var record = this.parentMenu.record;
                    me.onXoaPorderReq(record);
                }
            }
        ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX()-10, e.getY()-10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },      

    onPOder_Edit: function(rec){
        var viewModel = this.getViewModel();
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Chi tiết lệnh',
            closeAction: 'destroy',
            height: 465,
            width: Ext.getBody().getViewSize().width*.95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_POrder_Edit_Main',
                viewModel: {
                    data: {
                        porder: rec,
                        isedit: true
                    }
                }
            }]
        });
        form.show();        
        form.down('PContract_POrder_Edit_Main').getController().on('Thoat',function(){
            var porderStore = viewModel.getStore('porderStore');
            if (null != porderStore) porderStore.load();
            
            //Refresh Porder_req de lay thong tin moi nhat ve Porder
            var porderReqStore = viewmodel.getStore('porderReqStore');
            porderReqStore.reload();
            var PContractPOList = viewmodel.get('PContractPOList');
            PContractPOList.reload();
            
            form.close();
        });
    }, 
    onPOder_Create: function(recPOder_Req){
        var me = this;
        var viewmodel = this.getViewModel();
        // if (recPOder_Req.data.porderlist.length > 0){
        //     Ext.MessageBox.show({
        //         title: "Lệnh sản xuất",
        //         msg: "Đã có lệnh sản xuất, không thể tạo thêm",
        //         buttons: Ext.MessageBox.YES,
        //         buttonText: {
        //             yes: 'Đóng',
        //         }
        //     });
        // } else {
            Ext.Msg.confirm('Lệnh sản xuất', 'Tạo lệnh sản xuất cho phân xưởng? chọn YES để thực hiện',
                function (choice) {
                    if (choice === 'yes') {
                        var rec = new Object();
                        rec.porderreqid_link = recPOder_Req.data.id;
                        rec.granttoorgid_link = recPOder_Req.data.granttoorgid_link;
                        rec.pcontractid_link = recPOder_Req.data.pcontractid_link;
                        rec.pcontract_poid_link = recPOder_Req.data.pcontract_poid_link;
                        rec.productid_link = recPOder_Req.data.productid_link;
                        rec.totalorder_req = recPOder_Req.data.totalorder;
                        rec.totalorder = recPOder_Req.data.totalorder;
                        var params=new Object();
                        params.data = rec;
                        params.isBypassSKUEmpty = false;
                        GSmartApp.Ajax.post('/api/v1/porder/create', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                me.POder_GetByID(response.id);
                                var porderReqStore = viewmodel.getStore('porderReqStore');
                                porderReqStore.reload();                                
                                // viewmodel.set('porder_selected',response.data);
                                // var porder = viewmodel.get('porder_selected');

                                // var form = Ext.create('Ext.window.Window', {
                                //     closable: true,
                                //     resizable: false,
                                //     modal: true,
                                //     border: false,
                                //     title: 'Thêm SKU vào Lệnh sản xuất',
                                //     closeAction: 'destroy',
                                //     height: 465,
                                //     width: Ext.getBody().getViewSize().width*.95,
                                //     bodyStyle: 'background-color: transparent',
                                //     layout: {
                                //         type: 'fit', // fit screen for window
                                //         padding: 5
                                //     },
                                //     items: [{
                                //         xtype: 'PContract_POrder_Edit_Main',
                                //         viewModel: {
                                //             data: {
                                //                 porder: porder,
                                //                 isedit: true
                                //             }
                                //         }
                                //     }]
                                // });
                                // form.show();        
                                // form.down('PContract_POrder_Edit_Main').getController().on('Thoat',function(data){
                                //     me.POder_GetByID(porder.id);
                                //     me.refreshSKUList(porder.id);
                                    
                                //     //Refresh Porder_req de lay thong tin moi nhat ve Porder
                                //     var porderReqStore = viewmodel.getStore('porderReqStore');
                                //     porderReqStore.reload();
                                //     var PContractPOList = viewmodel.get('PContractPOList');
                                //     PContractPOList.reload();

                                //     form.close();
                                // });                               
                            } else {
                                if (response.respcode == 1012){
                                    //Chua khai bao chi tiet SKU cho san pham
                                    Ext.Msg.confirm('Lệnh sản xuất', response.message + ". Tạo lệnh sản xuất chỉ với số lượng tổng?",
                                    function (choice) {
                                        if (choice === 'yes') {
                                            params.isBypassSKUEmpty = true;
                                            me.onPOder_Create_Again(params);
                                        }
                                    });                  
                                } else {
                                    Ext.MessageBox.show({
                                        title: "Lệnh sản xuất",
                                        msg: response.message,
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                            }
                        });                     
                    }
                });     
        // }   
    },  
    
    onPOder_Create_Again:function(params){
        var me=this;
        var viewmodel = this.getViewModel();        
        GSmartApp.Ajax.post('/api/v1/porder/create', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                me.POder_GetByID(response.data.id);
                //Refresh Porder_req de lay thong tin moi nhat ve Porder
                var porderReqStore = viewmodel.getStore('porderReqStore');
                porderReqStore.reload();
                var PContractPOList = viewmodel.get('PContractPOList');
                PContractPOList.reload();                               
            } else {
                Ext.MessageBox.show({
                    title: "Lệnh sản xuất",
                    msg: response.message,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        });
    },
    onPOder_Delete: function(rec){    
        var viewmodel = this.getViewModel();
        Ext.Msg.confirm('Lệnh sản xuất', 'Bạn có thực sự muốn xóa Lệnh sản xuất? chọn YES để thực hiện',
            function (choice) {
                if (choice === 'yes') {
                    var params=new Object();
                    params.id = rec.data.id;
                    GSmartApp.Ajax.post('/api/v1/porder/delete', Ext.JSON.encode(params),
                    function (success, response, options) {
                        var response = Ext.decode(response.responseText);
                        if (success) {
                            var porderStore = viewmodel.getStore('porderStore');
                            porderStore.load();

                            //Refresh Porder_req de lay thong tin moi nhat ve Porder
                            var porderReqStore = viewmodel.getStore('porderReqStore');
                            porderReqStore.reload();
                            var PContractPOList = viewmodel.get('PContractPOList');
                            PContractPOList.reload();

                        } else {
                            Ext.MessageBox.show({
                                title: "Lệnh sản xuất",
                                msg: response.message,
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    }); 
                }
            } );             
    },
    POder_GetByID: function(id){    
        var viewmodel = this.getViewModel();
        var params=new Object();
        params.porderid_link = id;
        GSmartApp.Ajax.post('/api/v1/porder/getone', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                viewmodel.set('porder_selected',response.data);
                console.log(response.data);                
            } else {
                Ext.MessageBox.show({
                    title: "Lệnh sản xuất",
                    msg: response.message,
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }
        });   
        
        //Refresh danh sach sku
        this.refreshSKUList(id);
    },
    renderSum: function(value, summaryData, dataIndex){
        var viewmodel = this.getViewModel();
        var po_totalorder = viewmodel.get('po_selected.po_quantity');
        if (null == po_totalorder) po_totalorder = 0;
        if (null == value) value = 0;
        if (po_totalorder != value)
            return '<div style="font-weight: bold; color:red;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
        else 
            return '<div style="font-weight: bold; color:black;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    },
    renderSumPOrder: function(value, summaryData, dataIndex){    
        return '<div style="font-weight: bold; color:black;">' + Ext.util.Format.number(value, '0,000') + '</div>';   
    }
})