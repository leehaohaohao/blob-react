/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./MaApiInfo.css";
import {ApiStatisticsMap, getApiStatistics} from "../../../api/feature/manager.ts";

const MaApiInfo = () => {
    const [controllerList, setControllerList] = useState<string[]>([]);
    const [selectedController, setSelectedController] = useState<string | null>(null);
    const [controllerData, setControllerData] = useState<ApiStatisticsMap>({});
    const chartRef = useRef<HTMLCanvasElement | null>(null);
    const chartInstance = useRef<Chart | null>(null);

    useEffect(() => {
        async function fetchApiStatistics() {
            try {
                const data = await getApiStatistics();
                if (data.success) {
                    setControllerData(data.data);
                    const controllers = Object.keys(data.data);
                    setControllerList(controllers);
                    if (controllers.length > 0) setSelectedController(controllers[0]);
                }
            } catch (e) {
                console.error(e);
            }
        }
        fetchApiStatistics();
    }, []);

    useEffect(() => {
        if (!selectedController) return;
        if (!controllerData[selectedController]) return;
        if (!chartRef.current) return;

        const dataForController = controllerData[selectedController];

        const labels = dataForController.map((item) => item.name);
        const counts = dataForController.map((item) => item.count);
        const maxTimes = dataForController.map((item) => item.maxTime);
        const avgTimes = dataForController.map((item) => item.averageTime);
        const minTimes = dataForController.map((item) => item.minTime);

        if (chartInstance.current) {
            // 只更新数据，不重新创建实例，防止堆积
            chartInstance.current.data.labels = labels;
            chartInstance.current.data.datasets[0].data = counts;
            chartInstance.current.data.datasets[1].data = maxTimes;
            chartInstance.current.data.datasets[2].data = avgTimes;
            chartInstance.current.data.datasets[3].data = minTimes;
            chartInstance.current.update();
        } else {
            // 第一次创建 Chart 实例
            chartInstance.current = new Chart(chartRef.current, {
                type: "bar",
                data: {
                    labels,
                    datasets: [
                        {
                            label: "调用次数",
                            data: counts,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1,
                            yAxisID: "y1",
                        },
                        {
                            label: "最大响应时间",
                            data: maxTimes,
                            backgroundColor: "rgba(255, 99, 132, 0.2)",
                            borderColor: "rgba(255, 99, 132, 1)",
                            borderWidth: 1,
                            yAxisID: "y2",
                        },
                        {
                            label: "平均响应时间",
                            data: avgTimes,
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                            yAxisID: "y2",
                        },
                        {
                            label: "最小响应时间",
                            data: minTimes,
                            backgroundColor: "rgba(255, 206, 86, 0.2)",
                            borderColor: "rgba(255, 206, 86, 1)",
                            borderWidth: 1,
                            yAxisID: "y2",
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y1: {
                            type: "linear",
                            position: "left",
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "调用次数",
                            },
                        },
                        y2: {
                            type: "linear",
                            position: "right",
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: "响应时间 (ms)",
                            },
                        },
                    },
                    layout: {
                        padding: {
                            bottom: 20,
                        },
                    },
                },
            });
        }

        // 组件卸载时销毁图表实例，防止内存泄漏
        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
                chartInstance.current = null;
            }
        };
    }, [selectedController, controllerData]);

    return (
        <div className="ma-api-info-container">
            <div className="ma-api-info-main" id="main">
                <div className="ma-api-info-content" id="content">
                    <div className="ma-api-info-controller-list" id="controllerList">
                        {controllerList.map((controller) => (
                            <div
                                key={controller}
                                className={`ma-api-info-list-item ${
                                    selectedController === controller ? "active" : ""
                                }`}
                                onClick={() => setSelectedController(controller)}
                            >
                                {controller}
                            </div>
                        ))}
                    </div>
                    <div className="ma-api-info-chart-container" id="chartContainer">
                        <h2>{selectedController}</h2>
                        <canvas ref={chartRef} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MaApiInfo;

