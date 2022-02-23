Ext.define('GSmartApp.view.org.ListOrgViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ListOrgViewModel',
    requires: ['GSmartApp.store.org.ListOrgMenuTreeStore', 'GSmartApp.store.org.OrgTypeStore', 'GSmartApp.store.ColorStore'],
    stores: {
        MenuStore: {
            type: 'ListOrgMenuTreeStore'
        },
        OrgTypeStore: {
            type: 'OrgTypeStore'
        },
        ColorStore: {
            type: 'ColorStore'
        }
    },
    data: {
        id: 0,
        parentid_link: null,
        titleName: '',
        currentRec: null,
        isDisplayInactive: false,
        // Form
        code: null,
        name: null,
        city: null,
        address: null,
        contactperson: null,
        email: null,
        phone: null,
        linecost: null,
        orgtypeid_link: null,
        colorid_link: null,
        status: null,
        costpersec: null,
        is_manufacturer: null,
        //
        fieldState: false
    },
    formulas: {
        title: function (get) {
            if (get('id') == 0 && get('parentid_link') == null) {
                return 'Chi tiết đơn vị';
            } else if (get('id') == 0 && get('parentid_link') != null) {
                return 'Thêm mới đơn vị trực thuộc \'' + this.get('titleName') + '\'';
            }
            else {
                return this.get('titleName');
            }
        },
        btnThemState: function (get) {
            if (get('id') == 0) {
                return 1;
            } else {
                return null;
            }
        },
        isProductionLine: function (get) {
            if (get('orgtypeid_link') == 14) {
                return true;
            } else {
                return false;
            }
        },
        isBtnXoaHidden: function (get) {
            if (get('id') == 0 || get('id') == null) {
                return true;
            } else {
                return false;
            }
        }
    }
})