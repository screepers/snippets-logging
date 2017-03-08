// Posted by Semperrabbit
/* Comments from #logging:
semperrabbit Dec 31st, 2016 at 5:05 PM  
-you will need to populate the `Memory.screepsplusToken` with what was provided to you.
-you will have to call `agentRun()` each tick to publish the data.
-this will only work while you have a client open (recommended for private servers only b/c of that)
-if used on a private server, set `global.private` to true, so the data pushed will be prefixed with `priv` so it doesnt get mixed up with live game data
semperrabbit Dec 31st, 2016 at 5:15 PM  
also, big thank you to @ags131 for helping with this...
somotaw Jan 3rd at 7:08 AM  
Praise this!
*/

global.private = false;

global.agentRun = function(){//*
    var statsDataJSON = "";
    if(private){
        var privObj = {priv: Memory.stats};
        statsDataJSON = JSON.stringify(privObj);
    } else {
        statsDataJSON = JSON.stringify(Memory.stats)
    }
    var passToken = Memory.screepsplusToken;
    var output = `<SCRIPT>
if(!document.ticks)document.ticks={}
if(document.ticks['t${Game.time}']===undefined){
 document.ticks['t${Game.time}']=true
 var x=new XMLHttpRequest()
 x.open("POST", "https://screepspl.us/api/stats/submit", true)
 x.setRequestHeader("Authorization","JWT " + "${passToken}")
 x.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
 x.onreadystatechange=function(){if(x.readyState===XMLHttpRequest.DONE&&x.status===200){console.log('resp',x.responseText);}}
 x.send(JSON.stringify(${statsDataJSON}))
}
</SCRIPT>`
    console.log(output.split('\n').join(';'));
//*/
}