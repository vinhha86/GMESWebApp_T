Ext.define('GSmartApp.view.Schedule.Plan.Schedule_plan_View', {
    extend: 'Ext.panel.Panel',
    xtype: 'Schedule_plan_View',
    id: 'Schedule_plan_View',
    controller: 'Schedule_plan_ViewController',
    viewModel: {
        type: 'Schedule_plan_ViewModel'
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
    readOnly: false,
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
        var startDate = new Date(new Date().getTime() - 30 * 86400000);
        var cm = new Sch.data.CrudManager({
            autoLoad: false,
            resourceStore: resourceStore,
            eventStore: eventStore,
            transport: {
                load: {
                    requestConfig: {
                        url: config.getAppBaseUrl() + '/api/v1/schedule/getplan',
                        method: 'POST',
                        timeout: 120000,
                        headers: {
                            'Accept': "application/json",
                            'Content-Type': "application/json"
                        },
                        params: {
                            listid: '13,14',
                            startDate: startDate,
                            endDate: new Date((new Date()).getFullYear(), (new Date()).getMonth() + 6, 1),
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
            readOnly: me.readOnly,
            rowHeight: 40,
            barMargin: 1,
            id: 'treeplan',
            useArrows: true,
            autoAdjustTimeAxis: false,
            enableDragCreation: false,
            zoomLevels: [
                { width: 50, increment: 1, resolution: 4, preset: 'year', resolutionUnit: 'MONTH' },
                { width: 50, increment: 1, resolution: 1, preset: 'monthAndYear', resolutionUnit: 'MONTH' },
                { width: 50, increment: 1, resolution: 1, preset: 'weekAndMonth', resolutionUnit: 'WEEK' },
                { width: 20, increment: 1, resolution: 1, preset: 'weekAndDayLetter', resolutionUnit: 'WEEK' },
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
            snapRelativeToEventStartDate: true,
            tooltipTpl: new Ext.XTemplate(
                '<ul class="eventTip">',
                '<li>{lineinfo}</li>',
                '</ul>'
            ),
            eventRenderer: function (flight, resource, meta) {
                // if(flight.get('grant_type') == 1)
                //     meta.cls = 'x-fa fa-exclamation-circle ';
                if (resource.data.type >= 1) {
                    var img = "";
                    if (null != flight.get('icon')) {
                        img = '<img style="margin: 0px; width: 31px; height: 31px; border: 1px solid black; left: 1px; top: 1px;" src="' + flight.get('icon') + '">';
                        if (flight.get('grant_type') == 1) {
                            if (flight.get('is_show_image'))
                                return '<div class = "x-fa fa-exclamation-circle">' + "&nbsp;" + img + "&nbsp;" + flight.get('mahang') + '</div>';
                            else
                                return '<div class = "x-fa fa-exclamation-circle">' + "&nbsp;" + flight.get('mahang') + '</div>';
                        }
                        else {
                            if (flight.get('is_show_image'))
                                return img + "&nbsp;" + flight.get('mahang');
                            else
                                return "&nbsp;" + flight.get('mahang');
                        }

                    } else {
                        if (flight.get('grant_type') == 1) {
                            return '<div class = "x-fa fa-exclamation-circle">' + "&nbsp;" + flight.get('mahang') + '</div>';
                        }
                        return flight.get('mahang');
                    }
                } else {
                    return '&nbsp;';
                }

            },
            // eventBodyTemplate : '<div> </div>',
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
                    width: 26,
                    menuDisabled: true,
                    sortable: false,
                    hidden: true,
                    items: [{
                        iconCls: 'x-fa fas fa-eye',
                        handler: 'onHidden',
                        getTip: function (value, metadata, record, row, col, store) {
                            if (record.get('type') == 0) {
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
                    defaultExporter: 'singlepage',
                    // Configure what to show in print dialog
                    exportDialogConfig: {
                        dateRangeRestriction: false,
                        stateful: true,
                        modal: true,
                        format: "A3",
                        orientation: "landscape",
                        range: "visible",
                        rowsRange: 'visible',
                        showHeader: false,
                        showDPIField: false
                    },
                    // exportConfig: {
                    //     format: 'A3',
                    //     orientation: 'lanscape',
                    //     range: 'complete',
                    //     rowsRange: 'all',
                    //     showHeader: false,
                    //     showFooter: false
                    // },
                    autoPrintAndClose: false
                }
            ],
            l10n: {
                loadingText: 'Đang tải dữ liệu!'
            },
            listeners: {
                eventcontextmenu: 'onContextMenu',
                aftereventresize: 'onResizeSchedule',
                eventdrop: 'onEventDrop',
                beforeeventdropfinalize: 'beforeDrop',
                zoomchange: 'onZoomchange',
                render: 'onSchedulerRender',
                eventdblclick: 'onItemDblClick',
                beforeeventdrag: 'onbeforeDrag'
            }
        })

        Ext.apply(me, {
            items: [sch]
        });

        me.callParent();
    },
    onDestroy: function () {
    }
});