Ext.define('GSmartApp.view.pcontract.PContract_POrder_Detail_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POrder_Detail_Controller',
    control: {
        '#btnAddSKU': {
            click: 'onAddSKU'
        },
        '#btnDeletePorder': {
            click: 'onPOder_Delete'
        },
    },   
    onAddSKU:function(){
        var me = this;
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder_selected');
        if (null != porder){
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
                            porder: porder,
                            isedit: true
                        }
                    }
                }]
            });
            form.show();        
            form.down('PContract_POrder_Edit_Main').getController().on('Thoat',function(){
                me.POder_GetByID(porder.id);
                me.refreshSKUList(porder.id);

                //Refresh Porder_req de lay thong tin moi nhat ve Porder
                var porderReqStore = viewmodel.getStore('porderReqStore');
                porderReqStore.reload();
                var PContractPOList = viewmodel.get('PContractPOList');
                PContractPOList.reload();
                form.close();
            });            
        }
    }, 
    onPorder_RemoveSKU:function(){
        me = this;
        var viewmodel = this.getViewModel();
        var porder = viewmodel.get('porder');
        var porderSKU_View = Ext.getCmp('PContract_POrder_Edit_PorderSKU').getView();
        var porderSKU_select = porderSKU_View.getSelectionModel().getSelection();
        var porderSKU_list = [];
        for (var i = 0; i < porderSKU_select.length; i++) {
            porderSKU_list.push(porderSKU_select[i].data);
        }

        var params=new Object();
        params.porderid_link = porder.data.id;
        params.data = porderSKU_list;

        if (porderSKU_list.length > 0){
            GSmartApp.Ajax.post('/api/v1/porder/delete_sku', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (!success) {
                    Ext.MessageBox.show({
                        title: "Chi tiết lệnh",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                } else {
                    me.reloadSKU();
                    var PContractPOList = viewmodel.get('PContractPOList');
                    PContractPOList.reload();
                }
            });    
        }    
    },
    renderSum: function (value) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onPorder_EditSKU: function(editor, context, e){
        var viewmodel = this.getViewModel;
        var grid = this.getView();
        if(context.value == context.originalValue) return;

        grid.setLoading(true);
        var viewmodel = this.getViewModel();
        var data = context.record.data;
        var params = new Object();
        params.data = data;

        GSmartApp.Ajax.post('/api/v1/porder/update_sku', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                var porderSKUStore = viewmodel.getStore('porderSKUStore');
                var response = Ext.decode(response.responseText);
                if (success) {
                    porderSKUStore.commitChanges();
                    var PContractPOList = viewmodel.get('PContractPOList');
                    PContractPOList.reload();
                } else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: 'Lưu thất bại: ' + response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Có'
                        }
                    });
                    porderSKUStore.rejectChanges();
                }
            })
    },   
    onPOder_Delete: function(){    
        var me=this;
        var viewmodel = this.getViewModel();
        if (null != viewmodel.get('porder_selected')){
            var porder = viewmodel.get('porder_selected');
            Ext.Msg.confirm('Lệnh sản xuất', 'Bạn có thực sự muốn xóa Lệnh sản xuất? chọn YES để thực hiện',
                function (choice) {
                    if (choice === 'yes') {
                        var params=new Object();
                        params.id = porder.id;
                        GSmartApp.Ajax.post('/api/v1/porder/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            var response = Ext.decode(response.responseText);
                            if (success) {
                                viewmodel.set('porder_selected',null);
                                me.refreshSKUList(null);
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
        }        
    },
    onPOrder_update: function(){
        var me=this;
        var viewmodel = this.getViewModel();   
        
        var porder = viewmodel.get('porder_selected');
        porder.plan_productivity = porder.plan_productivity == null ? 0 : parseFloat(porder.plan_productivity.toString().replace(/,/gi,''));
        porder.totalorder_req = porder.totalorder_req == null ? 0 : parseFloat(porder.totalorder_req.toString().replace(/,/gi,''));           
        
        var params=new Object();
        params.data = porder; 
        
        
        GSmartApp.Ajax.post('/api/v1/porder/update', Ext.JSON.encode(params),
        function (success, response, options) {
            var response = Ext.decode(response.responseText);
            if (success) {
                me.POder_GetByID(response.data.id);
                //Refresh Porder_req de lay thong tin moi nhat ve Porder
                var porderReqStore = viewmodel.getStore('porderReqStore');
                porderReqStore.reload();
                // var PContractPOList = viewmodel.get('PContractPOList');
                // PContractPOList.reload();                               
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
})