import React from 'react';
import {
  Line, LineChart, XAxis, YAxis,
  Tooltip,
  ReferenceDot,
  ResponsiveContainer,
} from 'recharts';

// // #region Sample data
// const data = [
//   {
//     name: 'Page A',
//     uv: 400,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 300,
//     pv: 4567,
//     amt: 2400,
//   },
//   {
//     name: 'Page C',
//     uv: 320,
//     pv: 1398,
//     amt: 2400,
//   },
//   {
//     name: 'Page D',
//     uv: 200,
//     pv: 9800,
//     amt: 2400,
//   },
//   {
//     name: 'Page E',
//     uv: 278,
//     pv: 3908,
//     amt: 2400,
//   },
//   {
//     name: 'Page F',
//     uv: 189,
//     pv: 4800,
//     amt: 2400,
//   },
// ];

function UVIndexGraph({ uvi }) {
  // clamp value
  const uvValue = Math.min(Math.max(uvi ?? 0, 0), 11);

  // create data range
  const data = [
    { x: 0, uvi: 0 },
    { x: 11, uvi: 0 },
  ];

  return (
    <div className="w-full max-w-[700px] h-32">
      <h1>UV INDEX GRAPH</h1>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}
          margin={{
            top: 10, right: 20, left: 20, bottom: 0,
          }}
        >
          <Line
            type="monotone"
            dataKey="uvi"
            strokeWidth={3}
            dot={false}
            isAnimationActive={false}
          />
          <ReferenceDot
            x={uvValue}
            y={0}
            r={6}
            fill="#f87171" // red dot (change if you want)
            stroke="#ffffff"
            strokeWidth={2}
            isFront
          />

          {/* Horizontal scale labeling */}
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, 11]}
            ticks={[0, 2, 4, 6, 8, 10, 11]}
          />

          <YAxis hide domain={[-1, 1]} /> {/* Hide Y axis since it's a flat line */}
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </div>
    // <LineChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }}
    //   responsive
    //   data={data}
    //   margin={{
    //     top: 20,
    //     right: 20,
    //     bottom: 5,
    //     left: 0,
    //   }}
    // >
    //   <CartesianGrid stroke="#aaa" strokeDasharray="5, 5" />
    //   <Line type="monotone" dataKey="uv" stroke="purple" strokeWidth={2} name="My data series name" />
    //   <XAxis dataKey="name" />
    //   <YAxis YAxis width="auto" label={{ value: 'UV', position: 'insideLeft', angle: -90 }} />
    //   <Legend align="right" />
    //   <Tooltip />
    // </LineChart>
  );
}

export default UVIndexGraph;
