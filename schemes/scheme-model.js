const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
}

function find(){
    return db('schemes');
}

function findById(id){
    return db('schemes')
        .where({id})
        .first();
}

function findSteps(id){
    return db('steps')
        .join('schemes', 'steps.scheme_id', 'schemes_id')
        .where({scheme_id: id})
        .orderBy('steps.step_number');
}

function add(scheme){
    return db('schemes')
        .insert(scheme, 'id')
        .then(ids => {
            const [id] = ids;
            return findById(id)
        })
}

function update(changes, id){
    return db('schemes')
        .where({id})
        .update(changes)
        .then(res => {
            return findById(id)
        })
}

function remove(id){
    return db('schemes')
        .where({id})
        .insert(step, 'id')
}