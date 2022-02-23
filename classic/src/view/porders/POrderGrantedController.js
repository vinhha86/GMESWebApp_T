Ext.define('GSmartApp.view.porders.POrderGrantedController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.pordergranted',
    init: function() {
        this.callParent(arguments);
        this.getView().store.loadByDate(new Date());
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
        this.getView().store.reload();
    },           
    renderSum: function(value, summaryData, dataIndex) {
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';    
    }        
});