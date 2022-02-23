Ext.define('GSmartApp.view.salary.Salary_Sum_Porder_Add_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Salary_Sum_Porder_Add_Model',
    stores: {
        POrder_Grant: {
            type: 'POrder_Grant'
        }    
    },    
    data: {
        orgid_link: null,
        year: null,
        month: null
    }
})