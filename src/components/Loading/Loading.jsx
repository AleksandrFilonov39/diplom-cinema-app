
import { ClimbingBoxLoader } from "react-spinners";

function Loading() {


  return (
    <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <ClimbingBoxLoader 
                size={60}
                color="#321dbaff"
                loading={true}
            />
        </div>
  )
}

export default Loading