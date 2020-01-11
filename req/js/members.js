function getAllMembers() {
  let members = getGuild("members")
  let users = []
  for (let i = 0; i < members.length; i++) {
    users.push(getNameFromUUID(members[i].uuid))
  }
  return(users)
}
function checkGuild() {
    if (JSON.parse(localStorage.getItem("guild")) != null) {
        let guildNew = getGuild()
        let guildOld = JSON.parse(localStorage.getItem("guild"))
        let equal 
        if (guildNew.members.length != guildOld.members.length) {
            equal = "force"
            return(equal)
        } else if (guildNew.ranks.length != guildOld.ranks.length) {
            equal = "force"
            return(equal)
        } else {
            for (let i = 0; i < guildNew.ranks.length; i++) {
                if (guildNew.ranks[i].name != guildOld.ranks[i].name) {
                    equal = "force"
                    return(equal)
                }
            }
            for (let i = 0; i < guildNew.members.length; i++) {
                if (guildNew.members[i].uuid != guildOld.members[i].uuid) {
                    equal = "force"
                    return(equal)
                }
            }
        }
        return(equal)
    }
}
function updateGuild(opt) {
    if (opt != "force") {
        if (localStorage.getItem("guild") == null) {
            localStorage.setItem("guild", JSON.stringify(getGuild()))
        }
        if (localStorage.getItem("guildUS") == null) {
            localStorage.setItem("guildUS", getAllMembers())
        }
    } else {
        console.warn("Forcing reload of Guild Cache.")
        localStorage.setItem("guild", JSON.stringify(getGuild()))
        localStorage.setItem("guildUS", getAllMembers())
    }
}
//<div class="item-hints"><div class="hint" data-position="4"><!-- is-hint --><img src="https://crafatar.com/avatars/8065a5b5d5a04ee29ff2d31c4d92c6f8?overlay" width="96px" height="96px"><span class="hint-radius"></span><div class="hint-content do--split-children"><p></p></div></div></div>   
updateGuild(checkGuild())
let rankList = JSON.parse(localStorage.getItem("guild")).ranks.sort(function(a, b) {return(b.priority - a.priority)})
let membersList = JSON.parse(localStorage.getItem("guild")).members
let namesList = localStorage.getItem("guildUS").split(",")
$("#main").append('<h1>Guild Master</h1><hr><row id="GuildMaster"></row>')
for (let i = 0; i < rankList.length; i++) {
    $("#main").append('<h1>' + rankList[i].name + '</h1><hr><row id="'+ rankList[i].name.replace(/\s/g, '') + '"></row>')
}
for (let i = 0; i < membersList.length; i++) {
    $("#" + membersList[i].rank.replace(/\s/g, '')).append('<div class="item-hints"><div class="hint" data-position="4"><!-- is-hint --><img src="https://crafatar.com/avatars/' + membersList[i].uuid + '?overlay" width="96px" height="96px"><span class="hint-radius"></span><div class="hint-content do--split-children"><p>' + namesList[i] + '</p></div></div></div>')
}
