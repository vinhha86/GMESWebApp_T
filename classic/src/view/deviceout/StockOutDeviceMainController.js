Ext.define('GSmartApp.view.deviceout.StockOutDeviceMainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.StockOutDeviceMainController',
    init: function() {
        this.callParent(arguments);
        var viewmodel = this.getViewModel();

        var listidtype = "14";
 
        var orgtostore = viewmodel.getStore('OrgToStore');
        orgtostore.loadStore_byRoot(listidtype);
        
        var DeviceOutTypeStore = viewmodel.getStore('DeviceOutTypeStore');
        DeviceOutTypeStore.loadStore();

        var DeviceOutStore = viewmodel.getStore('DeviceOutStore');
        DeviceOutStore.sort('deviceout_date','DESC');
    },
    onActivate: function () {
        this.onSearch();
    },
	listen: {
        controller: {
            '*': {
				urlBack:'onSearch',
            }
        }
    },        
    control:{
        // '#btnThemMoi':{
        //     click: 'onStockoutNew'
        // },
		'#StockOutDevice_List':{
            itemdblclick: 'onCapNhat'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        }
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('Stockout');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onSearch();
        }
    },
    onSearch: function(){
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('DeviceOutStore');

        var limit = me.down('#limitpage').getValue();
        var deviceouttypeid_link = me.down('#deviceouttypeid_link').getValue();
        var deviceout_date_from = me.down('#deviceout_date_from').getValue();
        var deviceout_date_to = me.down('#deviceout_date_to').getValue();
        var orgid_to_link = me.down('#OrgToStore').getValue();
        var status;
        if(me.down('#status').getValue() == null || me.down('#status').getValue() == ""){
            status = [];
        }else status = me.down('#status').getValue();

        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }
        store.loadStore(deviceout_date_from, deviceout_date_to, orgid_to_link, deviceouttypeid_link, status, limit, page);
    },
    // renderCell: function(value, record) {
    //     if (null == value) value = 0;
    //     return '<div style="font-size: 11px;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';
    // },
    // renderSum: function(value, summaryData, dataIndex) {
    //     if (null == value) value = 0;
    //     return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000.00') + '</div>';    
    // },
    onStockoutEdit: function(grid, rowIndex, colIndex){
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("stockout_device/" + id + "/edit");
    },
    onCapNhat: function(m, record, item, index, e, eOpts){
        var id = record.data.id;
        this.redirectTo("stockout_device/" + id + "/edit");
    },
    // onStockoutItemDelete: function(grid, rowIndex, colIndex){
    //     var me = this.getView();
    //     var rec = grid.getStore().getAt(rowIndex);
    //     var id = rec.get('id');
    //     var name = rec.get('stockoutcode');

    //     Ext.Msg.show({
    //         title: 'Thông báo',
    //         msg: 'Bạn có chắc chắn xóa phiếu xuất '+name+'?',
    //         buttons: Ext.Msg.YESNO,
    //         icon: Ext.Msg.QUESTION,
    //         buttonText: {
    //             yes: 'Có',
    //             no: 'Không'
    //         },
    //         fn: function (btn) {
    //             if (btn === 'yes') {
    //                 me.setLoading("Đang xóa dữ liệu");
    //                 var params = new Object();
    //                 params.id = id;
    //                 params.status = 1;

    //                 GSmartApp.Ajax.post('/api/v1/stockout/stockout_deleteid', Ext.JSON.encode(params),
    //                 function (success, response, options) {
    //                     me.setLoading(false);
    //                     if (success) {
    //                         var response = Ext.decode(response.responseText);
    //                         if (response.respcode == 200) {
    //                             Ext.MessageBox.show({
    //                                 title: "Thông báo",
    //                                 msg: "Xóa thành công",
    //                                 buttons: Ext.MessageBox.YES,
    //                                 buttonText: {
    //                                     yes: 'Đóng',
    //                                 }
    //                             });
    //                             grid.getStore().remove(rec);
    //                         }
    //                     }
    //             })
    //             }
    //         }
    //     });
    // },
    // onStockoutNew: function(){
    //     this.redirectTo("stockout_p_main/create");
    // }
});
