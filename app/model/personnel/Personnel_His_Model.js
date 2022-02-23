Ext.define('GSmartApp.model.personnel.Personnel_His_Model', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        'id', 'positionid_link', 'levelid_link', 'orgid_link', 'decision_number', 'decision_date',
        'type', 'position_name', 'level_name', 'org_name',
        {
            name: 'type_name',
            calculate: function (data) {
                switch (data.type) {
                    case 1:
                        return "Chức vụ";
                    case 2:
                        return "Cấp bậc";
                    case 3:
                        return "Phòng ban";
                    case 4:
                        return "Thang, bậc lương";                    
                    default:
                        return "";
                }
            }
        }
    ]
});