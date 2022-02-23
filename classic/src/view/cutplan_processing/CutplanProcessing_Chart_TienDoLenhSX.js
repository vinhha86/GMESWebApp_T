Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Chart_TienDoLenhSX', {
    extend: 'Ext.Panel',
    xtype: 'CutplanProcessing_Chart_TienDoLenhSX',
    id: 'CutplanProcessing_Chart_TienDoLenhSX',
    itemId: 'CutplanProcessing_Chart_TienDoLenhSX',
    reference: 'CutplanProcessing_Chart_TienDoLenhSX',
    controller: 'CutplanProcessing_Chart_TienDoLenhSX_Controller',
    // tbar: [
    //     '->',
    //     {
    //         text: 'Hàng ngày',
    //         handler: 'onAmountInputShow'
    //     },
    //     {
    //         text: 'Ra chuyền',
    //         handler: 'onAmountOutputShow'
    //     }
    // ],    
    items: {
        xtype: 'cartesian',
        // itemId: 'Chart_TienDoCat',
        id: 'Chart_TienDoLenhSX',
        reference: 'chart',
        width: '100%',
        height: 150,
        padding: '10 0 10 0',
        legend: {
            type: 'sprite',
            docked: 'right'
        },        
        interactions: {
            type: 'panzoom',
            zoomOnPanGesture: true
        },
        animation: {
            duration: 200
        },
        // bind: {
        //     store: '{LineChartStore}'
        // },
        store: Ext.create('Ext.data.JsonStore', {
            fields: ['processingdate', 
            'amountinput', 'amountinputsum', 
            'amountoutput', 'amountoutputsum',
            'amountpacked', 'amountpackedsum',
            'amountstocked', 'amountstockedsum'
            ]
        }),
        innerPadding: {
            left: 10,
            right: 10
        },
        // captions: {
        //     title: 'Tiến độ sản xuất'
        // },
        axes: [{
            type: 'numeric',
            fields: ['amountinput', 'amountoutput', 'amountpacked', 'amountstocked'],
            position: 'left',
            grid: true,
            minimum: 0,
            // maximum: 500,
            renderer: 'onAxisLabelRender'
        }, {
            type: 'category',
            // dateFormat: 'd/m/y',
            position: 'bottom',
            grid: true,
            label: {
                rotate: {
                    degrees: -45
                }
            }
        }],
        series: [
            {
                type: 'line',
                smooth: true,
                showMarkers: true,
                title: 'SL vào chuyền',
                xField: 'processingdate',
                yField: 'amountinput',
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 4,
                    lineWidth: 2
                },
                label: {
                    field: 'amountinput',
                    display: 'over'
                },
                highlight: {
                    fillStyle: '#000',
                    radius: 5,
                    lineWidth: 2,
                    strokeStyle: '#fff'
                },
                tooltip: {
                    trackMouse: true,
                    showDelay: 0,
                    dismissDelay: 0,
                    hideDelay: 0,
                    renderer: 'onTooltipRender_Input'
                }
            },
            // {
            //     type: 'line',
            //     smooth: true,
            //     showMarkers: true,
            //     title: 'Ra chuyền',
            //     xField: 'processingdate',
            //     yField: 'amountoutput',
            //     style: {
            //         lineWidth: 2
            //     },
            //     marker: {
            //         radius: 4,
            //         lineWidth: 2
            //     },
            //     label: {
            //         field: 'amountoutput',
            //         display: 'over'
            //     },
            //     highlight: {
            //         fillStyle: '#000',
            //         radius: 5,
            //         lineWidth: 2,
            //         strokeStyle: '#fff'
            //     },
            //     tooltip: {
            //         trackMouse: true,
            //         showDelay: 0,
            //         dismissDelay: 0,
            //         hideDelay: 0,
            //         renderer: 'onTooltipRender_Output'
            //     }
            // },
            // {
            //     type: 'line',
            //     smooth: true,
            //     showMarkers: true,
            //     title: 'Đóng gói',
            //     xField: 'processingdate',
            //     yField: 'amountpacked',
            //     style: {
            //         lineWidth: 2
            //     },
            //     marker: {
            //         radius: 4,
            //         lineWidth: 2
            //     },
            //     label: {
            //         field: 'amountpacked',
            //         display: 'over'
            //     },
            //     highlight: {
            //         fillStyle: '#000',
            //         radius: 5,
            //         lineWidth: 2,
            //         strokeStyle: '#fff'
            //     },
            //     tooltip: {
            //         trackMouse: true,
            //         showDelay: 0,
            //         dismissDelay: 0,
            //         hideDelay: 0,
            //         renderer: 'onTooltipRender_Packed'
            //     }
            // },
            // {
            //     type: 'line',
            //     smooth: true,
            //     showMarkers: true,
            //     title: 'Nhập kho',
            //     xField: 'processingdate',
            //     yField: 'amountstocked',
            //     style: {
            //         lineWidth: 2
            //     },
            //     marker: {
            //         radius: 4,
            //         lineWidth: 2
            //     },
            //     label: {
            //         field: 'amountstocked',
            //         display: 'over'
            //     },
            //     highlight: {
            //         fillStyle: '#000',
            //         radius: 5,
            //         lineWidth: 2,
            //         strokeStyle: '#fff'
            //     },
            //     tooltip: {
            //         trackMouse: true,
            //         showDelay: 0,
            //         dismissDelay: 0,
            //         hideDelay: 0,
            //         renderer: 'onTooltipRender_Stocked'
            //     }
            // }           
        ],
        listeners: {
            afterrender: 'onChartRendered',
            // itemhighlight: 'onItemHighlight'
        }
    },
    dockedItems: [
        {
            dock: 'top',
            layout: 'hbox',
            xtype: 'toolbar',
            border: false,
            items: [
                {
                    xtype: 'displayfield',
                    fieldStyle: "font-weight: bold; font-size: 14px; color: black;",
                    labelWidth: 0,
                    value: 'Biểu đồ tiến độ lệnh sx'
                },
            ]
        }, 
    ],
});
