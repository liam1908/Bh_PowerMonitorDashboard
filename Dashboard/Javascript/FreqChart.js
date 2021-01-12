// Keep these lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.742.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('TcHmi_Controls_System_TcHmiHtmlHost_HbarFreqChart.onAttached', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------
        
        var freqMin;
        var freqMax;
        var ctx = document.getElementById('hbarChartFreq');
        var hbarChartFreq = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['Frequency Max', 'Frequency', 'Frequency Min'],
                datasets: [{
                    barPercentage: 0.5,
                    label: 'Frequency (Hz)',
                    data: [60, 70, 30],
                    backgroundColor: ['rgba(0, 102, 255, 0.5)', 'rgba(51, 133, 255, 0.5)', 'rgba(128, 179, 255, 0.5)' ],
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
                    fontStyle : 'bold',
                    text: 'Frequency Chart',
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
                            min: 30,
                            max:160,
                            //beginAtZero: true,
                            fontSize: 10,
                            fontColor: '#999'
                        },
                    }]
                }
            }
        });
        //Kết nối biến Server
        var hbarChartFreqEvent = TcHmi.EventProvider.register('%s%PLC1.MAIN.fbFrequency.fFreq%/s%', function (evt, data) {
            var symbol = new TcHmi.Symbol('%s%PLC1.MAIN.fbFrequency.fFreq_Max%/s%');
            symbol.readEx(function (data) {
                if (data.error === TcHmi.Errors.NONE) {
                    // Handle result value...
                    freqMax = data.value;
                } else {
                    // Handle error...
                }
            });

            var symbol = new TcHmi.Symbol('%s%PLC1.MAIN.fbFrequency.fFreq_Min%/s%');
            symbol.readEx(function (data) {
                if (data.error === TcHmi.Errors.NONE) {
                    // Handle result value...
                    freqMin = data.value;
                } else {
                    // Handle error...
                }
            });

            try { hbarChartFreq.data.datasets[0].data = [freqMax.toFixed(2), data.toFixed(2), freqMin.toFixed(2)]; }
            catch (e) { return true;}            
            hbarChartFreq.update();
        });
    });
})(TcHmi);
