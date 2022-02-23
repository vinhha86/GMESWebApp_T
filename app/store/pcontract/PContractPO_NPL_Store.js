Ext.define('GSmartApp.store.pcontract.PContractPO_NPL_Store', {
    extend: 'Ext.data.Store',
    alias: 'store.PContractPO_NPL_Store',
    storeId: 'PContractPO_NPL_Store',
    fields: [
        { name: 'id', type: 'int' },
        { name: 'pcontractid_link', type: 'int' },
        { name: 'pcontract_poid_link', type: 'int' },
        { name: 'npl_skuid_link', type: 'int' },
        'po_buyer',
        'shipdate',
        'quantity',
        'port_from_name',
        'port_to_name'
    ],
    sorters: [{
        direction: 'ASC',
        property: 'shipdate'
    }]
});
