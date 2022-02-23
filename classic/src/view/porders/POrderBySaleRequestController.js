Ext.define('GSmartApp.view.porders.POrderBySaleRequestController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.porderbysalerequest',
    init: function() {
        this.callParent(arguments);

        cboOrderDate = this.lookupReference('cboOrderDate');
        cboOrderDate.setValue(6);   
    },
    onActivate: function(e, eOpts){
        var store_userfunctions = Ext.data.StoreManager.lookup('store_userfunctions');
        if (null != store_userfunctions){
            var me = this;
            form = me.getView();
            store_userfunctions.loadFunctions(form,App.Ajax.access_token(),function(records, operation, success){
                store_userfunctions.each(function(record) {
                    var iObject = me.lookupReference(record.get('refid_item'));
                    if (null != iObject){
                        if (Ext.isDefined(iObject.hidden)){
                            if (record.get('ishidden')){
                                iObject.setHidden(true);
                            }
                        }
                        if (Ext.isDefined(iObject.disabled)){
                            if (record.get('isreadonly')){
                                iObject.setDisabled(true);
                            }
                        }
                    }
                });                
            });
        }
       
    },
    onPOrderFilterKeyup: function() {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('porderFilterField'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.porderFilter = filters.add({
                id: 'porderFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter) {
            filters.remove(this.porderFilter);
            this.porderFilter = null;
        }
    }, 
    onMonthItemSelected: function(sender, record){
        //Tu dong chon nam hien tai
        var salaryyear = this.lookupReference('txtGoliveYear');
        if (record.get('id') > 0){
            salaryyear.setValue(Ext.Date.format(new Date(), 'Y'));
        } else {
            salaryyear.setValue('');
        }
    }, 
    onCheckStatusChange: function(e, newValue, oldValue, eOpts ){
        filters = this.getView().store.getFilters();

        var chkFree = this.lookupReference('chkFree');
        var chkGrant = this.lookupReference('chkGrant');
        var chkReady = this.lookupReference('chkReady');
        var chkRunning = this.lookupReference('chkRunning');
        var chkDone = this.lookupReference('chkDone');
        var chkSubProcess = this.lookupReference('chkSubProcess');
        var chkPacked = this.lookupReference('chkPacked');

        //chkFree
        if (chkFree != null && chkFree.getValue() == false) {
            this.chkFreeFilter = filters.add({
                id: 'chkFreeFilter',
                property: 'status',
                value: 0,
                operator: '!='
            });
        }
        else if (this.chkFreeFilter) {
            filters.remove(this.chkFreeFilter);
            this.chkFreeFilter = null;
        }
        //chkGrant
        if (chkGrant != null && chkGrant.getValue() == false) {
            this.chkGrantFilter = filters.add({
                id: 'chkGrantFilter',
                property: 'status',
                value: 1,
                operator: '!='
            });
        }
        else if (this.chkGrantFilter) {
            filters.remove(this.chkGrantFilter);
            this.chkGrantFilter = null;
        }
        //chkReady
        if (chkReady != null && chkReady.getValue() == false) {
            this.chkReadyFilter = filters.add({
                id: 'chkReadyFilter',
                property: 'status',
                value: 2,
                operator: '!='
            });
        }
        else if (this.chkReadyFilter) {
            filters.remove(this.chkReadyFilter);
            this.chkReadyFilter = null;
        }
        //chkRunning
        if (chkRunning != null && chkRunning.getValue() == false) {
            this.chkRunningFilter = filters.add({
                id: 'chkRunningFilter',
                property: 'status',
                value: 3,
                operator: '!='
            });
        }
        else if (this.chkRunningFilter) {
            filters.remove(this.chkRunningFilter);
            this.chkRunningFilter = null;
        }        
        //chkDone
        if (chkDone != null && chkDone.getValue() == false) {
            this.chkDoneFilter = filters.add({
                id: 'chkDoneFilter',
                property: 'status',
                value: 4,
                operator: '!='
            });
        }
        else if (this.chkDoneFilter) {
            filters.remove(this.chkDoneFilter);
            this.chkDoneFilter = null;
        }        
        //chkSubProcess
        if (chkSubProcess != null && chkSubProcess.getValue() == false) {
            this.chkSubProcessFilter = filters.add({
                id: 'chkSubProcessFilter',
                property: 'status',
                value: 6,
                operator: '!='
            });
        }
        else if (this.chkSubProcessFilter) {
            filters.remove(this.chkSubProcessFilter);
            this.chkSubProcessFilter = null;
        }
        //chkPacked
        if (chkPacked != null && chkPacked.getValue() == false) {
            this.chkPackedFilter = filters.add({
                id: 'chkPackedFilter',
                property: 'status',
                value: 5,
                operator: '!='
            });
        }
        else if (this.chkPackedFilter) {
            filters.remove(this.chkPackedFilter);
            this.chkPackedFilter = null;
        }              
    },       
    onSearchTap: function(){
        var processingdate_from = '';
        cboOrderDate = this.lookupReference('cboOrderDate');
        if (cboOrderDate.getValue() > 0) {
            var orderdate = new Date();
            orderdate.setMonth(orderdate.getMonth() - cboOrderDate.getValue())
            console.log(orderdate);
            processingdate_from = orderdate;
        }
        var processingdate_to = '';

        cboGoliveMonth = this.lookupReference('cboGoliveMonth');
        txtGoliveYear = this.lookupReference('txtGoliveYear');
        if (cboGoliveMonth.getValue() == -1 || null == txtGoliveYear.getValue()){
            Ext.Msg.alert("Lịch lên hàng", "Chưa chọn tháng/năm lên hàng");
            return;
        }
        var goliveyear = this.lookupReference('txtGoliveYear').getValue();
        var golivemonth = this.lookupReference('cboGoliveMonth').getValue();
        
        //Clear thong tin loc Ma SX trc khi thuc hienj tim kiem
        filterField = this.lookupReference('porderFilterField');
        if (null != filterField) filterField.setValue('');
        this.getView().store.getFilters().clear();
        console.log(this.getView().store);

        //Tim kiem theo dieu kien
        this.getView().store.loadFilter(goliveyear,golivemonth,processingdate_from,processingdate_to);
    },
    onImageViewClick: function(grid, rowIndex, colIndex){
        var record = this.getView().store.getAt(rowIndex);
        var access_token = App.Ajax.access_token();

        var form =Ext.create({
            xtype: 'porderimage',
            reference:'porderimage'
        });
        var viewModel = form.getViewModel();
        viewModel.set('ordercode',record.get('ordercode'));
   
        form.show();
    },
    renderSum: function(value, summaryData, dataIndex) {
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    }
});