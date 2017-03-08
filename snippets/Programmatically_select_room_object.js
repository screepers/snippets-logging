/**
 * Selects an object on the screen with the indicated id.
 * Author: Dragnar
 * @param id
 */
global.selectObjectInBrowser = function(id) {
    var outstr = `<html><script>angular.element("body").injector().get("RoomViewPendingSelector").set('${id}');</script></html>`;
    console.log(outstr);
};