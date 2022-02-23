Ext.define('GSmartApp.model.WorkingProcess_Model', {
    extend: 'GSmartApp.model.Base',
    fields: [
        'id','orgrootid_link','productid_link', 'process_type', 'process_name', 
        'name', 'devicegroup_name', 'laborlevel_name', 'techcomment', 'timespent_standard'
    ]
});
