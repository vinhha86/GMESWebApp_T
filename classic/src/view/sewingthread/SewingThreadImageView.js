Ext.define('GSmartApp.view.sewingtrim.SewingThreadImageView', {
    extend: 'Ext.form.Panel',
    xtype: 'SewingThreadImageView',
    id: 'SewingThreadImageView',
    controller: 'SewingThreadImageViewController',
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
                margin: 1,
                hidden: true,
                msgTarget: 'Click để chọn ảnh'
            }, {
                xtype: 'image',
                itemId: 'img1',
                id:'imgsewtrim1',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img1}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                        Ext.create('Ext.tip.ToolTip', {
                            target : img.getEl(),
                            html : 'Click để xem chi tiết'
                        });
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
                id:'imgsewtrim2',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img2}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                        Ext.create('Ext.tip.ToolTip', {
                            target : img.getEl(),
                            html : 'Click để xem chi tiết'
                        });
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
                id:'imgsewtrim3',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img3}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                        Ext.create('Ext.tip.ToolTip', {
                            target : img.getEl(),
                            html : 'Click để xem chi tiết'
                        });
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
                id:'imgsewtrim4',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img4}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                        Ext.create('Ext.tip.ToolTip', {
                            target : img.getEl(),
                            html : 'Click để xem chi tiết'
                        });
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
                id:'imgsewtrim5',
                width: 35,
                height: 32,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{img.img5}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                        Ext.create('Ext.tip.ToolTip', {
                            target : img.getEl(),
                            html : 'Click để xem chi tiết'
                        });
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