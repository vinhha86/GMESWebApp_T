Ext.define('GSmartApp.view.pcontract.Report_SalaryFund_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Report_SalaryFund_Controller',

    init:function(){
        // var viewmodel =  this.getViewModel();
        // var CMPReportStore = viewmodel.get('CMPReportStore');
        // CMPReportStore.loadStore(new Date(),6);
        var cbo_cmpoption = Ext.getCmp('Report_SalaryFund_cmpoption');
        cbo_cmpoption.setValue(6);
        this.onRefreshTap_ToSX();
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

    onPivotGroupExpand: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" expanded on ' : 'All groups expanded on ') + type);
    },

    onPivotGroupCollapse: function(matrix, type, group) {
        Ext.log((group ? 'Group "' + group.name + '" collapsed on ' : 'All groups collapsed on ') + type);
    },
    onRefreshTap: function(){
        var me = this;
        var viewmodel =  this.getViewModel();
        var cbo_cmpoption = Ext.getCmp('Report_SalaryFund_cmpoption');

        if (cbo_cmpoption != null && cbo_cmpoption.getValue() != null){
            var reportStore = viewmodel.get('SalaryFundReportStore');
            reportStore.loadStore(new Date(),cbo_cmpoption.getValue());
            reportStore.load({
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
                }
            });
        }
    },
    onRefreshTap_ToSX: function(){
        var me = this;
        var viewmodel =  this.getViewModel();
        var cbo_cmpoption = Ext.getCmp('Report_SalaryFund_cmpoption');

        if (cbo_cmpoption != null && cbo_cmpoption.getValue() != null){
            var reportStore = viewmodel.get('SalaryFundReportStore');
            reportStore.loadStore_Async(new Date(),cbo_cmpoption.getValue());
            reportStore.load({
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
                }
            });
        }
    },    
    onExportExcel: function(){
        this.getView().saveDocumentAs({
            type: 'excel',
            title: 'Bảng Tổng hợp quỹ lương (Salary Fund)',
            fileName:'salaryfund.xls'
        });
    },
    onZoom: function(){
        var panel_po = Ext.getCmp('PContract_PO_Edit');
        var west_salaryfund = panel_po.down('#panel_salaryfund');
        west_salaryfund.setWidth(west_salaryfund.width == '100%'?'50%':'100%');
    }      
});