require(['gitbook', 'jQuery'], function (gitbook, $) {

  gitbook.events.bind('start', function (e, config) {

    var opts = config.antsay
    if (!opts) return

    $('html').data('ant-say-opts', opts)

    init()

    gitbook.events.bind('page.change', init)

  })

  function init() {

    var opts = $('html').data('ant-say-opts')
    var appId = opts.appId;
    var key = opts.key;

    if (!appId)
      return

    $('#ant-say-placeholder').remove()

    var placeholder = $('<div>', {
      id: 'ant-say-placeholder'
    })

    $('.book-body .page-inner').append(placeholder)

    new AntSay(placeholder[0], {
      appId: appId,
      key: key
    })

  }

})
