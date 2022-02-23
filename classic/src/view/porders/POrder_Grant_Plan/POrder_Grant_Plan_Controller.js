Ext.define('GSmartApp.view.porders.POrder_Grant_Plan.POrder_Grant_Plan_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_Plan_Controller',
    init: function () {
    },

    control: {
        '#POrder_Grant_Plan_View': {
            afterrender: 'onAfterrender',
            itemclick: 'onItemClick'
        },
    },
    listen: {
        store: {
            'POrderGrant_SKU_PlanStore': {
                'loadStore_byPorderGrant_Done': 'onloadStore_byPorderGrant_Done'
            }
        }
    },

    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');
        // var porder_grantid_link = viewModel.get('porder_grantid_link');
        var startDate = eventRecord.get('StartDate');
        var endDate = eventRecord.get('EndDate');

        // console.log(eventRecord);

        var pcontractid_link = eventRecord.get('pcontractid_link');
        var porderid_link = eventRecord.get('porderid_link');
        var porder_grantid_link = eventRecord.get('porder_grantid_link');

        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        if(sourceView == 'SchedulePlan'){
            me.setLoading(true);
            // POrderGrant_SKU_PlanStore.loadStore_KeHoachVaoChuyen(pcontractid_link, porderid_link, porder_grantid_link);
            POrderGrant_SKU_PlanStore.loadStore_KeHoachVaoChuyen_async(pcontractid_link, porderid_link, porder_grantid_link);
            POrderGrant_SKU_PlanStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                         // this.fireEvent('logout');
                    } else {
                        m.CreateColumns();
                    }
                    POrderGrant_SKU_PlanStore.fireEvent('loadStore_byPorderGrant_Done');
                }
            });
        }
    },
    CreateColumns: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');

        var pcontractid_link = eventRecord.get('pcontractid_link');
        var porderid_link = eventRecord.get('porderid_link');
        var porder_grantid_link = eventRecord.get('porder_grantid_link');

        // console.log(me.headerCt.items.length);
        // return;
        var length = 4;
        //xóa cột sinh động
        for (var i = 0; i < me.headerCt.items.length; i++) {
            if (i > length - 1) {
                me.headerCt.remove(i);
                i--;
            }
        }
        var listtitle = [];

        me.setLoading(true);
        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.porderid_link = porderid_link;
        params.porder_grantid_link = porder_grantid_link;

        GSmartApp.Ajax.post('/api/v1/porder_grant_sku_plan/getDateFor_KeHoachVaoChuyen', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        // console.log(response);
                        var dataMap = response.dataMap;
                        var data = response.data;

                        // return;
                        for (var i = 0; i < data.length; i++) {
                            var dateData = data[i];
                            dateData.date = new Date(dateData.date);
                            // console.log(dateData.date);
                            // console.log(typeof dateData.date);
                            var date_string = Ext.Date.format(dateData.date,'d/m');
                            dateData.date_string = date_string;
                            listtitle.push(dateData.date_string.trim());
                            // console.log(date_string);
                        }
                        
                        // return;

                        for (var i = 0; i < listtitle.length; i++) {
                            if ("" + listtitle[i] == "") continue;
                            // console.log(listtitle[i]);
                            var column = Ext.create('Ext.grid.column.Column', {
                                text: listtitle[i],
                                sortable: false,
                                menuDisabled: true,
                                dataIndex: 'amountdate' + (i + 1),
                                width: 70,
                                renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                                    // amountdate' + (i + 1) + '_color'
                                    var status = record.get('amountdate' + (i + 1) + '_color');
                                    if(status == null) status = false;
                                    // metaData.tdCls = 'rowGreen';
                                    // console.log('amountdate' + (i + 1) + '_color');
                                    if(status){ 
                                        console.log('in here');
                                        metaData.tdCls = 'rowGreen';
                                        // meta.style = "background-color:green; color:white;";
                                        // meta.style = "color:red;";
                                    }else{
                                        metaData.tdCls =  'rowWhite';
                                        // meta.style = "background-color:white; color:black;";
                                        // meta.style = "color:black;";
                                    }
                                    return value;
                                },
                                listeners: {
                                    // beforecheckchange: 'onBeforecheckchange',
                                    // checkchange: 'onCheckchange',
                                    // headerclick: 'onHeaderClick'
                                },
                            })
                            me.headerCt.insert(length, column);
                            length++;
                        }

                        m.setDateData(data);
                    }
                }
            })


    },
    setDateData: function(data){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        // console.log(m.getView());
        // console.log(me.getHeaderContainer());
        // console.log(data);

        for(var i = 0; i < data.length; i++){
            var pordergrantid_link = data[i].pordergrantid_link;
            var record = POrderGrant_SKU_PlanStore.findRecord('id', pordergrantid_link, 0, false, true, true);
            // console.log(record);
            var gridDataColumns = me.getHeaderContainer().gridDataColumns;
            for(var j = 0; j < gridDataColumns.length; j++){
                if(gridDataColumns[j].text == data[i].date_string){
                    record.set(gridDataColumns[j].dataIndex, data[i].amount);
                    if(data[i].is_ordered == true){
                        record.set(gridDataColumns[j].dataIndex + '_color', true);
                    }else{
                        record.set(gridDataColumns[j].dataIndex + '_color', false);
                    }
                }
            }
        }
        POrderGrant_SKU_PlanStore.commitChanges();
        // console.log(POrderGrant_SKU_PlanStore.getData());

    },
    onTaoLenhCapVai: function (grid, rowIndex, colIndex) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');

        var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
        // var rec = me.getStore().getAt(rowIndex);
        var rec = POrderGrant_SKU_PlanStore.getAt(rowIndex);
        // console.log(rec);

        // popup
        var form = Ext.create('Ext.window.Window', {
			height: 500,
			width: 400,
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Danh sách ngày',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'POrder_Grant_Plan_Date_View',
                viewModel:{
                    data: {
                        pordergrant: rec
                    }
                }
			}]
		});
		form.show();

		form.down('#POrder_Grant_Plan_Date_View').getController().on('Thoat', function () {
			form.close();
		})

        form.down('#POrder_Grant_Plan_Date_View').getController().on('createStockoutOrder_popup', function ( dateList, pordergrantid_link) {
			// console.log(dateList);
            // console.log(pordergrantid_link);
            var date_list = new Array();
            for(var i=0; i<dateList.length; i++){
                date_list.push(dateList[i].get('date'));
            }
            // return;
            m.createStockoutOrder_window(date_list, pordergrantid_link);
            form.close();
		})
    },
    createStockoutOrder_window: function(date_list, pordergrantid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');

        // return;

        // popup
        var form = Ext.create('Ext.window.Window', {
			height: '90%',
            width: '95%',
			closable: true,
			resizable: false,
			modal: true,
			border: false,
			title: 'Yêu cầu xuất',
			closeAction: 'destroy',
			bodyStyle: 'background-color: transparent',
			layout: {
				type: 'fit', // fit screen for window
				padding: 5
			},
			items: [{
				xtype: 'POrder_Grant_Plan_StockoutOrder_Edit_View',
                viewModel:{
                    data: {
                        id: null, // stockout_order id
                        date_list: date_list,
                        pordergrantid_link: pordergrantid_link,
                        eventRecord: eventRecord
                    }
                }
			}]
		});
		form.show();

		form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('Thoat', function () {
			form.close();
		})
        form.down('#POrder_Grant_Plan_StockoutOrder_Edit_View').getController().on('createStockoutOrder', function () {
			// code here: reload store ...
            var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
            Stockout_order_Store.load();
            form.close();
		})
    },
    onloadStore_byPorderGrant_Done: function () {
        this.getView().setLoading(false);
    },
    //
    onItemClick: function(grid, record, item, index, e, eOpts){
        console.log(record);
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var porder_grantid_link = record.get('id');
        var stockouttypeid_link = 1;
        var page = 1;
        var limit = 500;
        var stockoutorderdate_from = new Date(2010, 0, 1, 0, 0, 0, 0);
        var stockoutorderdate_to = new Date(2040, 0, 1, 0, 0, 0, 0);

        var Stockout_order_Store = viewModel.getStore('Stockout_order_Store');
        Stockout_order_Store.loadStore_byPage_KeHoachSanXuat(
            stockoutorderdate_from, stockoutorderdate_to, 
            page, limit, null, 
            stockouttypeid_link, porder_grantid_link);
    }
})