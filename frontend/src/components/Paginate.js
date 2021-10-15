import React from 'react'
import { Pagination } from '@mui/material'

export const Paginate = (currentPage,paginate) => {
    return (
        <div>
            <Pagination 
            count={10} 
            defaultPage={1} 
            showFirstButton 
            showLastButton 
            page={currentPage}
            onChange={paginate}
            />
        </div>
    )
}
