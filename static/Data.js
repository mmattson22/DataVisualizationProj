var RepublicanNationalPolling = [
  { label: 'Cruz', count: 31.6 },
  { label: 'Trump', count: 42.4 },
  { label: 'Kasich', count: 18.6 },
];

    var RepublicanNewYorkPolling = [
      { label: 'Cruz', count: 13},
      { label: 'Trump', count: 53},
      { label: 'Kasich', count: 14.3},
    ];
    var DemocraticNationalPolling = [
      { label: 'Clinton', count: 50.8 },
      { label: 'Sanders', count: 43.6},
    ];

    var TrumpPopularity = [
      {label: 'Unfavorable', count: 63},
      {label: 'Favorable', count: 30},
    ];

    var ClintonPopularity = [
      {label: 'Unfavorable', count: 53.9},
      {label: 'Favorable', count: 40.7},
    ];

    var SandersPopularity = [
      {label: 'Unfavorable', count: 41.3},
      {label: 'Favorable', count: 48.7},
    ];

    var DirectionOfCountry = [
      {label: 'Right Direction', count: 27.7},
      {label: 'Wrong Direction', count: 64.6},
    ];


var fullList = [RepublicanNationalPolling,RepublicanNewYorkPolling,DemocraticNationalPolling,TrumpPopularity,ClintonPopularity,SandersPopularity,DirectionOfCountry];
var fullNames = ["RepublicanNationalPolling","RepublicanNewYorkPolling","DemocraticNationalPolling","TrumpPopularity","ClintonPopularity","SandersPopularity","DirectionOfCountry"];
var index = 0;

var button = document.getElementById("switch");
button.addEventListener("click",function(e){
  var body = document.getElementById("body");
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  index = (index + 1) % fullList.length;
  makePieChart("body",fullNames[index],fullList[index]);
});

makePieChart("body",fullNames[index],fullList[index]);