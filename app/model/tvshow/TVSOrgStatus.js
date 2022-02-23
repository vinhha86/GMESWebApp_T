Ext.define('GSmartApp.model.TVSOrgStatus', {
    extend: 'GSmartApp.model.Base',

    fields: [
        'id', 
        'granttoorgid_link',
        'orgname',
        'orderamount',
        'amountcutsum',
        'amountinputsum',
        'amountoutputsum',
        {
            name: 'percentcomplete',
            calculate: function(data) {
                return (data.amountoutputsum/data.amountcutsum)*100;
            }
        },  
        'orderlist',
        'status'
    ]
});
