import React, { Component, PropTypes } from 'react';

class Chart extends Component {

    componentDidMount() {
        google.load('visualization', '1', {packages: ['corechart']});
        google.setOnLoadCallback(drawChart.bind(this));

        function drawChart() {

            var data = new google.visualization.DataTable();
            data.addColumn('datetime', 'Time of Day');
            data.addColumn('number', 'Motivation Level');

            data.addRows([
                [new Date(2015, 0, 1, 0), 5], [new Date(2015, 0, 1, 0, 30), 5.1],
                [new Date(2015, 0, 2, 7), 8.2], [new Date(2015, 0, 2, 8), 9],
            ]);

            var options = {
                width: 900,
                height: 500,
                legend: {position: 'none'},
                enableInteractivity: false,
                chartArea: {
                    width: '85%'
                },
                hAxis: {
                    gridlines: {
                        count: -1,
                        units: {
                            days: {format: ['MMM dd']},
                            hours: {format: ['HH:mm', 'ha']},
                        }
                    },
                    minorGridlines: {
                        units: {
                            hours: {format: ['hh:mm:ss a', 'ha']},
                            minutes: {format: ['HH:mm a Z', ':mm']}
                        }
                    }
                }
            };

            var chart = new google.visualization.LineChart(this.refs.chart);
            chart.draw(data, options);
        }
    }

    render() {
        return (
            <div ref="chart">

            </div>
        );
    }

}

Chart.propTypes = {
    notifications: PropTypes.array.isRequired
};

export default Chart;