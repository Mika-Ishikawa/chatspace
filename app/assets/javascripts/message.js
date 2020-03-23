$(function(){
  function buildHTML(message){
    if ( message.content && message.image ) {
      var html =
       `<div class="message" data-message-id= ${message.id}>
          <div class="message__info">
            <p class="user-name">
              ${message.user_name}
            </p>
            <p class="created-at">
              ${message.created_at}
            </p>
          </div>
          <div class="message-text">
            <p class="message-text__content">
              ${message.content}
            </p>
            <img src=${message.image} class='message__text__image'>
          </div>
        </div>`
    } else if (message.content) {
      var html =
      `<div class="message" data-message-id= ${message.id}>
        <div class="message__info">
          <p class="user-name">
              ${message.user_name}
          </p>
          <p class="created-at">
            ${message.created_at}
          </p>
        </div>
        <div class="message-text">
          <p class="message-text__content">
            ${message.content}
          </p>
        </div>
      </div>`
    } else if (message.image) {
      var html =
      `<div class="message" data-message-id= ${message.id}>
        <div class="message__info">
          <p class="user-name">
              ${message.user_name}
          </p>
          <p class="created-at">
            ${message.created_at}
          </p>
        </div>
        <div class="message-text">
          <p class="message-text__content">
            <img src=${message.image} class='message__text__image'>
          </p>
        </div>
      </div>`
    };
    return html;
  };

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
      $('.main-chat__message-list').append(html);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    .always(function(){
      $('.bottom-form__input-box__bottom-btn').prop("disabled", false);
    })
  });

  var reloadMessages = function() {
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML = buildHTML(message)
        });
        $('.main-chat__message-list').append(insertHTML);
        $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };
  if (document.location.href.match(/\/groups\/\d\/messages/)) {
    setInterval(reloadMessages, 7000);
  };
});