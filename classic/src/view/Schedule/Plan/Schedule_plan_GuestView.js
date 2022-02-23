Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_GuestView', {
    extend: 'Ext.panel.Panel',
    xtype: 'Schedule_plan_GuestView',
    id: 'Schedule_plan_GuestView',
    controller: 'Schedule_plan_GuestViewController',
    viewModel: {
        type: 'Schedule_plan_GuestViewModel'
    },
    requires: [
        'Sch.plugin.Zones',
        'Sch.data.ResourceTreeStore',
        'Sch.data.CrudManager',
        'GSmartApp.model.Schedule_Holiday_model',
        'GSmartApp.model.Schedule_Porder_model',
        'GSmartApp.model.Schedule_Plan_model',
        'Sch.plugin.Printable'
    ],
    layout: 'fit',
    initComponent: function () {
        var me = this,
            viewmodel = this.getViewModel(),

            HolidayStore = new Sch.data.EventStore({
                model: 'GSmartApp.model.Schedule_Holiday_model',
                storeId: 'zones',
                autoDestroy: true
            }),

            eventStore = new Sch.data.EventStore({
                model: 'GSmartApp.model.Schedule_Porder_model',
                storeId: 'events'
            }),

            resourceStore = new Sch.data.ResourceTreeStore({
                model: 'GSmartApp.model.Schedule_Plan_model',
                storeId: 'resources',
                sorters: [{
                    property: 'id_origin',
                    direction: 'ASC'
                }]
            });

        var cm = new Sch.data.CrudManager({
            autoLoad: false,
            resourceStore: resourceStore,
            eventStore: eventStore,
            transport: {
                load: {
                    requestConfig: {
                        url: config.getAppBaseUrl() + '/api/v1/schedule/getplan',
                        method: 'POST',
                        headers: {
                            'Accept': "application/json",
                            'Content-Type': "application/json"
                        },
                        params: {
                            listid: '13,14',
                            startDate:  new Date((new Date()).getFullYear(), (new Date()).getMonth()-1, 1),
                            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth()+6, 1),
                            PO_code: '',
                            contractcode: '',
                            Buyer: 0,
                            Vendor: 0,
                            isReqPorder: false,
                            isAllgrant: true
                        }
                    }

                }
            },
            stores: [
                HolidayStore
            ]
        });

        var sch = Ext.create('Sch.panel.SchedulerTree', {
            rowHeight: 30,
            barMargin: 2,
            id: 'treeplanguest',
            useArrows: true,
            autoAdjustTimeAxis: false,
            zoomLevels: [
                { width: 50,    increment: 1,   resolution: 4, preset: 'year', resolutionUnit: 'MONTH' },
                { width: 50,    increment: 1,   resolution: 1, preset: 'monthAndYear', resolutionUnit: 'MONTH' },
                { width: 50,    increment: 1,   resolution: 1, preset: 'weekAndMonth', resolutionUnit: 'WEEK' },
                { width: 20,   increment: 1,   resolution: 1, preset: 'weekAndDayLetter', resolutionUnit: 'WEEK' },
            ],
            viewPreset: {
                name: 'weekAndDayLetter',
                displayDateFormat: 'd/m/Y',
                headerConfig: {
                    bottom: {
                        unit: 'DAY',
                        increment: 1,
                        dateFormat: 'd'
                    },
                    middle: {
                        unit: 'WEEK',
                        dateFormat: 'm-Y',
                        align: 'center'
                    }
                }
            },
            multiSelect: true,
            border: true,
            bodyBorder: false,
            eventBorderWidth: 0,
            columnLines: true,
            rowLines: true,
            cls: 'tree-scheduler',
            snapRelativeToEventStartDate : false,
            tooltipTpl: new Ext.XTemplate(
                '<ul class="eventTip">',
                '<li>{mahang}</li>',  
                '<li>Lệnh SX: {pordercode}</li>',                
                '<li>Buyer: {buyername}</li>',
                '<li>Vendor: {vendorname}</li>',
                '<li>Vào chuyền: {[Ext.Date.format(values.StartDate, "d-m-Y")]}</li>',
                '<li>Kết thúc: {[Ext.Date.format(values.EndDate, "d-m-Y")]}</li>',
                '<li>Số ngày SX: {duration}</li>',
                '<li>Năng suất: {productivity}</li>',
                '</ul>'
            ),
            eventRenderer: function (flight, resource, meta) {
                if (resource.data.leaf) {
                    return flight.get('mahang');
                } else {
                    return '&nbsp;';
                }
            },
            viewConfig: {
                plugins: {
                    ptype: 'treeviewdragdrop',
                    enableDrag: true,
                    dragGroup: 'porderGanttDropGroup',
                    dropGroup: 'porderFreeDropGroup'
                },
                listeners: {
                    beforedrop: 'onBeforeDrop'
                }
            },

            columns: [
                {
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    text: 'Nhà máy',
                    width: 200,
                    sortable: false,
                    dataIndex: 'Name'
                },
                {
                    xtype: 'actioncolumn',
                    width: 30,
                    menuDisabled: true,
                    sortable: false,
                    items: [{
                        iconCls: 'x-fa fas fa-eye',
                        handler: 'onHidden',
                        getTip: function(value, metadata, record, row, col, store) {
                           if(record.get('type') == 0){
                               return 'Hiện tổ';
                           }
                           else {
                               return 'Ẩn tổ';
                           }
                        }
                    }]
                }
            ],
            crudManager: cm,
            startDate: viewmodel.get('schedule.startDate'),
            endDate: viewmodel.get('schedule.endDate'),
            plugins: [
                {
                    ptype: 'scheduler_zones',
                    store: HolidayStore
                },
                {
                    ptype: 'scheduler_printable',
                    pluginId: 'printable',
                    // Configure what to show in print dialog
                    exportDialogConfig: {
                        dateRangeRestriction: false,
                        stateful: true,
                        modal: true,
                        format           : "A3",
                        orientation      : "landscape",
                        range            : "complete",
                        showHeader       : false,
                    },
                    autoPrintAndClose   : true
                }
            ],
            listeners : {
                eventcontextmenu: 'onContextMenu',
                aftereventresize: 'onResizeSchedule',
                eventdrop: 'onEventDrop',
                beforeeventdropfinalize: 'beforeDrop',
                zoomchange: 'onZoomchange',
                render : 'onSchedulerRender'
            }
        })

        Ext.apply(me, {
            items: [sch]
        });

        me.callParent();
    },
    onDestroy : function() {
        // this.crudManager.destroy();
        // this.callParent();
    }
});