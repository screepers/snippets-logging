// Posted by Fubz

Creep.prototype.logError = function(functionName, error) {
	if(!isNaN(error)) {
		let errorCodeToText = function(errorCode) {
			switch(errorCode) {
				case 0:
					return 'OK'
					break
				case -1:
					return 'ERR_NOT_OWNER'
					break
				case -2:
					return 'ERR_NO_PATH'
					break
				case -3:
					return 'ERR_NAME_EXISTS'
					break
				case -4:
					return 'ERR_BUSY'
					break
				case -5:
					return 'ERR_BUSY'
					break
				 case -6:
					return 'ERR_NOT_ENOUGH_ENERGY or RESOURCES or EXTENSIONS'
					break
				case -7:
					return 'ERR_INVALID_TARGET'
					break
				case -8:
					return 'ERR_FULL'
					break
				case -9:
					return 'ERR_NOT_IN_RANGE'
					break
				case -10:
					return 'ERR_INVALID_ARGS'
					break
				case -11:
					return 'ERR_TIRED'
					break
				case -12:
					return 'ERR_NO_BODYPART'
					break
				case -14:
					return 'ERR_RCL_NOT_ENOUGH'
					break
				case -15:
					return 'ERR_GCL_NOT_ENOUGH'
					break
				default:
					return `Unknown: ${errorCode}`
			}
    	}
		error = errorCodeToText(error)
	}

	console.log(`${functionName}(${roomLink(this, this.name)}): ${error}`)
}
/**
 * returns string for a link that can be clicked from the console
 * to change which room you are viewing. Useful for other logging functions.
 * If you pass a room object that has a '.id' property, that object will be selected
 * upon entering the room.
 * Author: Helam, Dragnar, Fubz
 * @param roomArg {Room|RoomObject|RoomPosition|RoomName}
 * @param text {String} optional text value of link
 * @param select {boolean} whether or not you want the object to be selected when the link is clicked.
 * @returns {string}
 */
global.roomLink = function(roomArg, text = undefined, select = true) {
    let roomName;
    let id = roomArg.id;
    if (roomArg instanceof Room) {
        roomName = roomArg.name;
    } else if (roomArg.pos != undefined) {
        roomName = roomArg.pos.roomName;
    } else if (roomArg.roomName != undefined) {
        roomName = roomArg.roomName;
    } else if (typeof roomArg === 'string') {
        roomName = roomArg;
    } else {
        console.log(`Invalid parameter to roomLink global function: ${roomArg} of type ${typeof roomArg}`);
    }
    text = text || (id ? roomArg : roomName);
    return `<a href="#!/room/${roomName}" ${select && id ? `onclick="angular.element('body').injector().get('RoomViewPendingSelector').set('${id}')"` : ``}>${text}</a>`;
};