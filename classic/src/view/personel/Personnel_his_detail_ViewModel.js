Ext.define('GSmartApp.view.personel.Personnel_his_detail_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.Personnel_his_detail_ViewModel',
    requires: ['GSmartApp.store.Position.PositionStore', 'GSmartApp.store.Labor.LaborStore',
        'GSmartApp.store.org.ListOrgStore'],
    stores: {
        PositionStore: {
            type: 'PositionStore'
        },
        LaborStore: {
            type: 'LaborStore'
        },
        OrgStore: {
            type: 'ListOrgStore'
        },
        SalTypeStore: {
            type: 'SalTypeStore'
        },
        SalTypeLevelStore: {
            type: 'SalTypeLevelStore'
        }
    },
    data: {
        saltype: 0,
        isPosition: true,
        isLevel: true,
        isOrg: true,
        isSalary: true,       
        his: {
            type: 0,
            personnelid_link: 0,
            saltypeid_link: null,
            sallevelid_link: null
        },
        orgmanagerid_link: 0
    },
    formulas: {
        title: function (get) {
            var name = "", type = "";
            if (get('his').id == null) name = "Thêm mới ";
            else name = "Cập nhật ";

            if (get('his').type == 1)
                type = "chức vụ";
            else if (get('his').type == 2)
                type = 'cấp bậc';
            else if (get('his').type == 3)
                type = 'phòng ban';
            else
                type = 'ngạch, bậc lương';
            return name + type;
        }
    }
})