Ext.define('GSmartApp.view.salary.Salary_Def_Main_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Salary_Def_Main_Controller',
    control: {
        '#tabmain': {
            tabchange: 'onTabChange'
        }
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        var SalTypeLaborLevelStore = viewmodel.getStore('SalTypeLaborLevelStore');
        SalTypeLaborLevelStore.removeAll();

        //Ghi nhan Tab active
        viewmodel.set('selected_tab',newCard.xtype)
        viewmodel.set('selected_salcomid',null)
        
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
    }
})