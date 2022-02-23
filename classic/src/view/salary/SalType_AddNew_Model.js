Ext.define('GSmartApp.view.salary.SalType_AddNew_Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.SalType_AddNew_Model',
    data: {
        orgid_link: null,
        saltype_code: null,
        saltype_name: null,
        typeid_link: null //0-DefHour; 1-DefProductivity
    }
})