Ext.define('GSmartApp.model.ProductSewingCost', {
    extend: 'GSmartApp.model.Base',
    fields: [
        'id','orgrootid_link','productid_link','workingprocessid_link','cost',
        'amount',{
            name: 'totalcost',
            calculate: function(data){
                return data.cost * data.amount;
            }
        },'workingprocess_name', 'timespent_standard', 'laborlevel_name', 'devicegroup_name', 'techcomment',
    ]
});
