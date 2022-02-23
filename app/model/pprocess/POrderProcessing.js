Ext.define('GSmartApp.model.POrderProcessing', {
    extend: 'GSmartApp.model.Base',
    idProperty: 'idx',
    fields: [
        {name: 'id', type: 'int'},
        {name: 'idx', type: 'int'},
        'orgid_link',
        {name: 'processingdate', type: 'date', dateFormat: 'c'},
        {
            name: 'processingdate_str',
            calculate: function(data) {
                return Ext.Date.format(data.processingdate,'d/m/y');
            }
        },         
        'porderid_link', 
        'ordercode',
        'balance_status',
        'balance_date',
        'balance_rate',         
        {name: 'orderdate', type: 'date', dateFormat: 'c'},
        {name: 'productiondate', type: 'date', dateFormat: 'c'},
        {name: 'sample_date', type: 'date', dateFormat: 'c'},
        {name: 'cut_date', type: 'date', dateFormat: 'c'},
        {name: 'qc_date', type: 'date', dateFormat: 'c'},
        {name: 'packing_date', type: 'date', dateFormat: 'c'},
        {name: 'stockout_date', type: 'date', dateFormat: 'c'},
        {name: 'material_date', type: 'date', dateFormat: 'c'},
        {
            name: 'productiondate_str',
            calculate: function(data) {
                return Ext.Date.format(data.productiondate,'d/m/Y');
            }
        },        
        'productionyear',
        'salaryyear',
        'season',
        'collection',
        'granttoorgid_link',
        'granttoorgname',
        'golivedesc',
        'totalorder',
        //For Cutting Room
        'amountcutting',
        'amountcuttingold',
        'amountcuttingsum',
        'amountcuttingsumprev',
        'amountnumbering',
        'amountnumberingold',
        'amountnumberingsum',
        'amountnumberingsumprev',
        'amountmex',
        'amountmexold',
        'amountmexsum',
        'amountmexsumprev',
        'amounttoline',
        'amounttolineold',
        'amounttolinesum',
        'amounttolinesumprev',
        //End For Cutting Room
        'amountcut',
        'amountcutsum',
        'amountcutsumprev',
        'amountinput',
        'amountinputold',
        'amountinputsum',
        'amountinputsumprev',
        'amountoutput',
        'amountoutputold',
        'amountoutputsum',
        'amountoutputsumprev',
        'amounterror',
        'amounterrorold',
        'amounterrorsum',
        'amounterrorsumprev',
        'amounttarget',
        'amounttargetold',
        'amounttargetprev',         
        'amountkcsreg',
        'amountkcsregold',
        'amountkcsregprev',  
        'amountkcs',
        'amountkcsold',
        'amountkcssum',
        'amountkcssumprev',
        // 'amountpackstocked',
        // 'amountpackstockedsum',
        // 'amountpackstockedsumprev',        
        'amountpacked',
        'amountpackedold',
        'amountpackedsum',
        'amountpackedsumprev',
        'amountstocked',
        'amountstockedold',
        'amountstockedsum',
        'amountstockedsumprev',
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
        'comment',
        'status',
        'shortvalue',
        'usercreateid_link',
        'timecreate',
        'iscuttt',
        'isstockouttocut'//Da xuat vai sang to cat
    ]
});
