$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
     return html;
   } else {
     var html =
      `<div class="message" data-message-id=${message.id}>
         <div class="upper-message">
           <div class="message__upper-info__talker">
             ${message.user_name}
           </div>
           <div class="message__upper-info__date">
             ${message.created_at}
           </div>
         </div>
         <div class="lower-message">
           <p class="lower-message__content">
             ${message.content}
           </p>
         </div>
       </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action');
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.messages').append(html);      
    $('form')[0].reset();
    $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
  })
  .fail(function(){
    alert('メッセージ送信に失敗しました！');
  })
  .always(function(){
    $('.submit-btn').prop('disabled', false);
  })
})

var buildHTML = function(message) {
  if (message.content && message.image) {
    var html = `<div class="message" data-message-id=` + message.id + `>` +
      `<div class="upper-message">` +
        `<div class="message__upper-info__talker">` +
          message.user_name +
        `</div>` +
        `<div class="message__upper-info__date">` +
          message.created_at +
        `</div>` +
      `</div>` +
      `<div class="lower-message">` +
        `<p class="lower-message__content">` +
          message.content +
        `</p>` +
        `<img src="` + message.image + `" class="lower-message__image" >` +
      `</div>` +
    `</div>`
  } else if (message.content) {
    var html = `<div class="message" data-message-id=` + message.id + `>` +
      `<div class="upper-message">` +
        `<div class="message__upper-info__talker">` +
          message.user_name +
        `</div>` +
        `<div class="message__upper-info__date">` +
          message.created_at +
        `</div>` +
      `</div>` +
      `<div class="lower-message">` +
        `<p class="lower-message__content">` +
          message.content +
        `</p>` +
      `</div>` +
    `</div>`
  } else if (message.image) {
    var html = `<div class="message" data-message-id=` + message.id + `>` +
      `<div class="upper-message">` +
        `<div class="message__upper-info__talker">` +
          message.user_name +
        `</div>` +
        `<div class="message__upper-info__date">` +
          message.created_at +
        `</div>` +
      `</div>` +
      `<div class="lower-message">` +
        `<img src="` + message.image + `" class="lower-message__image" >` +
      `</div>` +
    `</div>`
  };
  return html;
};

var reloadMessages = function() {
    last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log(messages);
      if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.messages').append(insertHTML);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".form__submit").prop("disabled", false);
    }
     })
     .fail(function() {
      console.log('error');
    });
};
if (document.location.href.match(/\/groups\/\d+\/messages/)) {
  setInterval(reloadMessages, 7000);
}
});