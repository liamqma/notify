import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class Chart extends Component {

    componentDidMount() {

        const notifications = [];

        this.props.notifications.forEach((notification) => {

            if (notification.completed === true) {

                const m = moment(notification.moment);

                let inArray = false;

                notifications.forEach((n, index) => {
                    if (m.isSame(moment(n[0]), 'day')) {
                        notifications[index][1]++;
                        inArray = true;
                    }

                });

                if (inArray === false) {
                    notifications.push(
                        [
                            new Date(m.format('YYYY'), m.format('M') - 1, m.format('D')),
                            1
                        ]
                    );
                }
            }
        });

        google.load('visualization', '1', {packages: ['corechart']});
        google.setOnLoadCallback(drawChart.bind(this));

        function drawChart() {

            var data = new google.visualization.DataTable();
            data.addColumn('date', 'Time of Day');
            data.addColumn('number', 'Stretches');
            data.addRows(notifications);

            var options = {
                title: 'How many stretches you have done?',
                height: 600,
                hAxis: {
                    format: 'd/M/yy'
                },
                vAxis: {
                    gridlines: {color: 'none'},
                    minValue: 0
                }
            };

            var chart = new google.visualization.LineChart(this.refs.chart);

            chart.draw(data, options);

        }

    }

    render() {
        return (
            <div style={{width: '100%'}} ref="chart"></div>
        );
    }

}

Chart.propTypes = {
    notifications: PropTypes.array.isRequired
};

export default Chart;