Ext.define('GSmartApp.model.CutPlan.CutPlanRow_Model', {
    extend: 'GSmartApp.model.Base',
    fields: [
		'id',
		'name',
		'la_vai',
		'dai_so_do',
		'sl_vai ',
        'kho',
        'so_cay',
        'so_cay_giu',
        'ngay',
        'type',
        {
            name: 'sl_vai',
            calculate: function(data) {
                return data.la_vai * data.dai_so_do;
            }
        }, 
    ]
});
