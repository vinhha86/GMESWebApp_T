Ext.define('GSmartApp.model.personnel.PersonnelModel', {
    extend: 'Ext.data.Model',
    idProperty: 'idx',
    fields: [
        'idx',
        { name: 'id', type: 'int' },
        { name: 'code', type: 'string' },
        { name: 'orgrootid_link', type: 'int' },
        { name: 'orgid_link', type: 'int' },

        { name: 'fullname', type: 'string' },
        { name: 'personnel_typeid_link', type: 'int' },
        { name: 'personnel_positionid_link', type: 'int' },
        { name: 'gender', type: 'int' },
        { name: 'countryid_link', type: 'int' },
        { name: 'provinceid_link', type: 'int' },
        { name: 'districtid_link', type: 'int' },
        { name: 'communeid_link', type: 'int' },
        { name: 'address', type: 'string' },
        { name: 'idnumber', type: 'string' },
        { name: 'birthdate', type: 'date', dateFormat: 'c' },
        { name: 'status', type: 'int' },
        { name: 'email', type: 'string' },
        {
            name: 'gender_name',
            calculate: function (data) {
                return data.gender == 1 ? 'Nam' : 'Nữ';
            }
        }
    ]
});