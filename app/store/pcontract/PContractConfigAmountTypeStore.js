Ext.define('GSmartApp.store.pcontract.PContractConfigAmountTypeStore', {
    extend: 'Ext.data.Store',
    storeId: 'PContractConfigAmountTypeStore',
    alias: 'store.PContractConfigAmountTypeStore',
    fields: [
        {name: 'type', type: 'int'},
        {name: 'typeString', type: 'string'}
    ],
    data:[
        {type: 0, typeString: 'Cộng'},
        {type: 1, typeString: 'Phần trăm'}
    ]
});
