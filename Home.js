// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBnEq5PItQhk1tt67ysK_DsrCT3cQIqnRI",
  authDomain: "hrishit-gadia.firebaseapp.com",
  databaseURL: "https://hrishit-gadia-default-rtdb.firebaseio.com",
  projectId: "hrishit-gadia",
  storageBucket: "hrishit-gadia.appspot.com",
  messagingSenderId: "587509759577",
  appId: "1:587509759577:web:5dbbb8b8cb7d3f6e6dbb48"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//getdata
UserId = localStorage.getItem('User Id');

function OpenChat(ChatId) {
  localStorage.setItem("ChatId", ChatId);
  Icon = document.getElementById(ChatId + "IMG").src;
  Title = document.getElementById(ChatId + "TITLE").innerHTML;
  Des = document.getElementById(ChatId + "DES").innerHTML;
  Header = '<div class="row header" id="' + ChatId + '"' +
    'data-bs-toggle="modal" data-bs-target="#Settings"><img src="' + Icon + '+IMG" class="img-responsive profile"><div class="col"><h5 id="' + ChatId + 'Title">&nbsp ' + Title + ' </h5><h5 id="' + ChatId + 'Des"> &nbsp ' + Description + ' </h5></h5></div></div>';
  Settingsmodal = '<div class="modal" id="Settings"> <div class="modal-dialog"> <div class="modal-content"> <!-- Modal Header --> <div class="modal-header"> <h4 class="modal-title"id="' + ChatId + 'Title">' + Title + '”s Settings</h4> <button type="button" class="btn-close" data-bs-dismiss="modal"></button> </div> <!-- Modal body --> <div class="modal-body"><p>Visible To: </p><input id="Visiblity" placeholder="Who Can Join This Chat (User Id)"><br><br><button type="submit" onclick="ChangeSet(this.id)" class="btn btn-info" id="' + ChatId + '">Commit Changes</button></div> <!-- Modal footer --> <div class="modal-footer"> <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> </div> </div> </div> </div>'
  document.getElementById("Msg").innerHTML = Header;
  document.getElementById("sts").innerHTML = Settingsmodal;
  firebase.database().ref("/Chats/" + ChatId).on("value", function (snapshot) {
    ChatData = snapshot.val()
    console.info(ChatData)

    Title = ChatData["Title"]
    Description = ChatData["Description"]
    Visiblity = ChatData["Visible"]
    Icon = ChatData["Icon"]

    document.getElementById("Visiblity").value = Visiblity;


  }, function (error) {
    console.log("Error: " + error.code);
  });
  getmsg(ChatId, Header)
}
function getmsg(Msg_owner) {
  firebase.database().ref(`Chats/` + Msg_owner + '/Messages').on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      MessageID = childSnapshot.key;
      MessageData = childSnapshot.val();
      Sent_By = MessageData["Sent_by"]
      Sent_on = MessageData["Sent_on"]
      Sent_message = MessageData["Sent_message"]
      Sent_by_name = MessageData["Sent_by_name"]

      if (Sent_By == UserId) {
        Message_Right = '<br><br> <div class="row Right"> <img src="Logo.png" class="Icon"> <div class="col"> <h5>' + Sent_by_name + '</h5> <p>' + Sent_message + '</p> </div> </div> <br><br>';
        document.getElementById("Msgs").innerHTML = document.getElementById("Msgs").innerHTML + Message_Right;
      }
      else {
        Message_Left = '<br><br> <div class="row Left"> <img src="Logo.png" class="Icon"> <div class="col"> <h5>' + Sent_by_name + '</h5> <p>' + Sent_message + '</p> </div> </div> <br><br>';
        document.getElementById("Msgs").innerHTML = document.getElementById("Msgs").innerHTML + Message_Left;
      }
    })

  });
}
var Visiblity = "";
function GetData() {
  AddModal = '<div class="modal" id="Chat"> <div class="modal-dialog"> <div class="modal-content"> <!-- Modal Header --> <div class="modal-header"> <h4 class="modal-title"id="Title"> Add A new Chat </h4> <button type="button" class="btn-close" data-bs-dismiss="modal"></button> </div> <!-- Modal body --> <div class="modal-body"><p>Group Name: </p><input id="GrpName" placeholder="White The Name Of The Group"><br><br><p>Visible To: </p><input id="GrpSeen" placeholder="Who all can Join This Group (User Id)"><br><br><button type="submit" onclick="ChangeSet(this.id)" class="btn btn-info" id="' + 'NewChat">Make Group/Chat</button></div> <!-- Modal footer --> <div class="modal-footer"> <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button> </div> </div> </div> </div>';
  document.getElementById("Home").innerHTML = document.getElementById("Home").innerHTML + AddModal;
  document.getElementById('header').innerHTML = '<img id="userPic" class="img-responsive col-sm-2 col-lg-2" src="Logo.png"><p class="col"> Your User Id : ' + UserId + '</p><button onclick="Addchat()" class="col glyphicon glyphicon-plus" id="add"data-bs-toggle="modal" data-bs-target="#Chat"> Add Chat</button>'
  firebase.database().ref(`/Chats/`).on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      ChatId = childSnapshot.key;
      ChatData = childSnapshot.val();
      Visiblity = ChatData["Visible"]
      console.log(typeof Visiblity)
      if (typeof Visiblity == "string") {
        Ad = Visiblity.includes(UserId)
        if (Ad == true) {
          Icon = ChatData["Icon"]
          Title = ChatData["Title"]
          Description = ChatData["Description"]

          ChatItem = '<hr><div class="border row" style="width:100%;margin:0; height: fit-content;text-align:center; background:none;" id="' + ChatId + '" onclick="OpenChat(this.id)""> <img src="' + Icon + '" alt="userImg" style="height:75px;width: 100px; border-radius: 100%; left:0;" class="col-3" id="' + ChatId + 'IMG"> <div class="col"><h5 id="' + ChatId + 'TITLE"> &nbsp ' + Title + ' </h5><h5 id="' + ChatId + 'DES"> &nbsp ' + Description + ' </h5></div> </div>'
          ChatList = document.getElementById('List');
          ChatList.innerHTML = ChatList.innerHTML + ChatItem;
        }
      }
    })
  });
}
firebase.database().ref('/Chats/').push({
  Visible: '3oFDNPFL4NWF5KZysZajrNNA25M2',
  Icon : 'apple.com',
  Description : 'Will It Work?',
  Title : 'Testing..'
});
function ChangeSet(ChatId) {
  Visiblity = document.getElementById("Visiblity").value;

  firebase.database().ref('/Chats/' + ChatId).update({
    Visible: Visiblity
  });
}
function Sendmsg() {
  document.getElementById("Msgs").innerHTML = '';
  document.getElementById("List").innerHTML = '';
  a = document.getElementById("Msgs").innerHTML;
  b = document.getElementById("List").innerHTML;
  if (a == '' && b == '') {
    ChatId = localStorage.getItem("ChatId")
    Name = localStorage.getItem('User Name');
    d = new Date();
    console.log(d.getMonth() + 1)
    Tmessage = document.getElementById("txtmsg").value;
    if (Tmessage != " ") {
      console.log('oo')
      firebase.database().ref('/Chats/' + ChatId + '/Messages').push({
        Sent_by: UserId,
        Sent_by_name: Name,
        Sent_message: Tmessage
        //Sent_on
      });
    }
  }
}
function Addchat() {
  a = document.getElementById("Msgs").innerHTML;
  b = document.getElementById("List").innerHTML;
  if (a == '' && b == '') {
    ChatId = localStorage.getItem("ChatId")
    Name = localStorage.getItem('User Name');
    console.log('oo')
    firebase.database().ref('/Chats').push({
      Sent_by: UserId,
      Sent_by_name: Name,
      Sent_message: Tmessage
      //Sent_on
    });
  }
}