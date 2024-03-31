import { ResponsivePie } from '@nivo/pie';

const data = [
    {
        id: '3시간',
        label: '3시간',
        value: 0.6,
        color: 'hsl(325, 70%, 50%)',
    },
    {
        id: '10분',
        label: '10분',
        value: 0.2,
        color: 'hsl(95, 70%, 50%)',
    },
    {
        id: '20분',
        label: '20분',
        value: 0.1,
        color: 'hsl(62, 70%, 50%)',
    },
    {
        id: '30분',
        label: '30분',
        value: 0.5,
        color: 'hsl(261, 70%, 50%)',
    },
    {
        id: '1시간',
        label: '1시간',
        value: 0.5,
        color: 'hsl(208, 70%, 50%)',
    },
];

const DelayPredictionPie = () => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        valueFormat=" >-.1%"
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [['darker', 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true,
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
            },
        ]}
        legends={[
            {
                anchor: 'bottom',
                direction: 'row',
                justify: false,
                translateX: 20,
                translateY: 80,
                itemsSpacing: 1,
                itemWidth: 80,
                itemHeight: 20,
                itemTextColor: '#999',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 18,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000',
                        },
                    },
                ],
            },
        ]}
    />
);

export default DelayPredictionPie;
