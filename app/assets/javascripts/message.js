$(function(){
  function buildHTML(message){
    if ( message.image ) {
      var html =
       `<div class="message">
          <div class="message__info">
            <div class="user-name">
              ${message.user_name}
            </div>
            <div class="created-at">
              ${message.created_at}
            </div>
          </div>
          <div class="message-text">
            <p class="message-text__content">
              ${message.content}
            </p>
          </div>
          <img src=${message.image} >
        </div>`
      return html;
    } else {
      var html =
      `<div class="message">
        <div class="message__info">
          <div class="user-name">
              ${message.user_name}
          </div>
          <div class="created-at">
            ${message.created_at}
          </div>
          </div>
          <div class="message-text">
          <p class="message-text__content">
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
});