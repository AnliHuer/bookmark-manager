function createTime(value) {
  var dateTime = new Date(parseInt(value) * 1000);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth();
  var date = dateTime.getDate();

  month = (month + 1 < 10) ? '0' + (month + 1) : (month + 1).toString();
  date = (date + 1 < 10) ? '0' + (date + 1) : (date + 1).toString();

  return year + "-" + month + "-" + date;
}


$(function() {
  var searchInput = $('.search-bar');
  var searchList = $('.search-list');
  var list = '';

  $.getJSON('data/bookmark.json', function(data) {
    data.forEach(function(val) {
      list += "<li class = \'bookmark-content\'>" + val.title + "</li> <li class = \'bookmark-datetime\'>Create@" + createTime(val.created) + "</li>" + "<hr>";
    });
    searchList.html(list);
  });

  searchInput.on('keyup', function() {
    var word = searchInput.val();
    var regExp = new RegExp(word, 'gim');
    list = '';
    
    $.getJSON('data/bookmark.json', function(data) {
      data.forEach(function(val) {
        if (val.title.search(regExp) > 0) {
          var newTitle = val.title.replace(regExp, '<span class="highlight">$&</span>');
          list += "<li class = \'bookmark-content\'>" + newTitle + "</li> <li class = \'bookmark-datetime\'>Create@" + createTime(val.created) + "</li>" + "<hr>";
        }
      });
      searchList.html(list);
    });

  });
});
