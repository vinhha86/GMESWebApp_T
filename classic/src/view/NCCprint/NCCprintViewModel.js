Ext.define('GSmartApp.view.NCCprint.NCCprintViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.NCCprintViewModel',
    requires: ['GSmartApp.store.OrgStore','GSmartApp.store.ColorStore'],
    stores: {
        OrgStore: {
            type: 'orgstore'
        },
        ColorStore: {
            type: 'ColorStore'
        }
    },
    /** 
        {name: 'code',  type: 'string'},
		{name: 'name',   type: 'string'},
		{name: 'city',  type: 'string'},
		{name: 'address',   type: 'string'},
		{name: 'contactperson',  type: 'string'},
		{name: 'email',   type: 'string'},
		{name: 'phone',  type: 'string'},
		{name: 'status', type:'int'}
    */
    
    data: {
        id: 0,
        name: '',
        currentRec: null,
        oldName: null,
        newName: null,
        oldCode: null,
        newCode: null,
        oldCity: null,
        newCity: null,
        oldAddress: null,
        newAddress: null,
        oldCtperson: null,
        newCtperson: null,
        oldEmail: null,
        newEmail: null,
        oldPhone: null,
        newPhone: null,
        newColorIdlink: null,
        oldColorIdlink: null,
        
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0) {
                return 'Thêm mới vendor'
            }
            else {
                return 'Thông tin vendor ' + this.get('name');
            }
        }
    }
})