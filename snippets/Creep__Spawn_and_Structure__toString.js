// Posted by Semperrabit

RoomPosition.prototype.toString = function (htmlLink = true, id = undefined, memWatch = undefined) {
    if(htmlLink){
        var onClick = '';
        if(id)       onClick += `angular.element('body').injector().get('RoomViewPendingSelector').set('${id}');`;
        if(memWatch) onClick += `angular.element($('section.memory')).scope().Memory.addWatch('${memWatch}'); angular.element($('section.memory')).scope().Memory.selectedObjectWatch='${memWatch}';`;
        return `<a href="#!/room/${this.roomName}" onClick="${onClick}">[${ this.roomName } ${ this.x },${ this.y }]</a>`;
    }
    return `[${ this.roomName } ${ this.x },${ this.y }]`;
};


Creep.prototype.toString = function (htmlLink = true){
    return `[${(this.name ? this.name : this.id)} ${this.pos.toString(htmlLink, this.id, 'creeps.'+this.name)}]`;
}

Structure.prototype.toString = function (htmlLink = true){
    return `[structure (${this.structureType}) #${this.id} ${this.pos.toString(htmlLink, this.id, 'structures.' + this.id)}]`;
}

StructureSpawn.prototype.toString = function (htmlLink = true){
    return `[spawn ${this.name} ${this.pos.toString(htmlLink, this.id, 'spawns.' + this.name)}]`;
}
