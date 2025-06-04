import { CircularProgress } from "@mui/material"

function Loader () {
    return (
        <div className="loader-wrap">
            <CircularProgress size={'20px'}/>
        </div>
    )
}

export default Loader