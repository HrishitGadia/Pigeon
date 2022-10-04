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
  Icon = document.getElementById(ChatId + "IMG").src;
  Title = document.getElementById(ChatId + "TITLE").innerHTML;
  Des = document.getElementById(ChatId + "DES").innerHTML;
  Header = '<div class="container row border" style="background-color: white; color: black;cursor: pointer; right:0;" id="' + ChatId + '" onclick="OpenChat(this.id)"><img src="' + Icon + '+IMG" style="height:75px; width:100px;" class="img-responsive"><div class="col"><h5>&nbsp ' + Title + ' </h5><h5> &nbsp ' + Description + ' </h5></h5></div>'
  document.getElementById("Msgs").innerHTML = Header;
  getmsg(ChatId, Header)
}

function getmsg(Msg_owner) {
  console.log(Msg_owner)
  firebase.database().ref(`Chats/` + Msg_owner + '/Messages').on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      MessageID = childSnapshot.key;
      MessageData = childSnapshot.val();
      console.log(MessageData);

      Sent_By = MessageData["Sent_by"]
      Sent_on = MessageData["Sent_on"]
      Sent_message = MessageData["Sent_message"]
      Sent_by_name = MessageData["Sent_by_name"]

      if (Sent_By == UserId) {
        Message_Right = '<br> <div class="right border row" style="width: fit-content; height:fit-content;float: right;"> <img src="Logo.png" style="height: 50px;width: 75px;border-radius: 100%;"> <div class="col"> <h5>' + Sent_by_name + '</h5> <p>' + Sent_message + '</p> </div> </div> <br>';
        document.getElementById("Msgs").innerHTML = document.getElementById("Msgs").innerHTML+Message_Right;
      }
      else {
        Message_Left = '<br> <div class="left border row" style="width: fit-content; height:fit-content;float: left;"> <img src="Logo.png" style="height: 50px;width: 75px;border-radius: 100%;"> <div class="col"> <h5>' + Sent_by_name + '</h5> <p>' + Sent_message + '</p> </div> </div> <br>';
        document.getElementById("Msgs").innerHTML = document.getElementById("Msgs").innerHTML+Message_Left;
      }
    })

  });
}
function GetData() {
  document.getElementById('List').innerHTML = "<p> Your User Id : " + UserId + "</p><br>"
  firebase.database().ref(`/Chats/`).on('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      ChatId = childSnapshot.key;
      ChatData = childSnapshot.val();

      Visiblity = ChatData["Visible To"]

      if (Visiblity.includes(UserId) == true) {

        console.log(ChatId)
        console.log(ChatData)
        Icon = ChatData["Icon"]
        Title = ChatData["Title"]
        Description = ChatData["Description"]

        ChatItem = '<hr><div class="border row" style="width:100%;margin:0; height: fit-content;text-align:center; background:none;" id="' + ChatId + '" onclick="OpenChat(this.id)""> <img src="' + Icon + '" alt="userImg" style="height:75px;width: 100px; border-radius: 100%; left:0;" class="col-3" id="' + ChatId + 'IMG"> <div class="col"><h5 id="' + ChatId + 'TITLE"> &nbsp ' + Title + ' </h5><h5 id="' + ChatId + 'DES"> &nbsp ' + Description + ' </h5></div> </div>'
        ChatList = document.getElementById('List');
        ChatList.innerHTML = ChatList.innerHTML + ChatItem;
      }
    })

  });
}
