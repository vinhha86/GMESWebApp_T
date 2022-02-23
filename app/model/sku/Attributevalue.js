Ext.define('GSmartApp.model.Attributevalue', {
    extend: 'GSmartApp.model.Base',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'orgrootid_link',  type: 'int'},
		{name: 'attributeid_link',   type: 'int'},
		{name: 'value',   type: 'string'},
		{name: 'datatype',   type: 'int'},
		{name: 'description',   type: 'string'},
		{name: 'usercreateid_link',   type: 'int'},
		{name: 'timecreate',   type: 'date'}
    ]
});
