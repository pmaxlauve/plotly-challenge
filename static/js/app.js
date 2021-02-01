var dataLoc = "./data/samples.json";




// var trace = {
//     x: [2, 4],
//     y: ["a", "b"],
//     name: "Top microbes by CFU's",
//     type: "bar",
//     orientation: "h"
//   };

// console.log(trace)

//   var data = [trace];


// // Apply the group bar mode to the layout
// var layout = {
//     title: "Top microbes by CFU's",
//     margin: {
//     l: 100,
//     r: 100,
//     t: 100,
//     b: 100
//     }

// Plotly.newPlot("bar", data, layout);










d3.json(dataLoc).then(function(d) {


    var idArr = d.names;
    
    d3.select("#selDataset")
    .selectAll("option")
    .data(idArr)
    .enter()
    .append("option")
    .attr("value", function(d) {
        return d;
    })
    .text(function(d) {
      return d;
    });

    
    d3.selectAll("#selDataset").on("change", optionChanged);

    

        var sData= d.samples;


function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    var visData = {lab:[], val:[]};
  
    
    sData.forEach(function(d) {
        if (d.id == dataset) {
            visData.lab = d.otu_ids.map(x => `OTU ${x}`);

            visData.val = d.sample_values.slice(0,10);
        }
    })

    

    updateBar(visData);
    
  }

function updateBar(d) {
    console.log(d.lab)
    console.log(d.val)



    var trace = {
        x: d.val,
        y: d.lab,
        type: "bar",
        orientation: "h"
      };

    console.log(trace)

      var data = [trace];


    // Apply the group bar mode to the layout
    var layout = {
        title: "Top microbes by CFU's",
        margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
        }

    Plotly.newPlot("bar", data, layout);
  };
  
};



    
});







// // d3.json(dataLoc).then(function(data) {
// //     console.log(data);

// //     var sData= data.samples;
    

// //     console.log(sData);

    
// //   });

// var select = document.getElementById("#selDataset"); 
// var options = ["1", "2", "3", "4", "5"]; 

// for(var i = 0; i < options.length; i++) {
//     var opt = options[i];
//     var el = document.createElement("option");
//     el.textContent = opt;
//     el.value = opt;
//     select.appendChild(el);
// }​


