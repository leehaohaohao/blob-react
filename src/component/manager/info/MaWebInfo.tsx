/**
 * @description
 * @author lihao
 * @date 2025/6/7
 */
import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import './MaWebInfo.css';
import {getHotPost, getHotTag, getNumData, NumData} from "../../../api/feature/manager.ts";
import {PostItem, TagItem} from "../../../api/feature/forum.ts";

const MaWebInfo = () => {
    const [numberData, setNumberData] = useState<NumData | null>(null);
    const [hotPosts, setHotPosts] = useState<PostItem[]>([]);
    const [hotTags, setHotTags] = useState<TagItem[]>([]);

    const chartRef1 = useRef<HTMLCanvasElement>(null);
    const chartRef2 = useRef<HTMLCanvasElement>(null);
    const chartInstance1 = useRef<Chart | null>(null);
    const chartInstance2 = useRef<Chart | null>(null);

    // 初始化数据和图表
    useEffect(() => {
        async function fetchNumberData() {
            try {
                const data = await getNumData();
                setNumberData(data.data);
            } catch (error) {
                console.error(error);
            }
        }

        async function fetchHotPosts() {
            try {
                const data = await getHotPost('1','10');
                setHotPosts(data.data);
            } catch (error) {
                console.error(error);
            }
        }
        async function fetchHotTags() {
            try {
                const data = await getHotTag('1','10');
                setHotTags(data.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchNumberData();
        fetchHotPosts();
        fetchHotTags();
    }, []);

    // 更新图表
    useEffect(() => {
        if (!numberData || !chartRef1.current || !chartRef2.current) return;
        // 销毁旧实例，避免重复渲染
        if (chartInstance1.current) {
            chartInstance1.current.destroy();
        }
        if (chartInstance2.current) {
            chartInstance2.current.destroy();
        }
        const labels = ['用户数', '违规用户数', '群组数', '文章数', '待审核文章数', '话题数'];
        const dataArr = [
            numberData.userNum,
            numberData.uuserNum,
            numberData.groupNum,
            numberData.postNum,
            numberData.upostNum,
            numberData.tagNum,
        ];
        const backgroundColor = [
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
        ];
        const borderColor = backgroundColor.map((c) => c.replace('0.2', '1'));

        chartInstance1.current = new Chart(chartRef1.current, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: '数量',
                        data: dataArr,
                        backgroundColor,
                        borderColor,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });

        chartInstance2.current = new Chart(chartRef2.current, {
            type: 'doughnut',
            data: {
                labels,
                datasets: [
                    {
                        label: '数量分布',
                        data: dataArr,
                        backgroundColor,
                        borderColor,
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                let label = context.label || '';
                                if (label) label += ': ';
                                if (context.parsed !== null) label += context.parsed;
                                return label;
                            },
                        },
                    },
                },
            },
        });

    }, [numberData]);

    return (
        <div className="ma-web-info-container" style={{ height: '100%', width: '100%' }}>
            <div id="main" className="ma-web-info-main">
                <div id="content" className="ma-web-info-content">
                    <div id="chart-container" className="ma-web-info-chart-container">
                        <div className="chart-box ma-web-info-chart-box">
                            <canvas id="dataChart1" ref={chartRef1}></canvas>
                        </div>
                        <div className="chart-box ma-web-info-chart-box">
                            <canvas id="dataChart2" ref={chartRef2}></canvas>
                        </div>
                    </div>

                    <div id="chart" className="ma-web-info-chart">
                        <div id="left-box" className="ma-web-info-left-box">
                            <div className="title ma-web-info-title">
                                <p>热门话题</p>
                            </div>
                            <div id="l-container" className="ma-web-info-l-container">
                                {hotTags.map((item, idx) => (
                                    <div className="text ma-web-info-text" key={idx}>
                                        <a href={`/article/${item.tag}`}>{item.tag}</a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div id="right-box" className="ma-web-info-right-box">
                            <div className="title ma-web-info-title">
                                <p>热门文章</p>
                            </div>
                            <div id="r-container" className="ma-web-info-r-container">
                                {hotPosts.map((item, idx) => (
                                    <div className="post ma-web-info-post" key={idx}>
                                        <a href={`/article/content/${item.postId}`}>{item.title}</a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MaWebInfo;
