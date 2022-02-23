Ext.define('GSmartApp.view.porders.POrderSetSalaryMonthController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pordersetsalarymonth',
    init: function() {
        this.callParent(arguments);

        cboOrg_Salary = this.lookupReference('cboOrg_Salary');
        cboOrg_Salary.store.loadConfig();
        cboOrg_Salary.store.load();
        cboOrg_Salary.setValue(-1);

        cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
        cbosalarymonth_Salary.setValue(-1);        
    }, 
    onMonthItemSelected: function(sender, record){
        //Tu dong chon nam hien tai
        var txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');
        if (record.get('id') > 0){
            txtsalaryyear_Salary.setValue(Ext.Date.format(new Date(), 'Y'));
        } else {
            txtsalaryyear_Salary.setValue('');
        }
    },
    onOrgItemSelected: function (sender, record) {
        //console.log(record.get('id'));
        if (record.get('id') > 0){
            //Them ^ va $ de xu ly loi filter so 1
            sIDSelect = new RegExp("^"+record.get('id')+"$"); 
            this.getView().store.filter('granttoorgid_link',sIDSelect);
        }
        else {
            this.getView().store.filters.remove('granttoorgid_link');
            //this.getView().store.clearFilter(); 
        }
    },
    onPOrderFilterKeyup: function() {
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('porderFilterField_Salary'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.porderFilter_Salary = filters.add({
                id: 'porderFilter',
                property: 'ordercode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.porderFilter_Salary) {
            filters.remove(this.porderFilter_Salary);
            this.porderFilter_Salary = null;
        }
    },
    onSearchTap: function(){
        cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
        txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');
        if (cbosalarymonth_Salary.getValue() == -1 || null == txtsalaryyear_Salary.getValue()){
            Ext.Msg.alert("Lệnh tính lương", "Chưa chọn tháng/năm tính lương");
            return;
        }
        var salaryyear = this.lookupReference('txtsalaryyear_Salary').getValue();
        var salarymonth = this.lookupReference('cbosalarymonth_Salary').getValue();

        var processingdate_from = '';
        var processingdate_to = ''; 
        var ordercode = '';
        var orderstatus = '';
        var granttoorgid_link = '';
        var collection = '';
        var season = '';
        this.getView().store.loadFilter(ordercode,orderstatus,granttoorgid_link,collection,season,salaryyear,salarymonth,processingdate_from,processingdate_to);
    },           
    onDrop: function(node, data, dropRec, dropPosition){
        var access_token = App.Ajax.access_token();

        cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
        txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');

        var params=new Object();
        var paramdata =new Array();
        Ext.Array.each(data.records, function(rc) {
            rc.set('id',Ext.Number.randomInt(0,1000000));
            rc.set('salaryyear',txtsalaryyear_Salary.getValue());
            rc.set('salarymonth',cbosalarymonth_Salary.getValue());
            paramdata.push(rc.data);
        });
        params.data = paramdata;
        console.log(Ext.JSON.encode(params));
        
        Ext.Ajax.request({
            url: config.getAppBaseUrl()+'/api/v1/porders/setsalarymonth_erp',
            method:'POST',
            cors: true,
            headers :{
               'Accept': "application/json", 
               'Content-Type':"application/json",
               'authorization': 'Bearer ' + access_token
            },
            useDefaultXhrHeader: false,
            params: Ext.JSON.encode(params),
            success : function(response,options ) {
               var response = Ext.decode(response.responseText);
               console.log(response);

            //    if(response!=null && response!=''){
            //        if (response.respcode != 200){
            //             Ext.Msg.alert("Lệnh tính lương", response.message);
            //        }
            //    }
            },
            failure :function(response,options){
               console.log(response.responseText);
               console.log(response);
            }
        });        
    },
    onBeforeDrop:  function( node, data, overModel, dropPosition, dropHandlers, eOpts){
        dropHandlers.wait = true;
        // Ext.MessageBox.confirm('Drop', 'Are you sure', function(btn){
        //     if (btn === 'yes') {
        //         dropHandlers.processDrop();
        //     } else {
        //         dropHandlers.cancelDrop();
        //     }
        // });
        if (null == data.records[0].get('granttoorgid_link')){
            Ext.Msg.alert("Lệnh tính lương", "Mã sản xuất chưa được phân chuyền");
            dropHandlers.cancelDrop();
        } else {
            if (data.records[0].get('salary_monthyear') != ''){
                Ext.Msg.alert("Lệnh tính lương", "Mã sản xuất đã được thiết lập tính lương " + data.records[0].get('salary_monthyear'));
                dropHandlers.cancelDrop();
            } else {
                cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
                txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');
                if (cbosalarymonth_Salary.getValue() == -1 || null == txtsalaryyear_Salary.getValue()){
                    Ext.Msg.alert("Lệnh tính lương", "Chưa chọn tháng/năm tính lương");
                    dropHandlers.cancelDrop();
                } else {
                    dropHandlers.processDrop();
                }
            }
        }
        
    },
    renderSum: function(value, summaryData, dataIndex) {
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    }        
});