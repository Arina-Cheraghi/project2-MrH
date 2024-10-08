import React from 'react';
import { Slider, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const CustomSlider = styled(Slider)({
    color: '#ed1ce7',
    height: 8,
    '& .MuiSlider-thumb': {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid currentColor',
        '&:focus, &:hover, &.Mui-active': {
            boxShadow: 'inherit',
        },
    },
    '& .MuiSlider-track': {
        height: 8,
        borderRadius: 4,
    },
    '& .MuiSlider-rail': {
        height: 8,
        borderRadius: 4,
    },
});

const PriceRangeSlider = ({ value, rangeSelector }) => {
    return (
        <div className='range-in'>
            <Typography id="range-slider" gutterBottom>
                محدوده قیمت:
            </Typography>
            <CustomSlider
                value={value}
                onChange={rangeSelector}
                valueLabelDisplay="auto"
                min={1500000} 
                max={10000000} 
            />
            <div className='res-range'>
                محدوده انتخابی شما بین {value[0]} تومان و {value[1]} تومان است
            </div>
            <div className='show-op'>
                از 970,000 تومان
                <br />
                تا 23,400,000 تومان
            </div>
        </div>
    );
};

export default PriceRangeSlider;
