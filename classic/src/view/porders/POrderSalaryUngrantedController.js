Ext.define('GSmartApp.view.porders.POrderSalaryUngrantedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pordersalaryungranted',
    init: function() {
        this.callParent(arguments);

        cboOrg_Salary = this.lookupReference('cboOrg_Salary');
        cboOrg_Salary.store.loadConfig();
        cboOrg_Salary.store.load();
        cboOrg_Salary.setValue(-1);

        cboOrderDate = this.lookupReference('cboOrderDate');
        cboOrderDate.setValue(2);        
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
        var processingdate_from = '';
        cboOrderDate = this.lookupReference('cboOrderDate');
        if (cboOrderDate.getValue() > 0) {
            var orderdate = new Date();
            orderdate.setMonth(orderdate.getMonth() - cboOrderDate.getValue())
            console.log(orderdate);
            processingdate_from = orderdate;
        }
        var processingdate_to = '';

        var salaryyear = null;
        var salarymonth = null;
        var ordercode = '';
        var orderstatus = '-1';
        var granttoorgid_link = -1;
        var collection = '';
        var season = '';
        this.getView().store.loadFilter(ordercode,orderstatus,granttoorgid_link,collection,season,salaryyear,salarymonth,processingdate_from,processingdate_to);
    },           
    onDrop: function(node, data, dropRec, dropPosition){
        cbosalarymonth_Salary = this.lookupReference('cbosalarymonth_Salary');
        txtsalaryyear_Salary = this.lookupReference('txtsalaryyear_Salary');

        var params=new Object();
        var paramdata =new Array();
        Ext.Array.each(data.records, function(rc) {
            rc.set('salaryyear',txtsalaryyear_Salary.getValue());
            rc.set('salarymonth',cbosalarymonth_Salary.getValue());
            paramdata.push(rc.data);
        });
        params.data = paramdata;

		GSmartApp.Ajax.post('/api/v1/porder/setsalarymonth', Ext.JSON.encode(params),
			function (success, response, options) {
                var response = Ext.decode(response.responseText);
				if (success) {
                    console.log(response);
				} else {
                    Ext.MessageBox.show({
                        title: "Lệnh tính lương",
                        msg: response.message,
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                }
            });        
   
    },
    renderSum: function(value, summaryData, dataIndex) {
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    }        
});