import React from "react";
import { POSITION_NONE, UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import {ReactSvgPanZoomLoader } from 'react-svg-pan-zoom-loader';




function Map(props) {

    // 미니맵 안뜨게 바꿈
    const miniatureProps = {
        position : POSITION_NONE
    }

    return (
        <>
            <ReactSvgPanZoomLoader src={props.svgFile} render= {(content) => (
                <UncontrolledReactSVGPanZoom height={500} miniatureProps={miniatureProps}>
                    <svg width={500} height={500} >
                        {content}
                    </svg>  
                </UncontrolledReactSVGPanZoom>
            )}/>
        </>
    )
}

export default Map;