var myConfig = {
    type: "ring",
    plot: {
      // "slice": 90,
      "value-box": {
        text: "%t %node-valueg"
      }, 
      animation: {
        effect: 2,
        method: 5,
        speed: 900,
        sequence: 1
      }
    },
    series: [{
        text: "Carbohydrates",
        backgroundColor: '#708090',
        values: [59]
      },
      {
        text: "Fats",
        backgroundColor: '#D3D3D3',
        "font-color": '#000000',
        values: [55]
      },
      {
        text: "Protein",
        backgroundColor: '#808080',
        values: [30]
      },
    ]
};
   
zingchart.render({
    id: 'piechart',
    data: myConfig,
    height: 700,
    width: "100%"
});