Ext.define('GSmartApp.view.charts.ChartsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.charts',

    stores: {
        barData: {
            model: 'GSmartApp.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/oneyear'
            }
        },

        stackedData: {
            model: 'GSmartApp.model.MultiDataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/multiyear'
            }
        },

        gaugeData: {
            data: [
                {
                    position: 40
                }
            ],

            fields: [
                {
                    name: 'position'
                }
            ]
        },

        radialData: {
            model: 'GSmartApp.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/radial'
            }
        },

        lineData: {
            model: 'GSmartApp.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/marketshare/oneentity'
            }
        },

        pieData: {
            model: 'GSmartApp.model.DataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/pie'
            }
        },

        areaData: {
            model: 'GSmartApp.model.MultiDataXY',
            autoLoad: true,

            proxy: {
                type: 'api',
                url: '~api/dashboard/full'
            }
        }
    }
});
