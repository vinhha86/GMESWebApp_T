Ext.define('GSmartApp.view.pcontract.Report_CMP_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Report_CMP_Controller',

    init:function(){
        // var viewmodel =  this.getViewModel();
        // var CMPReportStore = viewmodel.get('CMPReportStore');
        // CMPReportStore.loadStore(new Date(),6);
        var cbo_cmpoption = Ext.getCmp('Report_CMP_cmpoption');
        cbo_cmpoption.setValue(6);
        this.onRefreshTap();
    },
   
    yearLabelRenderer: function(value) {
        return 'Year ' + value;
    },

    monthLabelRenderer: function(value) {
        var month_vn = {
            1: 'Tháng 1',
            2: 'Tháng 2',
            3: 'Tháng 3',
            4: 'Tháng 4',
            5: 'Tháng 5',
            6: 'Tháng 6',
            7: 'Tháng 7',
            8: 'Tháng 8',
            9: 'Tháng 9',
            10: 'Tháng 10',
            11: 'Tháng 11',
            12: 'Tháng 12',
        };
        return month_vn[value];
    },

    expandAll: function() {
        this.getView().expandAll();
    },

    collapseAll: function() {
        this.getView().collapseAll();
    },

    subtotalsHandler: function(button, checked) {
        if (!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.getView().reconfigurePivot({
            rowSubTotalsPosition: button.text.toLowerCase(),
            colSubTotalsPosition: button.text.toLowerCase()
        });
    },

    totalsHandler: function(button, checked) {
        if (!checked) {
            return;
        }

        // reconfigure the pivot grid with new settings
        this.getView().reconfigurePivot({
            rowGrandTotalsPosition: button.text.toLowerCase(),
            colGrandTotalsPosition: button.text.toLowerCase()
        });
    },

    // onPivotGroupExpand: function(matrix, type, group) {
    //     Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    // },

    // onPivotGroupCollapse: function(matrix, type, group) {
    //     Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups collapsed on ') + type);
    // },
    onPivotgroupdblclick: function(v, td, cellIndex, record, tr, rowIndex, e) {
        console.log(v);
        console.log(td);
        console.log(cellIndex);
        console.log(record);
        console.log(tr);
        console.log(rowIndex);
        console.log(e);
    },
    onPivotitemdblclick: function(params, e){
        // console.log(params.leftItem.data.parentorgcode);
        var cbo_cmpoption = Ext.getCmp('Report_CMP_cmpoption');

        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Báo cáo CMP Phân xưởng - ' + params.leftItem.data.parentorgcode,
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Report_CMP_ToSX',
                viewModel: {
                    data: {
                        ord_code: params.leftItem.data.parentorgcode,
                        cmpoption: cbo_cmpoption.getValue(),
                    }
                }
            }]
        });
        form.show();        
    },
    onRefreshTap: function(){
        var me = this;
        var viewmodel =  this.getViewModel();
        var cbo_cmpoption = Ext.getCmp('Report_CMP_cmpoption');

        var myview = this.getView();
        myview.setLoading("Đang tạo báo cáo...");

        if (cbo_cmpoption != null && cbo_cmpoption.getValue() != null){
            var CMPReportStore = viewmodel.get('CMPReportStore');
            CMPReportStore.loadStore(new Date(),cbo_cmpoption.getValue());
            CMPReportStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    } else {
                        setTimeout(function(){
                            var thisMonth = new Date().getMonth() + 1;
                            var view = me.getView();
                            var viewPos = view.getPosition();
                            var columns = view.getColumns();
                            var columnPos = columns[thisMonth].getPosition();
                            // console.log(viewPos);
                            // console.log(columnPos);
                            view.getScrollable().scrollBy(columnPos[0] - viewPos[0], null);
                        }, 1000);
                        
                    }
                    myview.setLoading(false);
                }
            });
        }
    },
    onRefreshTap_ToSX: function(){
        var me = this;
        var viewmodel =  this.getViewModel();
        var cbo_cmpoption = Ext.getCmp('Report_CMP_cmpoption');

        var myview = this.getView();
        myview.setLoading("Đang tạo báo cáo...");

        if (cbo_cmpoption != null && cbo_cmpoption.getValue() != null){
            var CMPReportStore = viewmodel.get('CMPReportStore');
            // CMPReportStore.loadStore(new Date(),cbo_cmpoption.getValue());
            CMPReportStore.loadStore_ToSX(new Date(),cbo_cmpoption.getValue());
            CMPReportStore.load({
                scope: this,
                callback: function(records, operation, success) {
                    if(!success){
                        // this.fireEvent('logout');
                    } else {
                        setTimeout(function(){
                            var thisMonth = new Date().getMonth() + 1;
                            var view = me.getView();
                            var viewPos = view.getPosition();
                            var columns = view.getColumns();
                            var columnPos = columns[thisMonth].getPosition();
                            // console.log(viewPos);
                            // console.log(columnPos);
                            view.getScrollable().scrollBy(columnPos[0] - viewPos[0], null);
                        }, 1000);
                        
                    }
                    myview.setLoading(false);
                }
            });
        }
    },
    onExportExcel: function(){
        this.getView().saveDocumentAs({
            type: 'excel',
            title: 'Bảng Tổng hợp giá gia công (CMP)',
            fileName:'cmp.xls'
        });
    },
    onZoom: function(){
        var panel_po = Ext.getCmp('PContract_PO_Edit');
        var west_cmp = panel_po.down('#panel_cmp');
        west_cmp.setWidth(west_cmp.width == '100%'?'50%':'100%');
    }
});