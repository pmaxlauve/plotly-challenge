var dataLoc = "./data/samples.json";



d3.json(dataLoc).then(function(d) {

  var demBlank = [
    `ID: `,
    `Ethnicity: `,
    `Gender: `,
    `Age: `,
    `City/State: `,
    `Type: `,
    `Wash Frequency: `
  ];


  
    d3.select('#sample-metadata')
    .append("ul")
    .selectAll("li")
    .data(demBlank)
    .enter()
    .append("li")
    .text(function(d) {
      return d;
    });


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
    updateGauge(demData)
    
  }

function updateGauge(d) {
  var washes = d.wfreq;

  var data = [
    {
      value: washes,
      title: { text: "Wash Frequency" },
      type: "indicator",
      mode: "gauge",
      gauge: {
        bar: {
          color: "#336699",
          thickness: .8
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
  
  var layout = { width: 500, height: 300, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);
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

  var demInfo = d3.select('#sample-metadata');

  
    demInfo
    .selectAll("li")
    .data(demArr)
    .text(function(d) {
      return d;
    });



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
    width: "100%"
  };

  Plotly.newPlot("bubble", data, layout)

};

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

    var layout = {
        title: "Top microbes by CFU's",

  };
  Plotly.newPlot("bar", data, layout);
  
};

    
});


