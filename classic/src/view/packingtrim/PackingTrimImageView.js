Ext.define('GSmartApp.view.packingtrim.PackingTrimImageView', {
    extend: 'Ext.form.Panel',
    xtype: 'PackingTrimImageView',
    id: 'PackingTrimImageView',
    controller: 'PackingTrimImageViewController',
    IdProduct: 0,
    layout: 'hbox',
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
                itemId: 'btneditimg1',
                width: 35,
                height: 32,
                hidden: true,
                margin: 1
            }, {
                xtype: 'image',
                itemId: 'img1',
                id:'imgpackingtrim1',
                width: 35,
                height: 32,
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
                        dblclick: 'OpenFileDialog'
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
                itemId: 'btneditimg2',
                width: 35,
                height: 32,
                hidden: true,
                margin: 1
            }, {
                xtype: 'image',
                itemId: 'img2',
                id:'imgpackingtrim2',
                width: 35,
                height: 32,
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
                        dblclick: 'OpenFileDialog'
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
                itemId: 'btneditimg3',
                width: 35,
                height: 32,
                hidden: true,
                margin: 1
            }, {
                xtype: 'image',
                itemId: 'img3',
                id:'imgpackingtrim3',
                width: 35,
                height: 32,
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
                        dblclick: 'OpenFileDialog'
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
                itemId: 'btneditimg4',
                width: 35,
                height: 32,
                hidden: true,
                margin: 1
            }, {
                xtype: 'image',
                itemId: 'img4',
                id:'imgpackingtrim4',
                width: 35,
                height: 32,
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
                        dblclick: 'OpenFileDialog'
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
                itemId: 'btneditimg5',
                width: 35,
                height: 32,
                hidden: true,
                margin: 1
            }, {
                xtype: 'image',
                itemId: 'img5',
                id:'imgpackingtrim5',
                width: 35,
                height: 32,
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
                        dblclick: 'OpenFileDialog'
                    }
                }
            }]
        }]
    }, {
        xtype: 'image',
        width: 175,
        height: 168,
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