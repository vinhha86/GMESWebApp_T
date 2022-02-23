Ext.define('GSmartApp.view.salary.SalCom_AddNew_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SalCom_AddNew_Model',
    data: {
        sal_basic: null,
        orgid_link: null,
        typeid_link: null, //0-Chuc vu; 1-Khac
        code: null,
        name: null,
        comratio: null,
        comamount: null,
        isforindividual: null,
        isinsurance: null,
    }
})