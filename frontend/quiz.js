// const self_id = localStorage.getItem("self_id");

// get(できてない)
// $.get('/api/quiz/{self_id}')
// .done(function(data) {
// console.log(data);
// })
// .fail(function() {})


var content = "--問題--";
var choices = {
    "choice1": "フライパン",
    "choice2": "コッぺパン",
    "choice3": "カレーパン"
}
var answer = "フライパン";

// 問題文
$("#content").text(content);

// 選択肢の名前
$("#choice1").val(choices.choice1);
$("#choice2").val(choices.choice2);
$("#choice3").val(choices.choice3);

// リンク
$("#choice1").attr("onclick","location.href='answer_correct.html'");
$("#choice2").attr("onclick","location.href='answer_incorrect.html'");
$("#choice3").attr("onclick","location.href='answer_incorrect.html'");


// 選択肢のvalueを取得
$("#choice1").on("click", function(){
    var choice = $("#choice1").val();
    // console.log(choice);
    if(choice == answer) var result = true;
    else var result = false;
    // console.log(result);
    // ここでPostする予定

});
$("#choice2").on("click", function(){
    var choice = $("#choice2").val();
    // console.log(choice);
    if(choice == answer) var result = true;
    else var result = false;
    // console.log(result);
    // ここでPostする予定

});
$("#choice3").on("click", function(){
    var choice = $("#choice3").val();
    // console.log(choice);
    if(choice == answer) var result = true;
    else var result = false;
    // console.log(result);
    // ここでPostする予定

});

// Postできない
// $.post('/api/quiz/result', 'self_id=self_id&result=result')