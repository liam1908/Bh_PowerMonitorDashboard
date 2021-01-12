// Keep these lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.742.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('TcHmi_Controls_System_TcHmiHtmlHost_PhiValueChart.onAttached', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------
        var phiValue;        
        var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.MAIN.fbPowerValues.fPhi%/s%');
        symboltemp_1.readEx(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                // Handle result value...
                phiValue = data.value;
            } else {
                // Handle error...
            }
        });
        var ctx = document.getElementById('pieChartPhiValue');
        var pieChartPhiValue = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Phi (Degree)'],
                datasets: [{
                    data: [phiValue, 360 - phiValue],
                    backgroundColor: ['rgba(255, 133, 51,0.5)', 'rgba(255, 133, 51,0)'],
                    borderWidth: 1,
                    borderColor: ['rgb(255, 133, 51)', 'rgba(255, 133, 51,1)']
                }],
            },
            options: {
                tooltips: {
                    enabled: false
                },
                plugins: {
                    datalabels: {
                        color: 'rgba(255, 255, 255,0)',
                        anchor: 'end',
                        align: 'top',
                        offset: 50,
                        font: {
                            weight: 'bold'
                        },
                        formatter: function (value) {
                            return (value / 100).toFixed(3);
                        }
                    },
                },
                cutoutPercentage: 0,
            }
        });
        var pieChartPhiEvent = TcHmi.EventProvider.register('%s%PLC1.MAIN.fbPowerValues.fPhi%/s%', function (evt, data) {
            var value = data.toFixed(4);
            var valueStr = value.toString();
            $("#phi-placeholder").text(valueStr);
            pieChartPhiValue.data.datasets[0].data = [data, (360 - data)];
            pieChartPhiValue.update();
        });
        
    });
})(TcHmi);
