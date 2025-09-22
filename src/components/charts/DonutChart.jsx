import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

export default function DonutChart({ data }) {
  const hasData = Array.isArray(data) && data.some(d => Number(d.value) > 0);
  if (!hasData) {
    return <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No data</div>;
  }
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <PieChart width={480} height={260}>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={60} outerRadius={100} paddingAngle={4}>
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}


