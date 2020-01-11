Array.prototype.mFix = function() {
  for (let i = 0; i < this.length-1; i++) {
    this[i] = this[i] + "}"
  }
  return(this)
}
function getAllMembers() {
  let members = getGuild("members")
  let profiles = []
  for (let i = 0; i < members.length; i++) {
    let profile = getProfileFromUUID(members[i].uuid)
    profiles.push(JSON.stringify({
        "username": profile.displayname,
        "level": ((Math.sqrt(profile.networkExp + 15312.5) - 125/Math.sqrt(2))/(25*Math.sqrt(2))).toFixed(0)
    }))
  } 
  return(profiles)
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
        if (parseInt(localStorage.getItem("updateTime")) + 172800 < ((new Date).getTime()/1000).toFixed(0)) {
            equal = "force"
            return(equal)
        }
        return(equal)
    }
}
function updateGuild(opt) {
    if (opt != "force") {
        if (localStorage.getItem("guild") == null) {
            localStorage.setItem("guild", JSON.stringify(getGuild()))
        }
        if (localStorage.getItem("guildP") == null) {
            localStorage.setItem("guildP", getAllMembers())
        }
    } else {
        console.warn("Forcing reload of Guild Cache.")
        localStorage.setItem("guild", JSON.stringify(getGuild()))
        localStorage.setItem("guildP", getAllMembers())
    }
    localStorage.setItem("updateTime", ((new Date).getTime()/1000).toFixed(0))
}
//<div class="item-hints"><div class="hint" data-position="4"><!-- is-hint --><img src="https://crafatar.com/avatars/8065a5b5d5a04ee29ff2d31c4d92c6f8?overlay" width="96px" height="96px"><span class="hint-radius"></span><div class="hint-content do--split-children"><p></p></div></div></div>   
updateGuild(checkGuild())
let rankList = JSON.parse(localStorage.getItem("guild")).ranks.sort(function(a, b) {return(b.priority - a.priority)})
let membersList = JSON.parse(localStorage.getItem("guild")).members
let profileList = localStorage.getItem("guildP").split("},").mFix()
$("#main").append('<h1>Guild Master</h1><hr><row id="GuildMaster"></row>')
for (let i = 0; i < rankList.length; i++) {
    $("#main").append('<h1>' + rankList[i].name + '</h1><hr><row id="'+ rankList[i].name.replace(/\s/g, '') + '"></row>')
    if (rankList[i].name == "Active") {
        $("#main").append('<h1>Youtuber</h1><hr><row id="Youtuber"></row>')
    }
}
for (let i = 0; i < membersList.length; i++) {
    let username = JSON.parse(profileList[i]).username
    let level = JSON.parse(profileList[i]).level
    if (membersList[i].rank != "Youtuber") {
        $("#" + membersList[i].rank.replace(/\s/g, '')).append('<div class="item-hints"><div class="hint" data-position="4"><!-- is-hint --><img src="https://crafatar.com/avatars/' + membersList[i].uuid + '?overlay" width="96px" height="96px"><span class="hint-radius"></span><div class="hint-content do--split-children"><p>' + username + '<br>Level ' + level + '</p></div></div></div>')
    } else {
        $("#" + membersList[i].rank).append('<div class="item-hints"><div class="hint" data-position="4"><!-- is-hint --><img src="https://crafatar.com/avatars/' + membersList[i].uuid + '?overlay" width="96px" height="96px"><span class="hint-radius"></span><div class="hint-content do--split-children"><p>' + username + '<br>Level ' + level + '</p></div></div></div>')
    }
}
