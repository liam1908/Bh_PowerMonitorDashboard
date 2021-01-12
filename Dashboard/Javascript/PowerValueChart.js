// Keep these lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.742.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('TcHmi_Controls_System_TcHmiHtmlHost_BarPowerValueChart.onAttached', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------
        //Lấy dữ liệu ban đầu
        var reactivePowerVal;
        var activePowerVal;
        var apparentPowerVal;
        var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.MAIN.fbPowerValues.fTotalReactivePower%/s%');
        symboltemp_1.readEx(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                // Handle result value...
                reactivePowerVal = data.value;
                //console.log(reactivePowerVal);
            } else {
                console.log(data.error);
            }
        });
        var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.MAIN.fbPowerValues.fActivePower%/s%');
        symboltemp_1.readEx(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                // Handle result value...
                activePowerVal = data.value;
                //console.log(activePowerVal);
            } else {
                // Handle error...
            }
        });
        var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.MAIN.fbPowerValues.fApparentPower%/s%');
        symboltemp_1.readEx(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                // Handle result value...
                apparentPowerVal = data.value;
                //console.log(apparentPowerVal);
            } else {
                // Handle error...
            }
        });
        //var reactivePowerVal1 = reactivePowerVal.toFixed(2);
        //var activePowerVal1 = activePowerVal.toFixed(2);
        //var apparentPowerVal1 = apparentPowerVal.toFixed(2);

        var ctx = document.getElementById('barChartPowerValue');
        var barChartPowerValue = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Reactive Power (Var)', 'Active Power (W)', 'Apparent Power (VA)'],
                datasets: [{
                    label:'Data',
                    barPercentage: 0.5,
                    data:[100,200,50],
                    backgroundColor: ['rgba(54, 162, 235, 0.5)', 'rgba(51, 204, 204, 0.5)', 'rgba(0, 153, 153,0.5)'],
                }]
            },
            options: {
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
                    position: 'top',
                    align:'left',
                    labels: {
                        align: 'center',                        
                        boxWidth: 10,
                        fontSize: 10,
                        fontColor: '#999'
                    }
                },
                title: {
                    display: true,                    
                    text: 'Power Chart',
                    font: {
                        weight: 'bold'
                    }
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
        var barChartPowerEvent = TcHmi.EventProvider.register('%s%PLC1.MAIN.fbPowerValues.fApparentPower%/s%', function (evt, data) {
            var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.MAIN.fbPowerValues.fTotalReactivePower%/s%');
            symboltemp_1.readEx(function (data) {
                if (data.error === TcHmi.Errors.NONE) {
                    // Handle result value...
                    reactivePowerVal = data.value;                   
                } else {
                    
                }
            });
            var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.MAIN.fbPowerValues.fActivePower%/s%');
            symboltemp_1.readEx(function (data) {
                if (data.error === TcHmi.Errors.NONE) {
                    // Handle result value...
                    activePowerVal = data.value;
                    
                } else {
                    // Handle error...
                }
            });
            barChartPowerValue.data.datasets[0].data = [reactivePowerVal.toFixed(4), activePowerVal.toFixed(4), data.toFixed(4)];
            barChartPowerValue.update();
        });

    });
})(TcHmi);
