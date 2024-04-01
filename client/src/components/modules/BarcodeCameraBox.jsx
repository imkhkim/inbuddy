import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import PropTypes from 'prop-types';

const BarcodeCameraBox = ({ seatNum, setSeatNum }) => {
    const videoRef = useRef(null); // video 요소를 위한 ref 생성

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();
        let selectedDeviceId;

        codeReader
            .listVideoInputDevices()
            .then((videoInputDevices) => {
                selectedDeviceId = videoInputDevices[0].deviceId; // 첫 번째 카메라 장치 사용
                return codeReader.decodeFromVideoDevice(selectedDeviceId, videoRef.current, (result, err) => {
                    if (result) {
                        const boardingPassData = result.text.split(/\s+/);
                        const boardingPassSeatInfo = boardingPassData[4]; // 예: "257Y030G0007" 또는 다른 형식
                        const regex = /\d+[A-Z]/g;
                        const seatInfoMatch = boardingPassSeatInfo.match(regex);
                        if (seatInfoMatch && seatInfoMatch.length >= 2) {
                            const matched = seatInfoMatch[1];
                            const seatNumber = matched.match(/\d+/)[0];
                            const seatClass = matched.match(/[A-Z]/)[0];

                            const fullSeatInfo = `${Number(seatNumber)}${seatClass}`; // "30G"

                            console.log(fullSeatInfo);
                            setSeatNum(fullSeatInfo);
                        } else {
                            // 좌석 정보가 예상한 형식과 다를 경우의 처리
                            console.error('Invalid seat information format');
                        }
                    }
                    // if (err) {
                    //     console.error(err);
                    // }
                });
            })
            .catch((err) => {
                console.error(err);
            });

        // 컴포넌트가 언마운트될 때 실행될 정리 함수
        return () => {
            codeReader.reset();
        };
    }, [seatNum, setSeatNum]); // 빈 의존성 배열을 제공하여 컴포넌트 마운트 시에만 실행되도록 함

    return (
        <div>
            <video ref={videoRef} style={{ width: '100%' }}></video>
        </div>
    );
};

BarcodeCameraBox.propTypes = {
    seatNum: PropTypes.string,
    setSeatNum: PropTypes.func.isRequired,
};

export default BarcodeCameraBox;
