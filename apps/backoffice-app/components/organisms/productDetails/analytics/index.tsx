'use client';

import LineChartComponent from '@/components/atoms/LineChart';
import { Box, Typography, IconButton } from '@mui/material';

const ProductAnalystics = () => {
    const xData = ["Competitor 1", "Competitor 2", "Competitor 3", "Competitor 4",  "Competitor 5"]
    return (
        <Box className="flex flex-col">
            <Box className="flex flex-row">
                <Box>
                    <LineChartComponent 
                        xAxis={xData}
                        yAxis={[200, 550, 210, 850, 1105]}
                    />
                </Box>
            </Box>
        </Box>
    )
}

export default ProductAnalystics;