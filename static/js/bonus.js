var dataLoc = "./data/samples.json";


d3.json(dataLoc).then(function(data) {
    console.log(data);
  });