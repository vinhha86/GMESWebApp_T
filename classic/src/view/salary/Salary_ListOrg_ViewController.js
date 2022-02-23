Ext.define('GSmartApp.view.salary.Salary_ListOrg_ViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_ListOrg_ViewController',
    init: function () {
        this.onload();
    },
    control: {
        '#Salary_ListOrg_View': {
            itemclick: 'onloadDetail'
        }
    },
    onloadDetail: function( grid, record, item, index, e, eOpts){
        var viewmodel = this.getViewModel();
        viewmodel.set('selected_orgid',record.get('id'));
       // viewmodel.set('orgid_link',record.get('id'));
        //Lay thong tin lương Basic
        var SalBasicStore = viewmodel.getStore('SalBasicStore');
        SalBasicStore.removeAll();
        SalBasicStore.loadStore_Async(record.get('id'));
		// this.load();
		SalBasicStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
					if (records.length > 0){
                        var record = records[0];
                        viewmodel.set('org_sal_basic.id',record.data.id);
                        viewmodel.set('org_sal_basic.sal_basic',record.data.sal_basic);
                        viewmodel.set('org_sal_basic.sal_min',record.data.sal_min);
                        viewmodel.set('org_sal_basic.workingdays',record.data.workingdays);
                        viewmodel.set('org_sal_basic.costpersecond',record.data.costpersecond);
                        viewmodel.set('org_sal_basic.overtime_normal',record.data.overtime_normal);
                        viewmodel.set('org_sal_basic.overtime_weekend',record.data.overtime_weekend);
                        viewmodel.set('org_sal_basic.overtime_holiday',record.data.overtime_holiday);
                        viewmodel.set('org_sal_basic.overtime_night',record.data.overtime_night);
                        viewmodel.set('org_sal_basic.date_cal_sal',record.data.date_cal_sal);
                    } else {
                        viewmodel.set('org_sal_basic.id',null);
                        viewmodel.set('org_sal_basic.sal_basic',null);
                        viewmodel.set('org_sal_basic.sal_min',null);
                        viewmodel.set('org_sal_basic.workingdays',null);
                        viewmodel.set('org_sal_basic.costpersecond',null);
                        viewmodel.set('org_sal_basic.overtime_normal',null);
                        viewmodel.set('org_sal_basic.overtime_weekend',null);
                        viewmodel.set('org_sal_basic.overtime_holiday',null);
                        viewmodel.set('org_sal_basic.overtime_night',null);
                        viewmodel.set('org_sal_basic.date_cal_sal',null);
                    }
				}
			}
        });
        
        //Lay thong tin Bang luong theo gio
        var SalTypeLevel_DefHourStore = viewmodel.getStore('SalTypeLevel_DefHourStore');
        SalTypeLevel_DefHourStore.removeAll();
        SalTypeLevel_DefHourStore.loadStore(record.get('id'),0);

        //Lay thong tin Bang luong nang suat
        var SalTypeLevel_DefProductivityStore = viewmodel.getStore('SalTypeLevel_DefProductivityStore');
        SalTypeLevel_DefProductivityStore.removeAll();
        SalTypeLevel_DefProductivityStore.loadStore(record.get('id'),1);

        //Lay thong tin Phu cap
        if (viewmodel.get('selected_tab') == 'Salary_DefCom_Position_Main') {
            var SalComStore = viewmodel.getStore('SalComStore');
            SalComStore.removeAll();
            SalComStore.loadStore(viewmodel.get('selected_orgid'),0);
        }
        if (viewmodel.get('selected_tab') == 'Salary_DefCom_Labor_Main') {
            var SalComStore = viewmodel.getStore('SalComStore');
            SalComStore.removeAll();
            SalComStore.loadStore(viewmodel.get('selected_orgid'),1);
        }
        
        //Xoa thong tin Vi tri cong viec
        var SalTypeLaborLevelStore = viewmodel.getStore('SalTypeLaborLevelStore');
        SalTypeLaborLevelStore.removeAll();   
        
        //lay thong tin ca lam viec
        var viewModel = this.getViewModel();
        var TimesheetShiftTypeOrgStore = viewModel.getStore('TimesheetShiftTypeOrgStore');
        TimesheetShiftTypeOrgStore.loadStorebyOrgid_link(record.get('id'));
    
    },
    onload: function () {
        var me = this.getView();
        var viewModel = this.getViewModel();
        var OrgStore = viewModel.getStore('OrgStore');
        OrgStore.loadStore_ByType('13');

        OrgStore.getSorters().add('orgtypeid_link');
        OrgStore.getSorters().add('is_manufacturer');
        OrgStore.getSorters().add('id');
    }
})