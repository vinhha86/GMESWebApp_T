Ext.define('GSmartApp.view.porders.SewingCost.POrder_List.List_WorkingProcess_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.List_WorkingProcess_ViewModel',
    requires: [
        'GSmartApp.store.WorkingProcess_Store',
        'GSmartApp.store.DeviceStore',
        'GSmartApp.store.device.devices_type_store',
        'GSmartApp.store.Labor.LaborStore'
    ],
    stores: {
        WorkingProcess_Store: {
            type: 'WorkingProcess_Store'
        },
        DeviceStore: {
            type: 'DeviceStore'
        },
        DeviceTypeStore: {
            type: 'devices_type_store'
        },
        LaborStore: {
            type: 'LaborStore'
        }
    },
    data: {
        sourceview: null,
        isDisable_themmoi: false,
        working: {
            data: {
                name: '',
                devicerequiredid_link: '',
                laborrequiredid_link: '',
                timespent_standard: '',
                techcomment: '',
                productid_link: 0,
                process_type: 1,
                status: 0,
                id: null
            }
        }
    }
})