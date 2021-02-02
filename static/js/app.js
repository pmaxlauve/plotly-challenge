var dataLoc = "./data/samples.json";















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
        var metaData = d.metadata;
    


function optionChanged() {
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    // Initialize an empty array for the country's data
    var visData = {lab:[], val:[], id:[]};
  
    
    sData.forEach(function(d) {
        if (d.id == dataset) {
            visData.lab = d.otu_ids.map(x => `OTU ${x}`);

            visData.id = d.otu_ids;

            visData.val = d.sample_values;
        }
    });


    metaData.forEach(function(d) {
      if (d.id == dataset) {
        demData = d
      }
    });

    

    

    


    

    updateBar(visData);
    updateBubble(visData);
    updateDemographics(demData);
    
  }

function updateDemographics(d) {
  var demArr = [
    `ID: ${d.id}`,
    `Ethnicity: ${d.ethnicity}`,
    `Gender: ${d.gender}`,
    `Age: ${d.age}`,
    `City/State: ${d.location}`,
    `Type: ${d.bbtype}`,
    `Wash Frequency: ${d.wfreq}`
  ];

  d3.select("#sample-metadata")
    .append("ul")
    .selectAll("li")
    .data(demArr)
    .enter()
    .append("li")
    .text(function(d) {
      return d;
    });

  console.log(demArr);
}

function updateBubble(d) {


  var trace1 = {
    x: d.id,
    y: d.val,
    mode: 'markers',
    marker: {
      size: d.val,
      color: d.id
    },
    text: d.lab
  };

  var data = [trace1];

  var layout = {
    title: "Complete Belly-Button Flora",
    height: 500,
    width: 1100
  };

  Plotly.newPlot("bubble", data, layout)

}

function updateBar(d) {






    var trace = {
        x: d.val.slice(0, 10).reverse(),
        y: d.lab.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        text: d.lab.slice(0, 10).reverse()
      };

    console.log(trace)

      var data = [trace];


    // Apply the group bar mode to the layout
    var layout = {
        title: "Top microbes by CFU's",

  };
  Plotly.newPlot("bar", data, layout);
  
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


