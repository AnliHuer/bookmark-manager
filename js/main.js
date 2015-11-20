function createTime(value) {
  var dateTime = new Date(parseInt(value) * 1000);
  var year = dateTime.getFullYear();
  var month = dateTime.getMonth();
  var date = dateTime.getDate();
  month = (month + 1 < 10) ? '0' + (month + 1) : (month + 1).toString();
  date = (date + 1 < 10) ? '0' + (date + 1) : (date + 1).toString();
  return year + "-" + month + "-" + date;
}


function getListString(data){
    var searchList = $('.search-list');
    var list = '';
    data.forEach(function(val){
      list += "<li class = \'bookmark-content\'>" + val.title + "</li> <li class = \'bookmark-datetime\'>Create@" + createTime(val.created) + "</li>" + "<hr>";
    });
    searchList.html(list);
}


$(function() {
  var searchInput = $('.search-bar');
  $.getJSON('data/bookmark.json',function(data){
    getListString(data);
  });
  searchInput.on('keyup', function() {
    var word = searchInput.val();
    $.getJSON('data/bookmark.json', function(data) {
      var regExp = new RegExp(word, 'gim');
      var newData = data.filter(function(val) {
        return val.title.search(regExp) > 0;
      });
      getListString(newData);
    });

  });
});
