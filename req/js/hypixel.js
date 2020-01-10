var key = {
  "personal": "a1951abd-50a3-469b-95bf-758e9ace498f",
  "guild": "5d59774b77ce84663abe90f6"
}
function getPlayer(user, vari) {
  let url = "https://api.hypixel.net/player?key=" + key.personal + "&name=" + user
  let data = $.ajax({url: url, type: 'get', async: false, dataType: 'json',})
  if (vari != undefined) {
      return(data.responseJSON.player[vari])
    } else {
      return(data.responseJSON.player)
  }
}
function getGuild(vari) {
  let url = "https://api.hypixel.net/guild?key=" + key.personal + "&id=" + key.guild
  let data = $.ajax({url: url, type: 'get', async: false, dataType: 'json',})
  if (vari != undefined) {
      return(data.responseJSON.guild[vari])
    } else {
      return(data.responseJSON.guild)
  }
}
function getHighestMode() {
  let modes = getGuild("guildExpByGameType")
  let xp = []
  for (let i = 0; i < Object.keys(modes).length; i++) {
    xp.push(modes[Object.keys(modes)[i]])
  }
  xp.sort(function(a, b){return b - a})
  for (let n = 0; n < xp.length; n++) {
    for (let i = 0; i < xp.length; i++) {
      if (xp[n] == modes[Object.keys(modes)[i]]) {
        console.log(Object.keys(modes)[i] + " | " + xp[n])
        break;
      }
    }
  }
}
function getNameFromUUID(uuid) {
  let url = "https://api.hypixel.net/player?key=" + key.personal + "&uuid=" + uuid
  let data = $.ajax({url: url, type: 'get', async: false, dataType: 'json',})
  return(data.responseJSON.player.displayname)
}
function getAllMembers() {
  let members = getGuild("members")
  let users = []
  for (let i = 0; i < members.length; i++) {
    console.log(i)
    users.push(getNameFromUUID(members[i].uuid))
  }
  return(users)
}