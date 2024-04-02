import { Info } from 'lucide-react';
import { Badge } from '@/components/atoms/Badge';
import { Card, CardHeader } from '@/components/atoms/Card';
import DelayPredictionPie from './DelayPredictionCharts';
import { P } from '@/components/atoms/P';

const FlightDelayInfo = () => {
    return (
        <Card className="border-none shadow-none">
            <CardHeader className="mx-2 my-2">
                <div className="items-center ">
                    <P font="bold" variant="subHeader" size="2xl">
                        예측 지연율
                    </P>

                    <Badge variant="secondary" className="my-2 w-fit">
                        <div className="flex items-center">
                            <Info size={18} className="mx-1 stroke-text-ming" />
                            <div>
                                <P className="mx-1 text-xs" color="ming">
                                    날씨, 항공사, 시기 등 과거 데이터를 분석하여,
                                </P>
                                <P className="mx-1 text-xs" color="ming">
                                    이 항공편의 예상 지연율을 제공합니다.
                                </P>
                            </div>
                        </div>
                    </Badge>
                </div>
            </CardHeader>
            <div className="h-[60vh] border">
                <DelayPredictionPie />
            </div>
        </Card>
    );
};

export default FlightDelayInfo;
