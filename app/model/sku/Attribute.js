Ext.define('GSmartApp.model.Attribute', {
    extend: 'GSmartApp.model.Base',
    fields: [
		{name: 'id', type: 'int'},
		{name: 'description',  type: 'string'},
		{name: 'name',   type: 'string'},
		{name: 'isproduct',   type: 'bool'},
		{name: 'ismaterial',   type: 'bool'},
		{name: 'issewingtrims',   type: 'bool'},
		{name: 'ispackingtrims',   type: 'bool'},
		{name: 'selectedids',  type: 'string'},
    ]
});
