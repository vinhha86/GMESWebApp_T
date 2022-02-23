Ext.define('GSmartApp.view.TaskGrid.TaskGridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TaskGridController',
    control: {
        '#btnAddTask': {
            click: 'onAddTask'
        },
        '#btnRefresh' : {
            click: 'onRefresh'
        },
        '#cmbtype' : {
            select: 'onSelectType'
        },
        '#taskstatus' : {
            select: 'onSelectStatus'
        },
        '#comboOrgGrid' : {
            select : 'onSelectOrgGrid'
        },
        '#comboUserGrid' : {
            change : 'onChangeUserGrid'
        },
        '#TaskGrid' : {
            itemdblclick :'onItemDblclick'
        },
        '#btnSwitch' : {
            click: 'onBtnSwitch'
        }
    },
    init: function(){
        var viewmodel = this.getViewModel();

        var TaskBoard_Store = viewmodel.getStore('TaskBoard_Store');
        TaskBoard_Store.loadStore();
        
        var typeStore = viewmodel.getStore('TaskTypeStore');
        typeStore.loadStore();

        var listid = "13";
        var orgStore = viewmodel.getStore('OrgStore');
        orgStore.loadStore_allchildren_byorg(listid);
    },
    onBtnSwitch: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('isTaskGridHidden',true);
        Ext.getCmp('TaskBoardView').getViewModel().set('isTaskBoardHidden',false);
        Ext.getCmp('TaskBoardView').getViewModel().getStore('TaskBoard_Store').loadStore();
    },
    onRefresh: function(){
        var viewmodel = this.getViewModel();
        var TaskBoard_Store = viewmodel.getStore('TaskBoard_Store');
        TaskBoard_Store.load();
    },
    onSelectType: function(combo, record){
        var viewmodel = this.getViewModel();
        var tasktypeid_link = record.get('id');
        var TaskBoard_Store = viewmodel.getStore('TaskBoard_Store');
        // TaskBoard_Store.clearFilter();
        filters = TaskBoard_Store.getFilters();
        if (tasktypeid_link > -10) {
            this.tasktypeFilter = filters.add({
                id: 'tasktypeFilter',
                property: 'tasktypeid_link',
                value: tasktypeid_link,
                operator: '='
            });
        }
        else if (this.tasktypeFilter) {
            filters.remove(this.tasktypeFilter);
            this.tasktypeFilter = null;
        }
    },
    onSelectStatus: function(combo, record){
        var viewmodel = this.getViewModel();
        var Name = record.get('Name');
        var TaskBoard_Store = viewmodel.getStore('TaskBoard_Store');
        // TaskBoard_Store.clearFilter();
        filters = TaskBoard_Store.getFilters();
        if (Name != 'TatCa') {
            this.taskstatusFilter = filters.add({
                id: 'taskstatusFilter',
                property: 'State',
                value: Name,
                operator: '='
            });
        }
        else if (this.taskstatusFilter) {
            filters.remove(this.taskstatusFilter);
            this.taskstatusFilter = null;
        }
    },
    onSelectOrgGrid: function(combo, record){
        // console.log(record);
        var viewmodel = this.getViewModel();
        var storeUser = viewmodel.getStore('TaskUser_Store');
        storeUser.loadUserbyOrg(record.data.id);
        storeUser.load();
        var comboUserGrid = this.getView().down('#comboUserGrid');
        comboUserGrid.setValue('');
    },
    onChangeUserGrid: function(cb, newValue, oldValue){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            // filterField = this.lookupReference('userInChargeNameFilter'),
            filters = this.getView().store.getFilters();

        if (newValue) {
            this.userInChargeNameFilter2 = filters.add({
                id: 'userInChargeNameFilter2',
                property: 'UserInChargeName',
                value: newValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.userInChargeNameFilter2) {
            filters.remove(this.userInChargeNameFilter2);
            this.userInChargeNameFilter2 = null;
        }
    },
    onAddTask: function(){
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var TaskBoard_Store = viewmodel.getStore('TaskBoard_Store');
        var form = Ext.create('Ext.window.Window', {
            height: 200,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm việc mới',
            closeAction: 'destroy',
            width: 300,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'AddTask'
            }]
        });
        form.show();        
        form.down('#AddTask').down('#text').focus();

        form.down('#AddTask').on('Addtask', function(task){
            TaskBoard_Store.insert(0, task);
            form.close();
        })
    },
    onNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('nameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.nameFilter = filters.add({
                id: 'nameFilter',
                property: 'name',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.nameFilter) {
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    onDescriptionFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('descriptionFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.descriptionFilter = filters.add({
                id: 'descriptionFilter',
                property: 'description',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.descriptionFilter) {
            filters.remove(this.descriptionFilter);
            this.descriptionFilter = null;
        }
    },
    onUserInChargeNameFilterKeyup:function(){
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('userInChargeNameFilter'),
            filters = this.getView().store.getFilters();

        if (filterField.value) {
            this.userInChargeNameFilter = filters.add({
                id: 'userInChargeNameFilter',
                property: 'UserInChargeName',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.userInChargeNameFilter) {
            filters.remove(this.userInChargeNameFilter);
            this.userInChargeNameFilter = null;
        }
    },
    onItemDblclick: function(thisView, record, item, index, e, eOpts){
        // console.log(thisView);
        // console.log(record);
        // console.log(item);
        // console.log(index);
        // console.log(e);
        var form = Ext.create('Ext.window.Window', {
            height: 550,
            width: 550,
            header: false,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                // padding: 5
            },
            items: [{
                border: false,
                xtype: 'TaskGridEditor',
                viewModel: {
                    data: {
                        record: record.data
                    }
                }
            }]
        });
        form.show();
    },
})