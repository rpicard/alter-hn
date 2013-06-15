// Make story links open in new tabs
$("td .title a").attr("target", "_blank");
// Make comment links open in new tabs
$("td .subtext a[href^='item?id=']").attr("target", "_blank");
