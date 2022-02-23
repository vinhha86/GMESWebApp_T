Ext.define('GSmartApp.model.groupuser.GrouPUser_Function_Model', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id'},
        {name: 'idx'},
        'name',
        {
			name: 'iconCls', type: 'string',
			convert: function (value) {
				return 'x-fa fa-' + value;
			}
		}
    ]
});
