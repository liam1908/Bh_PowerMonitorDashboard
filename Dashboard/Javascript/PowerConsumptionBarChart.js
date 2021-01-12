// Keep these lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.742.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('TcHmi_Controls_System_TcHmiHtmlHost_HbarPowerConsumptionChart.onAttached', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------
        var powerConsumptionVal;
        var maxVal=5;
        var ctx = document.getElementById('hbarChartPowerConsumption');
        var hbarChartPowerConsumption = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['Power Consumption'],
                datasets: [{
                    barPercentage: 0.5,
                    label: 'Energy (kWh)',
                    data: [10],
                    backgroundColor: 'rgba(0, 102, 255, 0.5)',
                    borderWidth: 1,
                    //borderColor: 'rgb(54, 162, 235, 1)'
                }]
            },
            options: {
                plugins: {
                    datalabels: {
                        anchor: 'end',
                        align: 'right',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                tooltips: {
                    enabled: false
                },
                title: {
                    display: true,
                    fontStyle: 'bold',
                    text: 'Energy Chart',
                },
                legend: {
                    display: true,
                    position: 'top',
                    align: 'left',
                    labels: {
                        align: 'center',
                        boxWidth: 10,
                        fontSize: 10,
                        fontColor: '#999'
                    }
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            fontSize: 10,
                            fontStyle: 'bold',
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            min: 0,
                            max: maxVal,
                            fontSize: 10,
                            fontColor: '#999'
                        },
                    }],
                    
                }
            }
        });
        var hbarChartPowerConsumptionEvent = TcHmi.EventProvider.register('%s%PLC1.MAIN.fbPowerValues.stEnergy_Res.fEnergyFraction%/s%', function (evt, data) {
            
            try {
                hbarChartPowerConsumption.data.datasets[0].data = [(data).toFixed(4)];            
            }            
            catch (e) { return true; }
            maxVal = Math.round(data) + 3;
            hbarChartPowerConsumption.options.scales.xAxes[0].ticks.max = maxVal;
            hbarChartPowerConsumption.update();
        });
    });
})(TcHmi);
