import PropTypes from 'prop-types';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/atoms/dialog';
import { Button } from '@/components/atoms/Button';
import { Label } from '@/components/atoms/label';
import { Input } from '@/components/atoms/input';
import BarcodeCameraBox from './BarcodeCameraBox';
import { useState } from 'react';

const SeatInfoBox = ({ seatNum, setSeatNum }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleRegisterClick = () => {
        const regex = /^\d{1,3}[A-Za-z]$/;
        if (regex.test(seatNum)) {
            setIsOpen(false); // 정규식에 맞으면 Dialog 닫기
        } else {
            alert('좌석 번호 형식이 올바르지 않습니다. 다시 확인해주세요.');
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">등록</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>좌석 번호 등록</DialogTitle>
                        <DialogDescription>항공권의 바코드로 좌석 번호를 등록해보세요.</DialogDescription>
                    </DialogHeader>
                    <BarcodeCameraBox seatNum={seatNum} setSeatNum={setSeatNum} />
                    <Button variant="secondary">직접 입력하기</Button>
                    <div className="">
                        <div className="flex items-center gap-4">
                            <Label htmlFor="seatNum" className="text-right">
                                좌석 번호
                            </Label>
                            <Input
                                id="seatNum"
                                value={seatNum}
                                onChange={(e) => setSeatNum(e.target.value)}
                                className="w-20"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleRegisterClick}>
                            등록
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

SeatInfoBox.propTypes = {
    seatNum: PropTypes.string,
    setSeatNum: PropTypes.func.isRequired,
};

export default SeatInfoBox;
