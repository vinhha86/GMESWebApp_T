Ext.define('GSmartApp.view.pcontract.PContractImageView', {
    extend: 'Ext.form.Panel',
    xtype: 'PContractImageView',
    id: 'PContractImageView',
    controller: 'PContractImageViewCotroller',
    viewModel: {
        type: 'PContractImageViewModel'
    },
	layout: {
        type: 'hbox',
        align: 'stretch'
    },    
    items: [{
        layout: 'vbox',
        border: false,
        items: [{
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg1',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img1',
                id: 'pcontract_imgproduct1',
                width: 55,
                height: 52,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img1}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog',
                        contextmenu: 'onDelete'
                    }
                }
            }]
        }, {
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg2',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img2',
                id: 'pcontract_imgproduct2',
                width: 55,
                height: 52,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img2}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog',
                        contextmenu: 'onDelete'
                    }
                }
            }]
        }, {
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg3',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img3',
                id: 'pcontract_imgproduct3',
                width: 55,
                height: 52,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img3}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog',
                        contextmenu: 'onDelete'
                    }
                }
            }]
        }, {
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg4',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img4',
                id: 'pcontract_imgproduct4',
                width: 55,
                height: 52,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img4}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog',
                        contextmenu: 'onDelete'
                    }
                }
            }]
        }, {
            layout: 'hbox',
            border: false,
            items: [{
                xtype: 'filefield',
                buttonText: '...',
                buttonOnly: true,
                hidden: true,
                itemId: 'btneditimg5',
                accept: 'image/*',
                width: 35,
                height: 32,
                margin: 1
            },{
                xtype: 'image',
                itemId: 'img5',
                id: 'pcontract_imgproduct5',
                width: 55,
                height: 52,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img5}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    },
                    el: {
                        click: 'onView',
                        dblclick: 'OpenFileDialog',
                        contextmenu: 'onDelete'
                    }
                }
            }]
        }]
    }, {
        xtype: 'image',
        flex: 1,
        // width: 205,
        // height: 203,
        margin: 1,
        itemId: 'imgView',
        bind: {
            src: 'data:image/gif;base64,' + '{img.img1}'
        },
        listeners: {
            afterrender: function (img, a, obj) {
                img.getEl().dom.style.border = '1px solid black';
            }
        }
    }]
})