Ext.define('GSmartApp.view.unit.UnitViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.UnitViewModel',
    requires: ['GSmartApp.store.unit.UnitStore'],
    stores: {
        UnitStore: {
            type: 'UnitStore'
        }
    },
    // data: {
    //     id: 0,
    //     name: '',
    //     currentRec : null
    // },
    // formulas: {
    //     title: function (get) {
    //         if (get('id') == 0) {
    //             return 'Thêm mới unit'
    //         }
    //         else {
    //             return 'Thông tin unit ' + this.get('name');
    //         }
    //     }
    // }
})