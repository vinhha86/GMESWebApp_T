Ext.define('GSmartApp.view.cutplan_processing.CutplanProcessing_Chart_TienDoCat', {
    extend: 'Ext.Panel',
    xtype: 'CutplanProcessing_Chart_TienDoCat',
    id: 'CutplanProcessing_Chart_TienDoCat',
    itemId: 'CutplanProcessing_Chart_TienDoCat',
    reference: 'CutplanProcessing_Chart_TienDoCat',
    controller: 'CutplanProcessing_Chart_TienDoCat_Controller',
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
        id: 'Chart_TienDoCat',
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
        //     store: '{CutLineChartStore}'
        // },
        store: Ext.create('Ext.data.JsonStore', {
            fields: ['processingdate', 
            'amountcut'
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
            fields: ['amountcut'],
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
                title: 'SL cắt',
                xField: 'processingdate',
                yField: 'amountcut',
                style: {
                    lineWidth: 2
                },
                marker: {
                    radius: 4,
                    lineWidth: 2
                },
                label: {
                    field: 'amountcut',
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
                    renderer: 'onTooltipRender_Cut'
                }
            },
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
                    value: 'Biểu đồ tiến độ cắt'
                },
            ]
        }, 
    ],
});
