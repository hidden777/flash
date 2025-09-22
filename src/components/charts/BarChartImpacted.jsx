import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

export default function BarChartImpacted({ data }) {
  const hasData = Array.isArray(data) && data.length > 0;
  if (!hasData) {
    return <div style={{ height: 260, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>No data</div>;
  }
  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <BarChart width={480} height={260} data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" radius={[6, 6, 0, 0]} />
      </BarChart>
    </div>
  );
}


