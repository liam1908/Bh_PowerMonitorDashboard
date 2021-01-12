// Keep these lines for a best effort IntelliSense of Visual Studio 2017.
/// <reference path="../../Packages/Beckhoff.TwinCAT.HMI.Framework.12.742.1/runtimes/native1.12-tchmi/TcHmi.d.ts" />

(function (TcHmi) {
    // If you want to unregister an event outside the event code you need to use the return value of the method register()
    var destroyOnInitialized = TcHmi.EventProvider.register('TcHmi_Controls_System_TcHmiHtmlHost_LinePowerConsumptionChart.onAttached', function (e, data) {
        // This event will be raised only once, so we can free resources. 
        // It's best practice to use destroy function of the event object within the callback function to avoid conflicts.
        e.destroy();
        // ----------------------
        // Place your code here!
        // ----------------------
        //Lấy dữ liệu ban đầu
        var intNumberofData=0;
        var sDateTimeVal;
        var PowerConsumptionVal;


        var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.DateTimeClock.sCurrentDateTime%/s%');
        symboltemp_1.readEx(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                // Handle result value...
                sDateTimeVal = data.value;
                sDateTimeVal = sDateTimeVal.substr(5, 11);
            } else {
                // Handle error...
            }
        });
        var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.MAIN.fbPowerValues.stEnergy_Res.fEnergyFraction%/s%');
        symboltemp_1.readEx(function (data) {
            if (data.error === TcHmi.Errors.NONE) {
                // Handle result value...
                PowerConsumptionVal = data.value;
            } else {
                // Handle error...
            }
        });
        

        console.log("Test");
        console.log(sDateTimeVal);
        console.log(PowerConsumptionVal);


        var ctx = document.getElementById('lineChartPowerConsumption');
        var lineChartPowerConsumption = new Chart(ctx, {
            type: 'line',
            data: {
                labels: [''],
                datasets: [{
                    label: 'Power Consumption (kWh)',
                    data: [PowerConsumptionVal],
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',

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
                        font: {
                            weight: 'bold'
                        },
                    },
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
                    fontStyle: 'bold',
                    text: 'Power Consumption',
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            max: 1,
                            beginAtZero: true,
                            fontSize: 10,
                            fontColor: '#999'
                        },
                    }],
                    xAxes: [{
                        ticks: {

                            fontSize: 10,
                            fontStyle: 'bold'
                        },
                    }]
                }
            }
        });
        var linePowerConsumptionEvent = TcHmi.EventProvider.register('%s%PLC1.DateTimeClock.pulse5m%/s%', function (evt, data) {
            intNumberofData = intNumberofData + 1;

            var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.MAIN.fbPowerValues.stEnergy_Res.fEnergyFraction%/s%');
            symboltemp_1.readEx(function (data) {
                if (data.error === TcHmi.Errors.NONE) {
                    // Handle result value...
                    PowerConsumptionVal = data.value;
                } else {
                    // Handle error...
                }
            });

            var symboltemp_1 = new TcHmi.Symbol('%s%PLC1.DateTimeClock.sCurrentDateTime%/s%');
            symboltemp_1.readEx(function (data) {
                if (data.error === TcHmi.Errors.NONE) {
                    // Handle result value...
                    sDateTimeVal = data.value;
                    sDateTimeVal = sDateTimeVal.substr(5, 11);
                } else {
                    // Handle error...
                }
            });

            var maxVal = Math.round(PowerConsumptionVal) + 1;
            lineChartPowerConsumption.options.scales.yAxes[0].ticks.max = maxVal;        

            if (intNumberofData >= 10) {
                if ((intNumberofData % 2) === 0) {
                    lineChartPowerConsumption.data.labels.shift(sDateTimeVal);
                    lineChartPowerConsumption.data.datasets[0].data.shift(PowerConsumptionVal);                    
                    lineChartPowerConsumption.update();
                }
                else {
                    lineChartPowerConsumption.data.labels.push(sDateTimeVal);
                    lineChartPowerConsumption.data.datasets[0].data.push(PowerConsumptionVal);
                    lineChartPowerConsumption.update();
                }
                
            }
            else {
                lineChartPowerConsumption.data.labels.push(sDateTimeVal);
                lineChartPowerConsumption.data.datasets[0].data.push(PowerConsumptionVal);
                lineChartPowerConsumption.update();            
            }
            if (intNumberofData == 500) intNumberofData = 0;            
            
        });
    });
})(TcHmi);
