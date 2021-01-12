// Keep these lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.742.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    //TcHmiHtmlHost_BarVoltageChart.onAttached
    var destroyOnInitialized = TcHmi.EventProvider.register('TcHmiHtmlHost_BarVoltageChart.onAttached', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        //e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------
        //Các biến toàn cục cần sử dụng
        var peakValue;
        var ctx = document.getElementById('barChartVoltage');
        //ctx.defaults.global.animation.duration = 200;
        var barChartVoltage = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['RMS Value', 'Peak Value'],
                datasets: [{
                    barPercentage: 0.5,
                    label: 'Voltage Value(V)',
                    data: [450, 700],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderWidth:1,
                    borderColor: 'rgb(54, 162, 235, 1)'
                }]
            },
            //Config
            options: {
                //maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        
                        anchor: 'end',
                        align: 'top',
                        font: {
                            weight: 'bold'
                        }
                    }
                },
                tooltips: {
                    enabled: false
                },
                legend: {
                    display: true,
                    labels: {
                        align: 'center',
                        boxWidth: 10,
                        fontSize: 10,
                        fontColor: '#999'
                    }
                },
                title: {
                    display: true,
                    fontStyle:'bold',
                    text: 'Voltage Chart',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontSize: 10,
                            fontColor: '#999'
                        },
                    }],
                    xAxes: [{
                        ticks: {
                            fontSize: 10,
                            fontStyle:'bold'
                        },
                    }]
                }
            }
        });
        var barChartVoltageEvent = TcHmi.EventProvider.register('%s%PLC1.MAIN.fbBasicValues.fRMS_U%/s%', function (evt, data) {
            
            var symbol = new TcHmi.Symbol('%s%PLC1.MAIN.fbBasicValues.fPeakValue_U%/s%');
            symbol.readEx(function (data) {
                if (data.error === TcHmi.Errors.NONE) {
                    // Handle result value...
                    peakValue = data.value;
                } else {
                    // Handle error...
                }
            });
            try { barChartVoltage.data.datasets[0].data = [data.toFixed(4), peakValue.toFixed(4)];}
            catch (e) { return true;}
            //barChartVoltage.data.datasets[0].data = [data.toFixed(4), peakValue.toFixed(4)];            
            barChartVoltage.update();
        });
        
    });
})(TcHmi);
