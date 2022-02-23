Ext.define('GSmartApp.model.TaskBoard.SubTask_model', {
    extend : 'Kanban.model.Task',

    fields : [
        { name : 'Done', type : 'boolean' },
        { name : 'TaskId', reference : 'GSmartApp.model.TaskBoard.TaskBoard_Model' }
    ]
});