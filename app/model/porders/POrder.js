Ext.define('GSmartApp.model.POrder', {
    extend: 'GSmartApp.model.Base',

    fields: [
        {name: 'id', type: 'int'},
        'orgrootid_link',
        {name: 'processingdate', type: 'date', dateFormat: 'c'},
        'pcontractid_link', 
        'pcontract_poid_link', 
        'sizesetid_link',
        'sizesetname',
        {name: 'ordercode', summary: 'count'},
        'balance_status',
        'balance_date',
        'balance_rate',         
        {name: 'orderdate', type: 'date', dateFormat: 'c'},
        {name: 'productiondate', type: 'date', dateFormat: 'c'},
        {
            name: 'productiondate_str',
            calculate: function(data) {
                return Ext.Date.format(data.productiondate,'d/m/Y');
            }
        },        
        'productionyear',
        'salaryyear',
        'salarymonth',
        {
            name: 'salary_monthyear',
            calculate: function(data) {
                if (null != data.salarymonth && null != data.salaryyear){
                    if (0 != data.salarymonth && 0 != data.salaryyear)
                        return data.salarymonth + '/' + data.salaryyear;
                    else
                        return '';
                } else {
                    return '';
                }
            }
        },        
        'season',
        'collection',
        'granttoorgid_link',
        'granttoorgname',
        'granttoorgcode',
        'golivedesc',
        'totalorder',
        {name: 'amountcutsum', summary: 'sum'},
        {name: 'amountinputsum', summary: 'sum'},
        {name: 'amountoutputsum', summary: 'sum'},
        {name: 'amounterrorsum', summary: 'sum'},
        {name: 'amountkcssum', summary: 'sum'},
        {name: 'amountpackedsum', summary: 'sum'},
        {name: 'amountstockedsum', summary: 'sum'},
        {
            name: 'amountdg_rc',
            calculate: function(data) {
                return data.amountpackedsum - data.amountoutputsum;
            }
        },
        {
            name: 'amountcut_rc',
            calculate: function(data) {
                return data.amountcutsum - data.amountoutputsum;
            }
        },        
        'totalstocked',//So thuc te da nhap kho thanh pham (lay tu module nhap kho)
        {
            name: 'amountcut_stock',
            calculate: function(data) {
                return data.amountcutsum - data.totalstocked;
            }
        }, 
        {
            name: 'complete_rate',
            calculate: function(data) {
                return data.amountpackedsum/data.amountcutsum;
            }
        },        
        'comment',
        'status',
        'shortvalue',
        'usercreateid_link',
        'timecreate',
        'iscuttt',
        'mausac',
        'soluongsaledat'
    ],
    hasMany : {model: 'SaleOrder', name: 'saleorder'},
    hasMany : {model: 'POrder_Product', name: 'porder_product'},
    hasMany : {model: 'POrder_Product_SKU', name: 'porder_product_sku'}
});
