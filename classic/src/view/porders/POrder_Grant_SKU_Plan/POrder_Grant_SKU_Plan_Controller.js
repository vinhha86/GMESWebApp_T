

Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrder_Grant_SKU_Plan_Controller',
    init: function () {
        
    },
    control: {
        '#POrder_Grant_SKU_Plan_View': {
            afterrender: 'onAfterrender',
        },
        '#btnThoat': {
            click: 'onThoat',
        },
        '#btnTest': {
            click: 'onTest',
        },
    },

    onThoat: function(){
        this.getView().up('window').close();
    },
    onTest: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var POrderGrant_SKU_Store = viewModel.getStore('POrderGrant_SKU_Store');
        console.log(POrderGrant_SKU_Store.getData().items);
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');

        var POrderGrant_SKU_Store = viewModel.getStore('POrderGrant_SKU_Store');
        POrderGrant_SKU_Store.getSorters().add({
            property: 'maSanPham',
            direction: 'ASC'
        },{
            property: 'mauSanPham',
            direction: 'ASC'
        },{
            property: 'coSanPham',
            direction: 'ASC'
        });

        if(sourceView == 'SchedulePlan'){ // view ke hoach vao chuyen
            // set value danh sach po
            viewModel.set('lineinfo', eventRecord.get('lineinfo'));

            // load store
            m.loadStore();
        }else if(sourceView == 'Dashboard_KhoTP_POLine_Main'){ // view lenh xuat kho
            // console.log(eventRecord);
            if(eventRecord != null){
                // viewModel.set('lineinfo', eventRecord.get('lineinfo'));
                viewModel.set('lineinfo', eventRecord.lineinfo);
                m.loadStore();
            }
        }
    },
    loadStore: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        var POrderGrant_SKU_Store = viewModel.getStore('POrderGrant_SKU_Store');
        POrderGrant_SKU_Store.loadStore_byPorderGrant_grouped_async(porder_grantid_link);
        POrderGrant_SKU_Store.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					// POrderGrant_SKU_Store.fireEvent('logout');
                    // console.log('POrderGrant_SKU_Store.load failed');
				} else {
                    // console.log(records);

                    // set value tong so luong textfield
                    var total_grantamount = 0;
                    for(var i=0;i<records.length;i++){
                        total_grantamount+=records[i].get('grantamount') == null ? 0 : records[i].get('grantamount');
                    }
                    viewModel.set('total_porderGrant_SKU_grantamount', total_grantamount);

                    // them cot
                    if(sourceView == 'SchedulePlan'){
                        m.CreateColumns();
                    }else if(sourceView == 'Dashboard_KhoTP_POLine_Main'){
                        m.CreateColumns();
                    }
				}
			}
        });
    },
    CreateColumns: function () {
        var m = this;
        // var me = this.getView();
        var viewModel = this.getViewModel();
        var grid = this.getView();
        var POrderGrant_SKU_Store = viewModel.getStore('POrderGrant_SKU_Store');

        var length = 4;
        for (var i = 0; i < grid.headerCt.items.length; i++) {
            if (i > length - 1) {
                grid.headerCt.remove(i);
                i--;
            }
        }

        //
        var sourceView = viewModel.get('sourceView');
        var eventRecord = viewModel.get('eventRecord');
        var porder_grantid_link = viewModel.get('porder_grantid_link');

        // console.log(eventRecord);
        // var startDate = eventRecord.get('StartDate');
        // var endDate = eventRecord.get('EndDate');
        var startDate;
        var endDate;

        if(sourceView == 'SchedulePlan'){
            console.log(eventRecord);
            var startDate = eventRecord.get('StartDate');
            var endDate = eventRecord.get('EndDate');
        }else if(sourceView == 'Dashboard_KhoTP_POLine_Main'){
            console.log(eventRecord);
            var startDate = eventRecord.start_date_plan;
            var endDate = eventRecord.finish_date_plan;
        }

        grid.setLoading(true);
        
        var params = new Object();
        params.dateFrom = startDate;
        params.dateTo = endDate;
        params.porder_grantid_link = porder_grantid_link;

        // console.log(startDate);
        // console.log(endDate);
        // console.log(porder_grantid_link);
        // return;

        GSmartApp.Ajax.post('/api/v1/porder_grant_sku_plan/getDateInfo_ByPOrderGrant', Ext.JSON.encode(params),
            function (success, response, options) {
                grid.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var mapResponse = response.map;

                    // lay danh sach ngay de them cot
                    var listtitle = [];
                    var map = new Map(Object.entries(mapResponse));
                    var keys = Array.from(map.keys());
                    for(var i=0; i < keys.length; i++){
                        var date = Date.parse(keys[i]);
                        date = new Date(date);
                        var dateObj = new Object();
                        dateObj.date = date;
                        dateObj.dateStr = Ext.Date.format(date,'d-m-y');
                        dateObj.dateStrShort = Ext.Date.format(date,'d-m');
                        dateObj.mSec = date.getTime(); 
                        listtitle.push(dateObj);
                    }
                    listtitle.sort(function(a,b){
                        return a.date - b.date;
                    });
                    viewModel.set('listtitle', listtitle);

                    // them cot
                    for (var i = 0; i < listtitle.length; i++) {
                        if ("" + listtitle[i] == "") continue;
                        var column = Ext.create('Ext.grid.column.Column', {
                            text: listtitle[i].dateStrShort, // info
                            textLong: listtitle[i].dateStr, // info
                            textDate: listtitle[i].date, // info
                            sortable: false,
                            menuDisabled: true,
                            dataIndex: 'date' + (i + 1),
                            // headerCheckbox: true,
                            // flex: 1,
                            width: 80,
                            align: 'end', 
                            editor: {
                                xtype: 'numberfield', 
                                hideTrigger:true, 
                                // allowBlank: false, 
                                maxValue: 1000000000, 
                                selectOnFocus: false,
                                maskRe: /[0-9]/,
                                // enableKeyEvents : true,
                                // listeners: {
                                //     specialkey: 'onEnter'
                                // },
                            },
                            // renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                            //     if(value == null) value = 0;
                            //     metaData.tdAttr = 'data-qtip="' + value + '"';
                            //     return value;
                            // },
                            summaryType: 'sum', 
                            summaryRenderer: 'renderSum',
                        })
                        grid.headerCt.insert(length, column);
                        length++;
                    }

                    // set value amount cho tung date
                    m.setGridData(map);

                    // grid.setLoading(false);
                }
            })
    },

    setGridData: function(map){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        me.setLoading(true);
        var POrderGrant_SKU_Store = viewModel.getStore('POrderGrant_SKU_Store');
        var columns = me.getColumns();
        var items = POrderGrant_SKU_Store.getData().items;

        // set gia tri truong = null (for summary)
        for(var i=0;i<columns.length;i++){
            var column = columns[i];
            var fullColumnIndex = column.fullColumnIndex;
            var dataIndex = column.dataIndex;
            if(fullColumnIndex >= 4){ // cot thu 5 tro di (ngay)
                for(var j=0;j<items.length;j++){
                    items[j].set(dataIndex, null);
                }
            }
        }
        POrderGrant_SKU_Store.commitChanges();

        // set amount data
        var arr = [];
        map.forEach((value, name) => arr.push({ name, value }));
        for(var i=0;i<arr.length;i++){ // ngay
            var values = arr[i].value;
            if(values != null && values.length > 0){
                for(var j=0;j<values.length;j++){ // sku
                    var value = values[j];
                    var skuid_link = value.skuid_link;
                    var record = POrderGrant_SKU_Store.findRecord("skuid_link", skuid_link, 0, false, false, true);
                    var date = new Date(value.date);
                    var dateStr = Ext.Date.format(date,'d-m-y');

                    for(k=0;k<columns.length;k++){
                        var column = columns[k];
                        var textLong = column.textLong;

                        if(dateStr == textLong){
                            record.set(column.dataIndex, value.amount);
                        }
                    }
                }
            }
        }
        POrderGrant_SKU_Store.commitChanges();
        me.setStore(POrderGrant_SKU_Store);

        me.setLoading(false);
    },

    onDateAmountEdit: function(editor, e, eOpts){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var POrderGrant_SKU_Store = viewModel.getStore('POrderGrant_SKU_Store');

        var column = editor.context.column;
        var dataIndex = editor.context.column.dataIndex;

        var skuid_link = e.record.get('skuid_link');
        var pordergrantid_link = e.record.get('pordergrantid_link');
        var date = column.textDate;

        // console.log(editor);
        // console.log(e);
        // console.log(column);
        // console.log(dataIndex);
        //
        if(e.value == e.originalValue){
            e.cancel = true;
            return false;
        }

        // check tong sl cac ngay co vuot qua sl tong
        var columns = me.getColumns();
        var record = POrderGrant_SKU_Store.findRecord("skuid_link", skuid_link, 0, false, false, true);
        var totalAmount = 0;
        for(i=0;i<columns.length;i++){
            var columnObj = columns[i];
            // console.log(columnObj);
            if(columnObj.fullColumnIndex >= 4){ // cot thu 5 tro di -> lay amount de tinh
                if(columnObj.dataIndex != dataIndex){
                    totalAmount+= record.get(columnObj.dataIndex) == null ? 0 : record.get(columnObj.dataIndex);
                }
            }
        }
        totalAmount+=e.value == null ? 0 : e.value;

        if(totalAmount > record.get('grantamount')){ // sl nhap tong > sl tong
            Ext.MessageBox.show({
                title: "Kế hoạch vào chuyền",
                msg: 'Tổng SL nhập ('+ totalAmount +') không được lớn hơn SL tổng ('+ record.get('grantamount') +')',
                
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            
            e.cancel = true;
            return false;
        }else{
            //Neu du lieu OK --> Update new value vao record data
            e.record.data[e.field] = e.value;

            // return;
            var params=new Object();
            params.amount = e.value;
            params.skuid_link = skuid_link;
            params.porder_grantid_link = pordergrantid_link;
            params.date = date;

            GSmartApp.Ajax.post('/api/v1/porder_grant_sku_plan/save_porder_grant_sku_plan', Ext.JSON.encode(params),
			function (success, response, options) {
				if (success) {
                    var response = Ext.decode(response.responseText);
                    console.log('Lưu thành công.');
                    e.record.beginedit;
                    e.record.set(dataIndex, e.value);
                    e.record.endedit;
                    e.record.commit();

                    if (e.rowIdx < POrderGrant_SKU_Store.data.length - 1) {
                        var cellediting = me.getPlugin('cellediting');
                        cellediting.startEditByPosition({
                            row: (e.rowIdx + 1),
                            column: e.colIdx
                        });
                    }

                    return true;
				} else {
                    Ext.MessageBox.show({
                        title: "Kế hoạch vào chuyền",
                        msg: 'Lưu kế hoạch vào chuyền thất bại.',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    return true;
                }
            });
        }
    },

    onEnter: function(field, e){
        console.log('enter here');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var POrderGrant_SKU_Store = viewModel.getStore('POrderGrant_SKU_Store');
        if(e.getKey() == e.ENTER) {
            console.log('enter here 2');
            console.log(e);
            console.log(e.rowIdx);
            console.log(POrderGrant_SKU_Store.data.length - 1);
            if (e.rowIdx < POrderGrant_SKU_Store.data.length - 1) {
                console.log('enter here 3'); 
                var cellediting = me.getPlugin('cellediting');
                cellediting.startEditByPosition({
                    row: (e.rowIdx + 1),
                    column: e.colIdx
                });
            }
        }
    },

    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,

    // CreateColumns: function () {
    //     var m = this;
    //     // var me = this.getView();
    //     var viewModel = this.getViewModel();
    //     var grid = this.getView();

    //     var length = 4;
    //     for (var i = 0; i < grid.headerCt.items.length; i++) {
    //         if (i > length - 1) {
    //             grid.headerCt.remove(i);
    //             i--;
    //         }
    //     }
    //     var listtitle = [];
    //     var listid = [];

    //     var pcontractid_link = viewModel.get('pcontractid_link');
    //     var productid_link = viewModel.get('productid_link');

    //     if (productid_link != 0 && productid_link != null) {
    //         grid.setLoading('Đang lấy dữ liệu');
    //         //kiem tra mau co trong sku khong thi moi sinh tab 
    //         var params = new Object();
    //         params.pcontractid_link = pcontractid_link;
    //         params.productid_link = productid_link;

    //         GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
    //             function (success, response, options) {
    //                 grid.setLoading(false);
    //                 if (success) {
    //                     var response = Ext.decode(response.responseText);

    //                     for (var i = 0; i < response.data.length; i++) {
    //                         var data = response.data[i];
    //                         if (!listid.includes(data.sizeid_link)) {
    //                             listid.push(data.sizeid_link);
    //                             listtitle.push(data.coSanPham);
    //                         }
    //                     }

    //                     for (var i = 0; i < listtitle.length; i++) {
    //                         if ("" + listtitle[i] == "") continue;

    //                         var column = Ext.create('Ext.grid.column.Column', {
    //                             text: listtitle[i],
    //                             columns: [{
    //                                 text: 'CĐ',
    //                                 dataIndex: listid[i].toString(),
    //                                 width: 65,
    //                                 format: '0.0000',
    //                                 align: 'right',
    //                                 renderer: function (value, metaData, record) {
    //                                     if (value == 0) return "";
    //                                     return Ext.util.Format.number(value, '0.0000')
    //                                 }
    //                             }, {
    //                                 text: 'KT',
    //                                 columns: [{
    //                                     text: 'Viền',
    //                                     dataIndex: listid[i] + "_Vien",
    //                                     cls: 'titleRed',
    //                                     width: 65,
    //                                     format: '0.0000',
    //                                     align: 'right',
    //                                     renderer: function (value, metaData, record) {
    //                                         if (value == 0) return "";
    //                                         return Ext.util.Format.number(value, '0.0000')
    //                                     },
    //                                     getEditor: function (record) {
    //                                         if (record.get('type') == 0) {
    //                                             return Ext.create('Ext.grid.CellEditor', {
    //                                                 field: {
    //                                                     xtype: 'textfield',
    //                                                     selectOnFocus: true,
    //                                                     maskRe: /[0-9]/
    //                                                 }
    //                                             })
    //                                         }
    //                                     },
    //                                 }, {
    //                                     text: 'SĐ',
    //                                     dataIndex: listid[i] + "_KT",
    //                                     cls: 'titleRed',
    //                                     width: 65,
    //                                     format: '0.0000',
    //                                     align: 'right',
    //                                     renderer: function (value, metaData, record) {
    //                                         if (value == 0) return "";
    //                                         return Ext.util.Format.number(value, '0.0000')
    //                                     }
    //                                 }, {
    //                                     text: 'Tổng',
    //                                     dataIndex: listid[i] + "_Tong",
    //                                     cls: 'titleRed',
    //                                     width: 70,
    //                                     format: '0.0000',
    //                                     align: 'right',
    //                                     renderer: function (value, metaData, record) {
    //                                         if (value == 0) return "";
    //                                         return Ext.util.Format.number(value, '0.0000')
    //                                     }
    //                                 }]
    //                             }, {
    //                                 text: 'SX',
    //                                 dataIndex: listid[i] + "_SX",
    //                                 cls: 'titleRed',
    //                                 width: 65,
    //                                 format: '0.0000',
    //                                 align: 'right',
    //                                 renderer: function (value, metaData, record) {
    //                                     if (value == 0) return "";
    //                                     return Ext.util.Format.number(value, '0.0000')
    //                                 }
    //                             }]
    //                         })
    //                         grid.headerCt.insert(length, column);
    //                         length++;
    //                     }

    //                     var storeBOM = grid.getStore();

    //                     var model = storeBOM.getModel();
    //                     var fields = model.getFields();
    //                     for (var i = 0; i < fields.length; i++) {
    //                         if (i > 21) {
    //                             model.removeFields(fields[i].name);
    //                         }
    //                     }

    //                     var fieldnew = [];
    //                     for (var i = 0; i < listid.length; i++) {
    //                         fieldnew.push({ name: listid[i], type: 'number' });
    //                     }

    //                     model.addFields(fieldnew);
    //                     // storeBOM.getbom_by_porder(porderid_link);
    //                 }
    //             })
    //     }


    // }

})

// Ext.define('GSmartApp.view.porders.POrder_Grant_SKU_Plan.POrder_Grant_SKU_Plan_Controller', {
//     extend: 'Ext.app.ViewController',
//     alias: 'controller.POrder_Grant_SKU_Plan_Controller',
//     init: function () {
//     },

//     control: {
//         '#POrder_Grant_SKU_Plan_View': {
//             afterrender: 'onAfterrender',
//             // itemclick: 'onItemclick',
//             pivotitemclick: 'onPivotitemclick'
//         },
//         '#btnThoat': {
//             click: 'onThoat',
//         },
//         // '#slTong': {
//         //     afterrender: 'onAfterrenderSltong',
//         // },
//         // '#lineinfo': {
//         //     afterrender: 'onAfterrenderLineinfo',
//         // },
//     },
//     listen: {
//         store: {
//             'POrderGrant_SKU_PlanStore': {
//                 'loadStore_byPorderGrant_Done': 'onloadStore_byPorderGrant_Done'
//             }
//         }
//     },

//     onThoat: function(){
//         this.getView().up('window').close();
//     },
//     onAfterrender: function(){
//         var m = this;
//         var me = this.getView();
//         var viewModel = this.getViewModel();

//         var sourceView = viewModel.get('sourceView');
//         var eventRecord = viewModel.get('eventRecord');
//         var porder_grantid_link = viewModel.get('porder_grantid_link');
//         // var startDate = eventRecord.get('startDate');
//         // var endDate = eventRecord.get('endDate');
//         var startDate = eventRecord.get('StartDate');
//         var endDate = eventRecord.get('EndDate');

//         // console.log(eventRecord);
//         // console.log(porder_grantid_link);
//         viewModel.set('lineinfo', eventRecord.get('lineinfo'));

//         var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
//         if(sourceView == 'SchedulePlan'){
//             me.setLoading(true);
//             // POrderGrant_SKU_PlanStore.loadStore_byPorderGrant(porder_grantid_link, startDate, endDate);
//             POrderGrant_SKU_PlanStore.loadStore_byPorderGrant_async(porder_grantid_link, startDate, endDate);
//             POrderGrant_SKU_PlanStore.load({
//                 scope: this,
//                 callback: function (records, operation, success) {
//                     if (success) {
//                         var items = POrderGrant_SKU_PlanStore.getData().items;
//                         // console.log(items);
//                         var porder_grant_skuid_link_arr = new Array();
//                         var total_porderGrant_SKU_grantamount = 0;
//                         for(var i=0; i<items.length; i++){
//                             var porder_grant_skuid_link = items[i].get('porder_grant_skuid_link');
//                             if(!porder_grant_skuid_link_arr.includes(porder_grant_skuid_link)){
//                                 porder_grant_skuid_link_arr.push(porder_grant_skuid_link);
//                                 total_porderGrant_SKU_grantamount += items[i].get('porderGrant_SKU_grantamount');
//                             }
//                         }
//                         viewModel.set('total_porderGrant_SKU_grantamount', total_porderGrant_SKU_grantamount);
//                     }
//                     POrderGrant_SKU_PlanStore.fireEvent('loadStore_byPorderGrant_Done');
//                 }
//             });
//         }

//         // console.log(sourceView);
//         // console.log(eventRecord);
//         // console.log(porder_grantid_link);
//         // console.log(startDate);
//         // console.log(endDate);
//     },
//     onloadStore_byPorderGrant_Done: function () {
//         this.getView().setLoading(false);
//     },

//     onPivotGroupExpand: function(matrix, type, group) {
//         Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
//     },

//     onPivotGroupCollapse: function(matrix, type, group) {
//         Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups collapsed on ') + type);
//     },
//     onPivotUpdate: function(editor, context) {
//         var m = this;
//         var me = this.getView();
//         var viewModel = this.getViewModel();

//         // Ext.log('Event "pivotupdate" fired');
//         var viewModel = this.getViewModel();
//         var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
//         for (i=0;i<POrderGrant_SKU_PlanStore.data.items.length;i++){
//             var record = POrderGrant_SKU_PlanStore.data.items[i];
//             // console.log(record);
//             if (null != record.modified){
//                 // console.log(record);
//                 me.setLoading(true);
//                 //Update to DB
//                 var params = new Object();
//                 params.data = record.data;
        
//                 GSmartApp.Ajax.post('/api/v1/porder_grant_sku_plan/porder_grant_sku_plan_update', Ext.JSON.encode(params),
//                     function (success, response, options) {
//                         me.setLoading(false);
//                         if (success) {
//                             var response = Ext.decode(response.responseText);
//                             if(response.respcode == 200){
//                                 POrderGrant_SKU_PlanStore.commitChanges();
//                             }else{
//                                 POrderGrant_SKU_PlanStore.rejectChanges();
//                                 Ext.Msg.show({
//                                     title: 'Thông báo',
//                                     msg: response.message,
//                                     buttons: Ext.MessageBox.YES,
//                                     buttonText: {
//                                         yes: 'Đóng'
//                                     }
//                                 });            
//                             }            
//                         }else{
//                             POrderGrant_SKU_PlanStore.rejectChanges();
//                             Ext.Msg.show({
//                                 title: 'Thông báo',
//                                 msg: "Lưu thất bại. Xin kiểm tra lại kết nối mạng.",
//                                 buttons: Ext.MessageBox.YES,
//                                 buttonText: {
//                                     yes: 'Đóng'
//                                 }
//                             });          
//                         }
//                     })                
//             }
//         }
//     }, 
//     onBeforeedit: function ( editor, context, eOpts ) {
//         if (context.record.get('leftAxisKey') == "grandtotal" || context.column.text == "Tổng") {
//             context.cancel = true;
//             return false;
//         }
//     },
//     onAmount_Edit:function(editor, context){
//         // e.record.data[e.field] = e.value;
//         // console.log(context);
//         if (context.record.get('leftAxisKey') == "grandtotal" || context.column.text == "Tổng") {
//             context.cancel = true;
//             return false;
//         }
//         // context.record.commit();
//     },

//     onItemclick: function( thisView, record, item, index, e, eOpts ){
//         console.log(record);
//         // console.log(item);
//         var viewModel = this.getViewModel();
//         var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
//         for (i=0;i<POrderGrant_SKU_PlanStore.data.items.length;i++){
//             var record = POrderGrant_SKU_PlanStore.data.items[i];
//             console.log(record);
//         }
//     },
//     onPivotitemclick: function(params, e, eOpts){
//         // console.log(params);
//         var name = params.leftItem.name;
//         var viewModel = this.getViewModel();
//         var POrderGrant_SKU_PlanStore = viewModel.getStore('POrderGrant_SKU_PlanStore');
//         var porder_grant_skuid_link = null;

//         for (i=0;i<POrderGrant_SKU_PlanStore.data.items.length;i++){
//             var record = POrderGrant_SKU_PlanStore.data.items[i];
//             if(record.get('skuCode_string') == name){
//                 // console.log(record);
//                 porder_grant_skuid_link = record.get('porder_grant_skuid_link');
//                 break;
//             }
//         }

//         if(porder_grant_skuid_link != null){
//             // CODE HERE
//         }
//     },

//     onAfterrenderSltong: function(component){

//     },
//     onAfterrenderLineinfo: function(component){

//     },
// })