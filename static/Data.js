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
    
    var TrustWorthyness = [
      {label: 'Sanders', count: 47},
      {label: 'Carson', count: 39},
      {label: 'Kasich', count: 31},
      {label: 'Bush', count: 30},
      {label: 'Cruz', count: 29},
      {label: 'Trump', count: 29},
      {label: 'Rubio', count: 28},
      {label: 'Clinton', count: 27},];
      
      var UnTrustWorthyness = [
      {label: 'Sanders', count: 24},
      {label: 'Carson', count: 31},
      {label: 'Kasich', count: 25},
      {label: 'Bush', count: 39},
      {label: 'Cruz', count: 41},
      {label: 'Trump', count: 52},
      {label: 'Rubio', count: 37},
      {label: 'Clinton', count: 56},];


var fullList = [RepublicanNationalPolling,RepublicanNewYorkPolling,DemocraticNationalPolling,TrumpPopularity,ClintonPopularity,SandersPopularity,DirectionOfCountry,TrustWorthyness,UnTrustWorthyness];
var fullNames = ["Republican_National_Polling","Republican_NewYork_Polling","Democratic_National_Polling","Trump_Popularity","Clinton_Popularity","Sanders_Popularity","Direction_Of_Country_Polling","Trustworthyness_and_Honesty","Dishonesty"];
var index = 7;

for(var x = 0; x < fullList.length;x++){
  var button = document.createElement("button");
  var body = document.getElementById("buttonDiv");
  button.value = fullNames[x];
  button.innerHTML = fullNames[x];
  button.addEventListener("click",function(e){
    var indexList = this.parentElement.children;
    for(var y = 0; y < indexList.length;y++){
      if(this === indexList[y]){
        index = y - 1 - Math.floor((y-1)/3);
      };
    };
    var body = document.getElementById("body");
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }
  makePieChart("body",fullNames[index],fullList[index]);
    
  });
  body.removeAttribute("style");
  button.removeAttribute("style");
  body.appendChild(button);
  if(x % 2 == 0){
  brk = document.createElement("br");
  body.appendChild(brk);
  };
  };

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
