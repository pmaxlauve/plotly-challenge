
//set up variable for samples.json location
var dataLoc = "./data/samples.json";


//use d3.json to bring in the data
d3.json(dataLoc).then(function(d) {

  //variable for blank demographics box
  var demBlank = [
    `ID: `,
    `Ethnicity: `,
    `Gender: `,
    `Age: `,
    `City/State: `,
    `Type: `,
    `Wash Frequency: `
  ];


    //create the html for the demographics box
    d3.select('#sample-metadata')
    .append("ul")
    .selectAll("li")
    .data(demBlank)
    .enter()
    .append("li")
    .text(function(d) {
      return d;
    });

    //varialbe for the subject ID's
    var idArr = d.names;
    
    //create the html for options on the dropdown menu, and assign the ID's
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

    
    //set up event for dropdown menu
    d3.selectAll("#selDataset").on("change", optionChanged);

    
      // create variables for samples and metadata
        var sData= d.samples;
        var metaData = d.metadata;
    

//create function optionChanged()
function optionChanged() {
    // locate the dropdown menu
    var dropdownMenu = d3.select("#selDataset");
    // Assign the value of the dropdown menu option to a variable
    var dataset = dropdownMenu.property("value");
    // create a dictionary to put sample data into
    var visData = {lab:[], val:[], id:[]};
  
    // get data for selected subject ID
    sData.forEach(function(d) {
        //set up conditional to get only data for the given subject ID
        if (d.id == dataset) {

            //get the label
            visData.lab = d.otu_ids.map(x => `OTU ${x}`);
            //get the otu ID as an integer
            visData.id = d.otu_ids;
            //get the value
            visData.val = d.sample_values;
        }
    });

    //get the meta-data for each subject ID
    metaData.forEach(function(d) {
      //set up conditional to get only data for the given subject ID
      if (d.id == dataset) {
        //set the metadata dictionary equal to demData
        demData = d
      }
    });

    //run functions to build the charts
    updateBar(visData);
    updateBubble(visData);
    updateDemographics(demData);
    updateGauge(demData)
    
  }
// function to build the gauge
function updateGauge(d) {

  // assign variable for wash frequency
  var washes = d.wfreq;

  // customize gauge
  var data = [
    {
      value: washes,
      title: { text: "Wash Frequency" },
      type: "indicator",
      mode: "gauge",
      gauge: {
        bar: {
          color: "#336699",
          thickness: .75
        },
        axis: {range: [0, 9]},
        steps: [
          { range: [0, 1], color: "#1a75ff" },
          { range: [1, 2], color: "#3385ff" },
          { range: [2, 3], color: "#4c94ff" },
          { range: [3, 4], color: "#66a3ff" },
          { range: [4, 5], color: "#80b2ff" },
          { range: [5, 6], color: "#99c2ff" },
          { range: [6, 7], color: "#b2d1ff" },
          { range: [7, 8], color: "#cce0ff" },
          { range: [8, 9], color: "#e6f0ff" },
        ]
      }

    }
  ];
  //set up the layout
  var layout = { width: 500, height: 300, margin: { t: 0, b: 0 } };

  //create the plot
  Plotly.newPlot('gauge', data, layout);
}



// function to build the demographics box
function updateDemographics(d) {

  //create variable containing the list entries for the demographics box
  var demArr = [
    `ID: ${d.id}`,
    `Ethnicity: ${d.ethnicity}`,
    `Gender: ${d.gender}`,
    `Age: ${d.age}`,
    `City/State: ${d.location}`,
    `Type: ${d.bbtype}`,
    `Wash Frequency: ${d.wfreq}`
  ];


  var demInfo = d3.select('#sample-metadata');

  //replace the initial data with the new data
  demInfo
    .selectAll("li")
    .data(demArr)
    .text(function(d) {
      return d;
    });



}
//function to build the bubble chart
function updateBubble(d) {

  //customize the bubble plot
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

  //set up the layout
  var layout = {
    title: "Complete Belly-Button Flora",
    height: 500,
    width: "100%",
    yaxis: {
      title: {
        text: "Colony Forming Units"
      }
    },
    xaxis: {
      title: {
        text: "OTU ID"
      }
    }
  };

  //plot the bubble plot
  Plotly.newPlot("bubble", data, layout)

};

//function to build the bar chart
function updateBar(d) {

    //customize the plot
    var trace = {
        x: d.val.slice(0, 10).reverse(),
        y: d.lab.slice(0, 10).reverse(),
        type: "bar",
        orientation: "h",
        text: d.lab.slice(0, 10).reverse()
      };

    var data = [trace];
    //set up the layout
    var layout = {
        title: "Top microbes by CFU's",
    
      };
  //plot the chart
  Plotly.newPlot("bar", data, layout);
  
};

    
});


