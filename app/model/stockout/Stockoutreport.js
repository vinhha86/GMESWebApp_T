Ext.define('GSmartApp.model.Stockoutreport', {
    extend: 'GSmartApp.model.Base',
    fields: [
        {name: 'id', type: 'int'},
        'skucode',
        'skutypeid_link',
        'skutype',
        'color_name',
        'packageprocessed',
        'packagecheck',
        'ydsorigin',
        'ydscheck',
        'ydsprocessed',
        'totalerror',
        {
            name: 'ydscheck_dif',
            calculate: function(data) {
                return data.ydscheck - (null == data.ydsorigin?0:data.ydsorigin);
            }
        }, 
        {
            name: 'ydsprocessed_dif',
            calculate: function(data) {
                return data.ydsprocessed - (null == data.ydscheck?0:data.ydscheck);
            }
        },         
        {
            name: 'yds_useable',
            calculate: function(data) {
                return data.ydsprocessed - (null == data.totalerror?0:data.totalerror);
            }
        }, 
        {
            name: 'dif_total',
            calculate: function(data) {
                return data.ydsprocessed - (null == data.totalerror?0:data.totalerror) - (null == data.ydsorigin?0:data.ydsorigin);
            }
        }  
    ],
    hasMany : {model: 'Stockout_pklist', name: 'checkpklist'},
    hasMany : {model: 'Stockout_pklist', name: 'processedpklist'}
});
