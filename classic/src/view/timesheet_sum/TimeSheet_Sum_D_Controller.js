Ext.define('GSmartApp.view.salary.TimeSheet_Sum_D_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheet_Sum_D_Controller',
    init: function(){
        var viewmodel = this.getViewModel();
        viewmodel.set('year',Ext.Date.format(new Date(), 'Y'));
    },
    control: {
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {

    },
    renderSum: function(value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    } ,
    onCal_WorkTable: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        // console.log(viewmodel.get('month') + "/" + viewmodel.get('year'));
        // console.log(viewmodel.get('selected_orgid'));
        if (null == viewmodel.get('month')){
            Ext.MessageBox.show({
                title: "Bảng công",
                msg: 'Tháng tính công không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if (null == viewmodel.get('year')){
            Ext.MessageBox.show({
                title: "Bảng công",
                msg: 'Năm tính công không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if (null == viewmodel.get('selected_orgid')){
            Ext.MessageBox.show({
                title: "Bảng công",
                msg: 'Phải chọn đơn vị trước khi tính công',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        var TimeSheetSumStore = viewmodel.get('TimeSheetSumStore');
        TimeSheetSumStore.removeAll();
        me.setLoading("Đang tính bảng công...")
        TimeSheetSumStore.calWorkTable(viewmodel.get('selected_orgid'),viewmodel.get('year'),viewmodel.get('month'),me);     
    },
    onReload_WorkTable: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        if (null == viewmodel.get('month')){
            Ext.MessageBox.show({
                title: "Bảng công",
                msg: 'Tháng tính công không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if (null == viewmodel.get('year')){
            Ext.MessageBox.show({
                title: "Bảng công",
                msg: 'Năm tính công không được để trắng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        if (null == viewmodel.get('selected_orgid')){
            Ext.MessageBox.show({
                title: "Bảng công",
                msg: 'Phải chọn đơn vị trước khi tính công',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }        
        var TimeSheetSumStore = viewmodel.get('TimeSheetSumStore');
        TimeSheetSumStore.removeAll();
        me.setLoading("Đang tải dữ liệu...");
        TimeSheetSumStore.loadStore(viewmodel.get('selected_orgid'),viewmodel.get('year'),viewmodel.get('month'),me);     
    },
    onConfirm_WorkTable:function(){
        
    },
    onfullnameFilterKeyup: function() {
        var viewmodel = this.getViewModel();
        var TimeSheetSumStore = viewmodel.get('TimeSheetSumStore');
        var filterField = this.lookupReference('fullnameFilterField'),
            filters = TimeSheetSumStore.getFilters();

        if (filterField.value) {
            this.myFilter = filters.add({
                id: 'fullnameFilter',
                property: 'personel_fullname',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.myFilter);
            this.myFilter = null;
        }
    },
})